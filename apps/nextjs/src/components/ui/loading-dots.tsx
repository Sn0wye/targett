import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

export const loadingDotVariants = cva(
  'animate-flash inline-block h-1 w-1 rounded-full bg-zinc-900 dark:bg-zinc-100 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900',
  {
    variants: {
      size: {
        sm: 'h-1 w-1',
        md: 'h-2 w-2'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
);

export interface LoadingDotsProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingDotVariants> {}

export const LoadingDots = ({ size }: LoadingDotsProps) => (
  <div className='loading-dots flex items-center gap-1'>
    <span className={cn(loadingDotVariants({ size }), 'anim-delay-0')} />
    <span className={cn(loadingDotVariants({ size }), 'anim-delay-200')} />
    <span className={cn(loadingDotVariants({ size }), 'anim-delay-400')} />
  </div>
);
