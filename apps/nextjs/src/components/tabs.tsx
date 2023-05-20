import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { type Tab } from '~/hooks/use-tabs';
import { cn } from '~/lib/utils';

const transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15
};

type Props = {
  selectedTabIndex: number;
  tabs: Tab[];
  setSelectedTab: (input: [number, number]) => void;
};

export const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab
}: Props): JSX.Element => {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  return (
    <motion.nav
      className='relative z-0 flex flex-shrink-0 items-center justify-center py-2'
      onHoverEnd={() => setHoveredTab(null)}
    >
      <LayoutGroup id='tabs'>
        {tabs.map((item, i) => {
          return (
            <motion.a
              key={i}
              href={item.href}
              className={cn(
                'text-md relative flex h-8 cursor-pointer select-none items-center rounded-md px-4 text-sm text-zinc-500 transition-colors hover:text-zinc-100',
                selectedTabIndex === i && 'text-zinc-100'
              )}
              onHoverStart={() => setHoveredTab(i)}
              onFocus={() => setHoveredTab(i)}
              onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
            >
              {/** Floating hover */}
              <span className='z-20'>{item.label}</span>
              {i === selectedTabIndex ? (
                <motion.div
                  transition={transition}
                  layoutId='underline'
                  className={
                    'absolute -bottom-2 left-2 right-2 z-10 h-0.5 bg-zinc-100'
                  }
                />
              ) : null}
              <AnimatePresence>
                {i === hoveredTab ? (
                  <motion.div
                    className='absolute bottom-0 left-0 right-0 top-0 z-10 rounded-md bg-zinc-800'
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    exit={{
                      opacity: 0
                    }}
                    transition={transition}
                    layoutId='hover'
                  />
                ) : null}
              </AnimatePresence>
            </motion.a>
          );
        })}
      </LayoutGroup>
    </motion.nav>
  );
};
