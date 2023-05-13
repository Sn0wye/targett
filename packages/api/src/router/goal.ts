import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { eq, goals } from '@targett/db';
import {
  createGoalSchema,
  goalSchema,
  updateGoalSchema,
  type Goal,
  type ParsedGoal
} from '@targett/db/schemas';

import { protectedProcedure, router } from '../trpc';

const parseGoals = (goals: Goal[]): ParsedGoal[] => {
  return goals.map(goal => goalSchema.parse(goal));
};

export const goalRouter = router({
  all: protectedProcedure.query(async ({ ctx }) => {
    const allGoals = await ctx.db
      .select()
      .from(goals)
      .where(eq(goals.userId, ctx.auth.userId))
      .all();

    return parseGoals(allGoals);
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const goal = await ctx.db
        .select()
        .from(goals)
        .where(eq(goals.id, input.id))
        .get();

      if (!goal) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }

      return goalSchema.parse(goal);
    }),
  create: protectedProcedure
    .input(
      createGoalSchema.omit({
        userId: true
      })
    )
    .mutation(async ({ ctx, input }) => {
      const insertedGoal = await ctx.db
        .insert(goals)
        .values({
          ...input,
          userId: ctx.auth.userId
        })
        .returning()
        .get();

      return goalSchema.parse(insertedGoal);
    }),
  update: protectedProcedure
    .input(updateGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const { updatedAt = new Date().toISOString() } = input;

      const updatedGoal = await ctx.db
        .update(goals)
        .set({
          ...input,
          updatedAt
        })
        .where(eq(goals.id, input.id))
        .returning()
        .get();

      if (!updatedGoal) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }

      return goalSchema.parse(updatedGoal);
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedGoal = await ctx.db
        .delete(goals)
        .where(eq(goals.id, input.id))
        .returning()
        .get();

      if (!deletedGoal) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }

      return goalSchema.parse(deletedGoal);
    })
});
