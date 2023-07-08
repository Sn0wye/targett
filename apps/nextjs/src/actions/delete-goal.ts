'use server';

import { revalidatePath } from 'next/cache';
import { zact } from 'zact/server';

import { GoalService } from '@targett/api/services';
import { db } from '@targett/db';
import { deleteGoalSchema } from '@targett/db/schemas';

const goalService = new GoalService(db);

export const deleteGoalAction = zact(deleteGoalSchema)(async input => {
  await goalService.delete(input.id);
  revalidatePath('/');
  return input;
});
