import { TRPCError } from '@trpc/server';
import { type Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { type Goal } from '@targett/db';

import { createGoalSchema, goalSchema, updateGoalSchema } from '../schemas';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const getGoalById = async (redis: Redis, goalId: string) => {
  const goalKey = `goal:${goalId}`;
  const goal = await redis.hgetall<Goal>(goalKey);

  if (!goal) {
    return null;
  }

  return goalSchema.parse(goal);
};

export const goalRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userGoalsKey = `${ctx.auth.userId}:goalKeys`;
    const goalIds = await ctx.redis.smembers(userGoalsKey);

    const goals = await Promise.all(
      goalIds.map(goalId => getGoalById(ctx.redis, goalId))
    );
    return goals.filter(goal => goal !== null) as Goal[];
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const goal = await getGoalById(ctx.redis, input.id);
      if (!goal) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `The goal with the id ${input.id} does not exist.`
        });
      }
      return goal;
    }),
  create: protectedProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const goalId = input.id ?? nanoid();
      const goalKey = `goal:${goalId}`;
      const userGoalsKey = `${ctx.auth.userId}:goalKeys`;

      const goal = { ...input, id: goalId } satisfies Goal;

      Promise.all([
        // Create goal
        await ctx.redis.hmset(goalKey, goal),
        // Add goal to user's goals
        await ctx.redis.sadd(userGoalsKey, goalId)
      ]);

      return goal;
    }),
  update: protectedProcedure
    .input(updateGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const goalId = input.id;
      const goalKey = `goal:${goalId}`;
      const goal = await getGoalById(ctx.redis, goalId);

      if (!goal) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }

      const updatedGoal = {
        ...goal,
        ...input,
        updatedAt: new Date()
      } satisfies Goal;

      await ctx.redis.hmset(goalKey, updatedGoal);

      return updatedGoal;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const goalId = input.id;
      const goalKey = `goal:${goalId}`;
      const userGoalsKey = `${ctx.auth.userId}:goalKeys`;

      // Delete goal
      const deleted = await ctx.redis.del(goalKey);

      if (!deleted) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `The goal with the "id" = ${goalId} does not exist.`
        });
      }

      // Remove goal from user's goals
      await ctx.redis.srem(userGoalsKey, goalId);

      return { id: goalId };
    })
});
