import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';
import { LoadingDots } from './loading-dots';

//TODO: add secondary and destructive variants

const buttonVariants = cva(
  'flex items-center rounded-md text-sm border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-100 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-geist-bg group',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-100 text-black hover:bg-zinc-950 hover:text-zinc-100 border-zinc-100',
        outline:
          'bg-zinc-950 text-zinc-400 border border-accent-200 hover:text-zinc-100 hover:border-zinc-100 active:bg-zinc-800 focus-visible:ring-accent-200',
        destructive: 'bg-red-900 text-red-50 hover:bg-red-900/90',
        secondary: 'bg-zinc-800 text-zinc-50 hover:bg-zinc-800/80',
        ghost: 'hover:bg-zinc-800 hover:text-zinc-50',
        link: 'text-zinc-50 underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const content = isLoading ? <LoadingDots variant='light' /> : children;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
