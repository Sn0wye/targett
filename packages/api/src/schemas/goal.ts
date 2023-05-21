import { z } from 'zod';

import { createGoalSchema, updateGoalSchema } from '@targett/db/schemas';

export const syncSchema = z.array(
  z.union([
    z.object({
      action: z.literal('create-goal'),
      payload: createGoalSchema.omit({
        userId: true
      })
    }),
    z.object({
      action: z.literal('update-goal'),
      payload: updateGoalSchema
    }),
    z.object({
      action: z.literal('delete-goal'),
      payload: z.object({
        id: z.string().min(1)
      })
    })
  ])
);

export type SyncSchema = z.infer<typeof syncSchema>;
