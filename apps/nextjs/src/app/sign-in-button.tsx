'use client';

import { useClerk } from '@clerk/nextjs/app-beta/client';

export const SignInButton = () => {
  const { openSignIn } = useClerk();

  return (
    <button
      onClick={() => openSignIn()}
      className='rounded-md bg-orange-500 px-3 py-2 transition-colors hover:bg-orange-600'
    >
      Sign In
    </button>
  );
};
