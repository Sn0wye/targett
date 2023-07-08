import { currentUser } from '@clerk/nextjs/app-beta';

import { type ParsedGoal } from '@targett/db/schemas';

import { createCaller } from '~/utils/caller';
import { GoalCards } from '~/components/goal-cards';
import { HomeActions } from '~/components/home-actions';

const DashboardPage = async () => {
  const user = await currentUser();

  let goals: ParsedGoal[] = [];
  if (user) {
    const caller = createCaller();
    goals = await caller.goal.all();
  }

  return (
    <div className='mb-12 mt-6 flex flex-col gap-6 px-6'>
      <HomeActions />
      <GoalCards goals={goals} />
    </div>
  );
};
export default DashboardPage;
