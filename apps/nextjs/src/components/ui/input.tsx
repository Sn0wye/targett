import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '~/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'border-accent-200 inline-flex h-10 w-full rounded-md border bg-zinc-950 px-3 text-sm text-inherit text-zinc-100 transition-[border-color_150ms_ease] focus-within:border-zinc-300'
        )}
      >
        {leftIcon && (
          <span className='flex items-center justify-center pr-3 text-zinc-600'>
            <Slot className='h-5 w-5'>{leftIcon}</Slot>
          </span>
        )}
        <input
          type={type}
          className={cn(
            'h-full w-full bg-transparent placeholder:text-zinc-600 focus:outline-none',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
