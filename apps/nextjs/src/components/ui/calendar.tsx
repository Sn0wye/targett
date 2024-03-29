'use client';

/* eslint-disable camelcase */
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '~/lib/utils';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('bg-zinc-950 p-3 ', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'rounded-md w-8 font-normal text-[0.8rem] text-zinc-400',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-zinc-800',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center border-none'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          '!bg-zinc-50 !text-zinc-900 hover:!bg-zinc-50 hover:!text-zinc-900 focus:!bg-zinc-50 focus:!text-zinc-900',
        day_today: 'bg-zinc-800 text-zinc-50',
        day_outside: 'opacity-50 text-zinc-400',
        day_disabled: 'opacity-50 text-zinc-400',
        day_range_middle:
          'aria-selected:bg-zinc-800 aria-selected:text-zinc-50',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: props => (
          <ChevronLeftIcon className='h-4 w-4' style={props.style} />
        ),
        IconRight: props => (
          <ChevronRightIcon className='h-4 w-4' style={props.style} />
        )
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
