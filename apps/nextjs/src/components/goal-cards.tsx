'use client';

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useZact } from 'zact/client';

import { type ParsedGoal } from '@targett/db/schemas';

import { deleteGoalAction } from '~/actions/delete-goal';
import { Button } from './ui/button';
import { ConfirmDialog } from './ui/confirm-dialog';
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
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
  const [open, onOpenChange] = useState(false);
  const { mutate, isLoading } = useZact(deleteGoalAction);

  const onDelete = async () => {
    await mutate({
      id: goal.id
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
          <ConfirmDialog
            title='Delete Goal'
            description='The goal will be permanently deleted. This action cannot be undone.'
            isLoading={isLoading}
            onConfirm={() => onDelete()}
          >
            <Button
              variant='destructive'
              className='w-full justify-center'
              isLoading={isLoading}
            >
              Delete
            </Button>
          </ConfirmDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
