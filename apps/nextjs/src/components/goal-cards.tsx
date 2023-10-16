'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarDays, Goal } from 'lucide-react';

import { type ParsedGoal } from '@targett/db/schemas';

import { api } from '~/trpc/react';
import { CreateGoalDialog } from './create-goal-dialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';

type GoalCardsProps = {
  goals: ParsedGoal[];
};

export const GoalCards = ({ goals }: GoalCardsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<ParsedGoal | null>(null);
  const { mutate, isLoading } = api.goal.delete.useMutation();
  const { refresh } = useRouter();

  const deleteGoal = async () => {
    if (!selectedGoal) return;

    mutate(
      {
        id: selectedGoal.id
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          refresh();
        }
      }
    );
  };

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onClick={() => {
            setSelectedGoal(goal);
            setIsDialogOpen(true);
          }}
        />
      ))}
      {selectedGoal && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogBody>
            <DialogHeader>
              <DialogTitle>{selectedGoal.name}</DialogTitle>
              <DialogDescription>{selectedGoal.description}</DialogDescription>
            </DialogHeader>
            <DialogContent>
              Deadline{' '}
              {formatDistanceToNowStrict(selectedGoal.deadline, {
                roundingMethod: 'ceil',
                addSuffix: true,
                unit: 'day'
              })}
            </DialogContent>
            <DialogFooter className='sm:flex-row-reverse'>
              <Button
                variant='destructive'
                onClick={deleteGoal}
                isLoading={isLoading}
                disabled={isLoading}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>
      )}
    </div>
  );
};

{
}

type GoalCardProps = {
  onClick: () => void;
  goal: ParsedGoal;
};

const GoalCard = ({ goal, onClick }: GoalCardProps) => {
  return (
    <div
      className='border-accent-200 cursor-pointer rounded-md border bg-zinc-950 p-6 transition-[border-color_150ms_ease] hover:border-zinc-300'
      onClick={onClick}
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
        {formatDistanceToNowStrict(goal.deadline, {
          roundingMethod: 'ceil',
          addSuffix: true,
          unit: 'day'
        })}
      </footer>
    </div>
  );
};

export const GoalsEmptyState = () => {
  return (
    <div className='border-accent-200 flex flex-col items-center justify-center gap-6 rounded-lg border bg-zinc-950 px-16 py-12 pt-6'>
      <div className='border-accent-200 rounded-lg border p-3'>
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
