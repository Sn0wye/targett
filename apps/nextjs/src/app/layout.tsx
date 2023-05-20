import '~/styles/globals.css';
import React from 'react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs/app-beta';

import { Header } from '~/components/header';
import { cn } from '~/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'targett',
    template: `%s - targett`
  },
  description: 'targett',
  authors: [
    {
      name: 'Gabriel Trzimajewski',
      url: 'https://snowye.dev'
    }
  ],
  creator: 'Gabriel Trzimajewski'
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={cn(
            inter.variable,
            'text-foreground flex flex-col bg-gray-900 font-sans'
          )}
        >
          <Header />
          <div className='container'>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
