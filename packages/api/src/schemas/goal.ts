import { z } from 'zod';

export const createGoalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  total: z.number().min(1),
  current: z.number().min(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const updateGoalSchema = createGoalSchema
  .partial()
  .extend({
    id: z.string().min(1)
  })
  .omit({ createdAt: true });
