import { type LucideIcon, type LucideProps } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  Geist: (props: LucideProps) => (
    <svg
      fill='none'
      height='32'
      shapeRendering='geometricPrecision'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1'
      viewBox='0 0 24 24'
      width='32'
      className='text-zinc-800'
      {...props}
    >
      <path d='M16.88 3.549L7.12 20.451'></path>
    </svg>
  )
};
