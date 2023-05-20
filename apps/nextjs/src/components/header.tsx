'use client';

import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

import { CustomSignIn } from '~/app/signin';
import { useTabs } from '~/hooks/use-tabs';
import { Icons } from './icons';
import { Tabs } from './tabs';

export const Header = () => {
  const { isSignedIn } = useUser();
  const pathname = useSelectedLayoutSegment();
  const tabs = useTabs({
    tabs: [
      {
        id: 'home',
        label: 'Dashboard',
        href: '/'
      },
      {
        id: 'protected',
        label: 'Protected',
        href: '/protected'
      }
    ],
    initialTabId: pathname ?? 'home'
  });

  return (
    <header className='w-full border border-b-zinc-800 bg-zinc-950'>
      <div className='flex h-[64px] w-full items-center justify-between px-6'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={48}
            height={48}
            className='h-10 w-10'
          />
          <Icons.Geist />
          <h1 className='text-2xl font-bold text-zinc-100'>targett</h1>
        </div>
        <div>{isSignedIn ? <UserButton /> : <CustomSignIn />}</div>
      </div>
      <div className='flex h-[48px] items-center px-6'>
        <Tabs {...tabs.tabProps} />
      </div>
    </header>
  );
};
