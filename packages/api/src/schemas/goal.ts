import { z } from 'zod';

export const goalSchema = z.object({
  id: z.string(),
  name: z.string(),
  total: z.coerce.number(),
  current: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});

export const createGoalSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  total: z.number().min(1),
  current: z.number().min(0),
  createdAt: z.date().optional().default(new Date()),
  updatedAt: z.date().optional().default(new Date())
});

export const updateGoalSchema = createGoalSchema
  .partial()
  .extend({
    id: z.string().min(1)
  })
  .omit({ createdAt: true });
