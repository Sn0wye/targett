import { GoalCards } from '~/components/goal-cards';
import { HomeActions } from '~/components/home-actions';

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-6 pb-12 pt-6'>
      <HomeActions />
      <GoalCards />
    </div>
  );
};
export default DashboardPage;
