import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { NewGoalModal } from '../components/NewGoalModal';
import { NoGoals } from '../components/NoGoals';
import { useGoals } from '../hooks/useGoals';

export const Home = () => {
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const { goals } = useGoals();

  const toggleNewGoalModal = () => {
    setIsNewGoalModalOpen(!isNewGoalModalOpen);
  };

  return (
    <>
      <View className='h-full w-full'>
        <Header />
        {goals && goals.length > 0 ? (
          <FlashList
            data={goals}
            keyExtractor={goal => goal.id}
            renderItem={({ item }) => <Card goal={item} />}
            estimatedItemSize={154}
          />
        ) : (
          <NoGoals onCreate={toggleNewGoalModal} />
        )}
        {goals && goals.length > 0 && (
          <TouchableOpacity
            className='absolute bottom-5 right-2 h-12 w-12 items-center justify-center rounded-lg bg-gray-800'
            onPress={toggleNewGoalModal}
          >
            <Text className='text-4xl text-white'>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <NewGoalModal open={isNewGoalModalOpen} onClose={toggleNewGoalModal} />
    </>
  );
};
