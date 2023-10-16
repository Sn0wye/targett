import { currentUser } from '@clerk/nextjs/app-beta';

import { type ParsedGoal } from '@targett/db/schemas';

import { GoalCards, GoalsEmptyState } from '~/components/goal-cards';
import { HomeActions } from '~/components/home-actions';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/server';
import { SignedOut } from './signed-out';

const DashboardPage = async () => {
  const user = await currentUser();

  let goals: ParsedGoal[] = [];
  if (user) {
    goals = await api.goal.all.query();
  }

  return (
    <div className='mb-12 mt-6 flex flex-col gap-6 px-6'>
      {user && (
        <>
          <HomeActions />
          {goals.length > 0 && <GoalCards goals={goals} />}
          {goals.length === 0 && <GoalsEmptyState />}
        </>
      )}

      {!user && <SignedOut />}
    </div>
  );
};
export default DashboardPage;
