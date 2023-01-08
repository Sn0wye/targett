import { View } from 'react-native';

import { NumberCell } from './NumberCell';
import { Separator } from './Separator';

type GoalCountProps = {
  current: number;
  total: number;
};

export const GoalCount = ({ current, total }: GoalCountProps) => {
  const currentCells = String(current)
    .split('')
    .map((digit, i) => {
      const ml = i === 0 ? 0 : 8;

      return (
        <NumberCell key={i} style={{ marginLeft: ml }}>
          {digit}
        </NumberCell>
      );
    });

  const totalCells = String(total)
    .split('')
    .map((digit, i) => {
      const ml = i === 0 ? 12 : 8;

      return (
        <NumberCell key={i} style={{ marginLeft: ml }}>
          {digit}
        </NumberCell>
      );
    });

  return (
    <View className='w-full flex-row items-center'>
      {currentCells}
      <Separator className='ml-3'>/</Separator>
      {totalCells}
    </View>
  );
};
