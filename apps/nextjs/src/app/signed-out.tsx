'use client';

import { useClerk } from '@clerk/nextjs/app-beta/client';
import { UserX } from 'lucide-react';

import { Button } from '~/components/ui/button';

export const SignedOut = () => {
  const { openSignIn } = useClerk();

  return (
    <div className='flex flex-col items-center justify-center gap-6 rounded-lg border border-zinc-800 bg-zinc-950 px-16 py-12 pt-6'>
      <div className='rounded-lg border border-zinc-800 p-3'>
        <UserX className='h-8 w-8 text-zinc-300' />
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='font-medium text-white'>You aren't signed in yet.</h2>
        <p className='text-center text-zinc-400'>
          Sign in to create goals and <br /> track your progress.
        </p>
      </div>
      <Button variant='outline' onClick={() => openSignIn()}>
        Sign In
      </Button>
    </div>
  );
};
