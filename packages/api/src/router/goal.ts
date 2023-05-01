import { TRPCError } from '@trpc/server';
import { type Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { type Goal } from '@targett/db';

import { createGoalSchema, updateGoalSchema } from '../schemas';
import { publicProcedure, router } from '../trpc';

const goalParser = z.object({
  id: z.string(),
  name: z.string(),
  total: z.coerce.number(),
  current: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

const getGoalById = async (
  redis: Redis,
  goalId: string
): Promise<Goal | null> => {
  const goalKey = `goal:${goalId}`;
  const goal = await redis.hgetall<Goal>(goalKey);

  if (!goal) {
    return null;
  }

  return goalParser.parse(goal);
};

export const goalRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const goalIds = await ctx.redis.smembers('goalId');
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
        throw new Error('Goal not found');
      }
      return goal;
    }),
  create: publicProcedure
    .input(createGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        createdAt = new Date(),
        updatedAt = new Date(),
        ...data
      } = input;
      const goalId = id ?? nanoid();
      const goalKey = `goal:${goalId}`;

      const goal = { ...data, id: goalId, createdAt, updatedAt } satisfies Goal;

      Promise.all([
        await ctx.redis.hmset(goalKey, goal),
        await ctx.redis.sadd('goalKeys', goalId)
      ]);

      return goal;
    }),
  update: publicProcedure
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
  delete: publicProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const goalId = input;
      const goalKey = `goal:${goalId}`;
      const deleted = await ctx.redis.del(goalKey);

      if (!deleted) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }
      await ctx.redis.srem('goalIds', goalId);

      return { id: goalId };
    })
});
