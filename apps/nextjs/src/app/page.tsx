import { currentUser } from '@clerk/nextjs/app-beta';

import { GoalService } from '@targett/api/src/router/services/GoalService';
import { db } from '@targett/db';
import { type ParsedGoal } from '@targett/db/schemas';

import { GoalCards } from '~/components/goal-cards';
import { HomeActions } from '~/components/home-actions';

const goalService = new GoalService(db);
const DashboardPage = async () => {
  const user = await currentUser();

  let goals: ParsedGoal[] = [];
  if (user) {
    goals = await goalService.all(user.id);
  }

  return (
    <div className='mb-12 mt-6 flex flex-col gap-6 px-6'>
      <HomeActions />
      <GoalCards goals={goals} />
    </div>
  );
};
export default DashboardPage;
