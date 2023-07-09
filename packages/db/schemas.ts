import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { goals } from './schema';

export const goalSchema = createSelectSchema(goals, {
  deadline: schema => schema.deadline.transform(date => new Date(date)),
  createdAt: schema => schema.createdAt.transform(date => new Date(date)),
  updatedAt: schema => schema.updatedAt.transform(date => new Date(date))
});

export type Goal = z.input<typeof goalSchema>;
export type ParsedGoal = z.output<typeof goalSchema>;

export const createGoalSchema = createInsertSchema(goals, {
  id: schema => schema.id.optional().default(() => nanoid()),
  userId: schema => schema.userId.min(1),
  name: schema => schema.name.min(1),
  description: schema => schema.description.optional().default(''),
  current: schema => schema.current.nonnegative().default(0),
  total: schema => schema.total.positive().int(),
  deadline: z.date().min(new Date(), {
    message: 'Deadline must be in the future'
  }),
  createdAt: z
    .date()
    .default(() => new Date())
    .transform(date => date.toISOString()),
  updatedAt: z
    .date()
    .default(() => new Date())
    .transform(date => date.toISOString())
});

export type CreateGoalInput = z.input<typeof createGoalSchema>;
export type CreateGoalOutput = z.output<typeof createGoalSchema>;

export const updateGoalSchema = createGoalSchema
  .partial()
  .extend({
    id: z.string().min(1)
  })
  .omit({
    createdAt: true
  });

export type UpdateGoalInput = z.input<typeof updateGoalSchema>;
export type UpdateGoalOutput = z.output<typeof updateGoalSchema>;

export const deleteGoalSchema = z.object({
  id: z.string().min(1)
});

export type DeleteGoalInput = z.input<typeof deleteGoalSchema>;
