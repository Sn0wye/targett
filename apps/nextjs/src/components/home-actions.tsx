'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Plus, Search } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { CreateGoalDialog } from './create-goal-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

export const HomeActions = () => {
  const { user } = useUser();
  return (
    <div className='flex gap-2'>
      <Input leftIcon={<Search />} placeholder='Search...' />
      {user && (
        <CreateGoalDialog>
          <Button className='whitespace-nowrap'>
            New Goal
            <Plus className='ml-2 h-5 w-5' />
          </Button>
        </CreateGoalDialog>
      )}
      {!user && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className='whitespace-nowrap' disabled>
                New Goal
                <Plus className='ml-2 h-5 w-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Sign in first!</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
