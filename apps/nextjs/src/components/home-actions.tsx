'use client';

import React from 'react';
import { Plus, Search } from 'lucide-react';

import { Input } from '~/components/ui/input';
import { Button } from './ui/button';

export const HomeActions = () => {
  return (
    <div className='flex gap-2'>
      <Input leftIcon={<Search />} placeholder='Pesquise...' />
      <Button>
        Novo... <Plus className='ml-2 h-5 w-5' />
      </Button>
    </div>
  );
};
