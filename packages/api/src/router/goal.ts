import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createGoalSchema, updateGoalSchema } from '@targett/db/schemas';

import { syncSchema } from '../schemas';
import { GoalService } from '../services/GoalService';
import { protectedProcedure, router } from '../trpc';

export const goalRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    const goalService = new GoalService(ctx.db);
    return goalService.all(ctx.auth.userId);
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const goalService = new GoalService(ctx.db);

      try {
        return await goalService.byId(input.id);
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }
    }),
  create: protectedProcedure
    .input(
      createGoalSchema.omit({
        userId: true
      })
    )
    .mutation(async ({ ctx, input }) => {
      const goalService = new GoalService(ctx.db);
      return goalService.create({
        ...input,
        userId: ctx.auth.userId
      });
    }),
  update: protectedProcedure
    .input(updateGoalSchema)
    .mutation(async ({ ctx, input }) => {
      const { updatedAt = new Date().toISOString() } = input;

      const goalService = new GoalService(ctx.db);

      try {
        return await goalService.update({ ...input, updatedAt });
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const goalService = new GoalService(ctx.db);

      try {
        return await goalService.delete(input.id);
      } catch {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Goal not found',
          cause: 'The goal with the given "id" does not exist.'
        });
      }
    }),
  sync: protectedProcedure
    .input(syncSchema)
    .mutation(async ({ ctx, input }) => {
      const goalService = new GoalService(ctx.db);

      input.forEach(async ({ action, payload }) => {
        switch (action) {
          case 'create-goal':
            await goalService.create({
              ...payload,
              userId: ctx.auth.userId
            });
            break;
          case 'update-goal':
            await goalService.update(payload);
            break;
          case 'delete-goal':
            await goalService.delete(payload.id);
            break;
        }
      });
    })
});
