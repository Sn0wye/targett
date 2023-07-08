import React from 'react';
import { CalendarDays } from 'lucide-react';

import { type ParsedGoal } from '@targett/db/schemas';

import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet';

type GoalCardsProps = {
  goals: ParsedGoal[];
};

export const GoalCards = ({ goals }: GoalCardsProps) => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

type GoalCardProps = {
  goal: ParsedGoal;
};

const GoalCard = ({ goal }: GoalCardProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          key={goal.id}
          className='cursor-pointer rounded-md border border-zinc-800 bg-zinc-950 p-6 transition-[border-color_150ms_ease] hover:border-zinc-300'
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
      </SheetTrigger>
      <SheetContent className='flex w-1/3 flex-col justify-between'>
        <SheetHeader>
          <SheetTitle>{goal.name}</SheetTitle>
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
        </SheetHeader>
        <SheetFooter>
          <Button variant='destructive' className='w-full justify-center'>
            Delete
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
