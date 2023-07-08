'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';
import { z } from 'zod';

import { GoalService } from '@targett/api/services';
import { db } from '@targett/db';
import { createGoalSchema } from '@targett/db/schemas';

const goalService = new GoalService(db);

const insertSchema = createGoalSchema.extend({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const createGoalAction = zact(insertSchema)(async input => {
  await goalService.create(input);
  revalidatePath('/');
  return input;
});
