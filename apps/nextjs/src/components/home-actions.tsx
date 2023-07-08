'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Plus, Search } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { CreateGoalDialog } from './create-goal-dialog';

export const HomeActions = () => {
  const [isCreateGoalDialogOpen, setIsCreateGoalDialogOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <div className='flex gap-2'>
      <Input leftIcon={<Search />} placeholder='Pesquise...' />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            New... <Plus className='ml-2 h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-32' align='end'>
          <DropdownMenuItem
            onClick={() => setIsCreateGoalDialogOpen(true)}
            disabled={!isSignedIn}
          >
            Goal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateGoalDialog
        open={isCreateGoalDialogOpen}
        onOpenChange={setIsCreateGoalDialogOpen}
      />
    </div>
  );
};
