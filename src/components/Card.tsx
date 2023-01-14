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
import { Edit } from './Icons/Edit';
import { Trash } from './Icons/Trash';
import { UpdateGoalModal } from './UpdateGoalModal';
type CardProps = {
  goal: Goal;
};

export const Card = ({ goal }: CardProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { current, total, name, id } = goal;

  const { width } = Dimensions.get('window');

  const gestureThreshold = width * 0.2;
  const deleteXThreshold = -gestureThreshold; // Swipe left to delete
  const updateXThreshold = gestureThreshold; // Swipe right to update

  const translateX = useSharedValue(0);
  const marginTop = useSharedValue(8);
  const itemHeight = useSharedValue(200);
  const iconOpacity = useSharedValue(1);

  const { deleteGoal, updateCurrent } = useGoals();

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(30)
        .onUpdate(e => {
          translateX.value = e.translationX;
        })
        .onEnd(e => {
          const shouldDelete = e.translationX < deleteXThreshold;
          const shouldUpdate = e.translationX > updateXThreshold;

          if (shouldUpdate) {
            runOnJS(setIsUpdateModalOpen)(true);
          }

          if (shouldDelete) {
            runOnJS(setIsConfirmationModalOpen)(true);
          } else {
            translateX.value = withTiming(0);
          }
        }),
    [translateX, deleteXThreshold, updateXThreshold]
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const editIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value > updateXThreshold ? 1 : 0),
    height: 200
  }));

  const deleteIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < deleteXThreshold ? 1 : 0),
    height: 200
  }));

  const containerStyle = useAnimatedStyle(() => ({
    marginTop: marginTop.value,
    opacity: iconOpacity.value
  }));

  const handleIncrement = () => {
    updateCurrent(id, current < total ? current + 1 : current);
  };

  const handleDecrement = () => {
    updateCurrent(id, current > 0 ? current - 1 : current);
  };

  const handleDelete = () => {
    setIsConfirmationModalOpen(false);
    translateX.value = withTiming(-width);
    itemHeight.value = withTiming(0);
    marginTop.value = withTiming(0);
    iconOpacity.value = withTiming(0, undefined, isFinished => {
      if (isFinished) {
        runOnJS(deleteGoal)(id);
      }
    });
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
    translateX.value = withTiming(0);
  };

  return (
    <>
      <Animated.View style={containerStyle}>
        <Animated.View
          className={`absolute right-0 top-0 w-24 items-center justify-center`}
          style={deleteIconStyle}
        >
          <Trash size={50} color='#ef4444' />
        </Animated.View>
        <Animated.View
          className={`absolute left-0 top-0 w-24 items-center justify-center`}
          style={editIconStyle}
        >
          <Edit size={50} color='#3B82F6' />
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
        onConfirm={handleDelete}
        onClose={handleCancelDelete}
        onCancel={handleCancelDelete}
      />
      <UpdateGoalModal
        open={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        goal={goal}
      />
    </>
  );
};
