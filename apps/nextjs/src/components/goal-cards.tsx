import React from 'react';

export const GoalCards = () => {
  return (
    <div className='grid cursor-pointer grid-cols-3 gap-6'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className='rounded-md border border-zinc-800 bg-zinc-950 p-4 transition-[border-color_150ms_ease] hover:border-zinc-300'
        >
          Goal {i + 1}
        </div>
      ))}
    </div>
  );
};
