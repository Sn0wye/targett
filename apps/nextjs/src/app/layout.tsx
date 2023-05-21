import '~/styles/globals.css';
import React from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs/app-beta';

import { Header } from '~/components/header';
import { cn } from '~/lib/utils';
import { siteMeta } from '../config/metadata';
import { Analytics } from './analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = siteMeta;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang='en'>
        <body
          suppressHydrationWarning={true}
          className={cn(
            inter.variable,
            'text-foreground flex flex-col bg-zinc-900 font-sans antialiased'
          )}
        >
          <ClerkProvider>
            <Header />
            <div className='mx-auto w-full max-w-[1200px]'>{children}</div>
          </ClerkProvider>
          <Analytics />
        </body>
      </html>
    </>
  );
}
