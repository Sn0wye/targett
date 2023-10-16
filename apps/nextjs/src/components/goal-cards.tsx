'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Goal } from 'lucide-react';

import { type ParsedGoal } from '@targett/db/schemas';

import { api } from '~/trpc/react';
import { CreateGoalDialog } from './create-goal-dialog';
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
  const { mutate, isLoading } = api.goal.delete.useMutation();
  const { refresh } = useRouter();

  const onDelete = async () => {
    mutate(
      {
        id: goal.id
      },
      {
        onSuccess: () => {
          refresh();
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <div
          key={goal.id}
          className='border-accent-200 cursor-pointer rounded-md border bg-zinc-950 p-6 transition-[border-color_150ms_ease] hover:border-zinc-300'
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
          <footer className='mt-2 text-zinc-400'>
            Deadline{' '}
            {new Intl.RelativeTimeFormat('en', {
              style: 'narrow'
            }).format(goal.createdAt.getUTCDate(), 'day')}
          </footer>
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

export const GoalsEmptyState = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 rounded-lg border border-zinc-800 bg-zinc-950 px-16 py-12 pt-6'>
      <div className='rounded-lg border border-zinc-800 p-3'>
        <Goal className='h-8 w-8 text-zinc-300' />
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='font-medium text-white'>You don't have any goals.</h2>
        <p className='text-center text-zinc-400'>
          Create one now, what <br /> are you waiting for?
        </p>
      </div>
      <CreateGoalDialog>
        <Button variant='outline'>Create Goal</Button>
      </CreateGoalDialog>
    </div>
  );
};
