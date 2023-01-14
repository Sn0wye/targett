import { useMemo, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { Goal, useGoals } from '../hooks/useGoals';
import { Actions } from './Actions';
import { ConfirmationModal } from './ConfirmationModal';
import { GoalCount } from './GoalCount';
import { Trash } from './Icons/Trash';
type CardProps = {
  goal: Goal;
};

export const Card = ({ goal }: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const { current, total, name, id } = goal;

  const { width } = Dimensions.get('window');

  const deleteXThreshold = width * 0.2;

  const translateX = useSharedValue(0);
  const marginTop = useSharedValue(8);
  const itemHeight = useSharedValue(200);
  const iconOpacity = useSharedValue(1);

  const { deleteGoal, updateGoal } = useGoals();

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(e => {
          translateX.value = e.translationX < 0 ? e.translationX : 0; // TODO: remove this to use left gesture
        })
        .onEnd(e => {
          const shouldDelete = e.translationX < -deleteXThreshold;
          if (shouldDelete) {
            runOnJS(setIsConfirmationModalOpen)(true);
          } else {
            translateX.value = withTiming(0);
          }
        }),
    [translateX, deleteXThreshold]
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < -deleteXThreshold ? 1 : 0),
    height: 200
  }));

  const containerStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
    opacity: iconOpacity.value
  }));

  const handleIncrement = () => {
    updateGoal(id, current < total ? current + 1 : current);
  };

  const handleDecrement = () => {
    updateGoal(id, current > 0 ? current - 1 : current);
  };

  const handleDelete = () => {
    translateX.value = withTiming(-width);
    itemHeight.value = withTiming(0);
    marginTop.value = withTiming(0);
    iconOpacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        runOnJS(deleteGoal)(id);
      }
    });
  };

  const handleCancel = () => {
    translateX.value = withTiming(0);
  };

  return (
    <>
      <Animated.View style={containerStyle}>
        <Animated.View
          className={`absolute right-0 top-0 w-24 items-center justify-center`}
          style={iconStyle}
        >
          <Trash size={50} color='#ef4444' />
        </Animated.View>
        <GestureDetector gesture={gesture}>
          <Animated.View
            className='relative rounded-xl bg-gray-800 p-4'
            style={cardStyle}
          >
            <Text className='text-2xl text-gray-100'>{name}</Text>
            <View className='mt-4 flex-col items-end justify-between'>
              <GoalCount current={current} total={total} />
              <Actions
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </View>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </>
  );
};
