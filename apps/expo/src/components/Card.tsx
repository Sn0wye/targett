import { useMemo, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeInDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Edit, Trash2 } from 'lucide-react-native';
import { useToast } from 'native-base';

import { pickRandomPhrase } from '../data/phrases';
import { useGoals, type Goal } from '../hooks/useGoals';
import { Actions } from './Actions';
import { ConfirmationModal } from './ConfirmationModal';
import { GoalCount } from './GoalCount';
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
  const marginTop = useSharedValue(0);
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
            translateX.value = withTiming(0);
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

  const toast = useToast();

  const handleIncrement = () => {
    updateCurrent(id, current + 1);

    if (current + 1 === total) {
      toast.show({
        title: 'Parabéns!',
        description: pickRandomPhrase(),
        background: '#29292E',
        borderLeftColor: '#22c55e',
        borderLeftWidth: 4,
        px: 4,
        marginBottom: 8
      });
    }
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
      <Animated.View style={containerStyle} entering={FadeInDown}>
        <Animated.View
          className={`absolute right-0 top-0 w-24 items-center justify-center`}
          style={deleteIconStyle}
        >
          <Trash2 size={50} color='#ef4444' />
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
