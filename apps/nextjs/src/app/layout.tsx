import '~/styles/globals.css';
import React from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs/app-beta';

import { Header } from '~/components/header';
import { cn } from '~/lib/utils';
import { siteMeta } from '../config/metadata';
import { Analytics } from './analytics';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = siteMeta;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      {/* Clerk Provider is here because it needs the `fs` node module */}
      <ClerkProvider>
        <html lang='en'>
          <body
            suppressHydrationWarning
            className={cn(
              inter.variable,
              'text-foreground flex flex-col bg-zinc-900 font-sans antialiased'
            )}
          >
            <Header />
            <div className='mx-auto w-full max-w-[1200px]'>{children}</div>
          </body>
          <Analytics />
        </html>
      </ClerkProvider>
    </Providers>
  );
}
