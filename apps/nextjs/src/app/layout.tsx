import '~/styles/globals.css';
import React from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { ClerkProvider } from '@clerk/nextjs/app-beta';

import { Header } from '~/components/header';
import { cn } from '~/lib/utils';
import { TRPCReactProvider } from '~/trpc/react';
import { siteMeta } from '../config/metadata';
import { Analytics } from './analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = siteMeta;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      {/* Clerk Provider is here because it needs the `fs` node module */}
      <ClerkProvider>
        <TRPCReactProvider headers={headers()}>
          <body
            suppressHydrationWarning
            className={cn(
              inter.variable,
              'text-foreground flex flex-col bg-black font-sans antialiased'
            )}
          >
            <Header />
            <div className='mx-auto w-full max-w-[1200px]'>{children}</div>
          </body>
        </TRPCReactProvider>
        <Analytics />
      </ClerkProvider>
    </html>
  );
}
