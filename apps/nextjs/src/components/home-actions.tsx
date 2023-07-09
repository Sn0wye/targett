'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { CreateGoalDialog } from './create-goal-dialog';

export const HomeActions = () => {
  const [isCreateGoalDialogOpen, setIsCreateGoalDialogOpen] = useState(false);

  return (
    <div className='flex gap-2'>
      <Input leftIcon={<Search />} placeholder='Pesquise...' />
      <CreateGoalDialog
        open={isCreateGoalDialogOpen}
        onOpenChange={setIsCreateGoalDialogOpen}
      >
        <Button className='whitespace-nowrap'>
          New Goal
          <Plus className='ml-2 h-5 w-5' />
        </Button>
      </CreateGoalDialog>
    </div>
  );
};
