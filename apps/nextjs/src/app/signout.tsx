'use client';

import { useClerk } from '@clerk/nextjs';

export const CustomSignOut = () => {
  const { signOut } = useClerk();

  return <button onClick={() => signOut()}>Sign Out</button>;
};
