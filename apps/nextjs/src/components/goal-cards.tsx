import React from 'react';
import { CalendarDays } from 'lucide-react';

import { type ParsedGoal } from '@targett/db/schemas';

type GoalCardsProps = {
  goals: ParsedGoal[];
};

export const GoalCards = ({ goals }: GoalCardsProps) => {
  return (
    <div className='grid cursor-pointer grid-cols-3 gap-6'>
      {goals.map(goal => (
        <div
          key={goal.id}
          className='rounded-md border border-zinc-800 bg-zinc-950 p-6 transition-[border-color_150ms_ease] hover:border-zinc-300'
        >
          <header className='flex justify-between'>
            <div className='flex flex-col'>
              <h3 className='font-medium text-zinc-100'>{goal.name}</h3>
              <p className='text-zinc-400'>
                {goal.current} / {goal.total}
              </p>
            </div>
            <CalendarDays className='h-6 w-6' />
          </header>
        </div>
      ))}
    </div>
  );
};
