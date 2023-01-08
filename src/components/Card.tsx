import { useState } from 'react';
import { View, Text, ViewProps, TouchableOpacity } from 'react-native';

import { Goal, useGoals } from '../hooks/useGoals';
import { ConfirmationModal } from './ConfirmationModal';
import { Minus } from './Icons/Minus';
import { Plus } from './Icons/Plus';
import { Trash } from './Icons/Trash';

type CardProps = {
  goal: Goal;
};

export const Card = ({ goal }: CardProps) => {
  const { current, total, name, id } = goal;
  const { deleteGoal, updateGoal } = useGoals();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const handleIncrement = () => {
    updateGoal(id, current < total ? current + 1 : current);
  };

  const handleDecrement = () => {
    updateGoal(id, current > 0 ? current - 1 : current);
  };

  const currentCells = String(current)
    .split('')
    .map((digit, i) => {
      const ml = i === 0 ? 0 : 8;

      return (
        <Cell key={i} style={{ marginLeft: ml }}>
          {digit}
        </Cell>
      );
    });

  const totalCells = String(total)
    .split('')
    .map((digit, i) => {
      const ml = i === 0 ? 12 : 8;

      return (
        <Cell key={i} style={{ marginLeft: ml }}>
          {digit}
        </Cell>
      );
    });

  return (
    <>
      <View className='relative mt-2 rounded-xl bg-gray-800 p-4'>
        <View className='flex-row items-start justify-between'>
          <Text className='text-2xl text-gray-100'>{name}</Text>
          <TouchableOpacity onPress={toggleConfirmationModal}>
            <Trash color='#ef4444' />
          </TouchableOpacity>
        </View>
        <View className='mt-4 flex-row items-end justify-between'>
          <View className='flex-row items-center'>
            {currentCells}
            <Separator className='ml-3'>/</Separator>
            {totalCells}
          </View>
          <View className='flex-row'>
            <TouchableOpacity
              className='h-8 w-8 items-center justify-center rounded-lg bg-gray-600'
              onPress={handleDecrement}
            >
              <Minus />
            </TouchableOpacity>
            <TouchableOpacity
              className='ml-1 h-8 w-8 items-center justify-center rounded-lg bg-gray-600'
              onPress={handleIncrement}
            >
              <Plus />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={toggleConfirmationModal}
        onConfirm={() => deleteGoal(id)}
      />
    </>
  );
};

const Separator = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props}>
      <Text className='text-5xl text-white'>{children}</Text>
    </View>
  );
};

const Cell = ({ children, ...props }: ViewProps) => {
  return (
    <View className='rounded-lg bg-gray-700 px-2 pt-3 pb-1' {...props}>
      <Text className='text-5xl text-white'>{children}</Text>
    </View>
  );
};
