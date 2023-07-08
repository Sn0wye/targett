import React, { useEffect } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { FlashList } from '@shopify/flash-list';

import { cn } from '~/utils/cn';
import { Card } from '~/components/Card';
import { Header } from '~/components/Header';
import { NewGoalModal } from '~/components/NewGoalModal';
import { NoGoals } from '~/components/NoGoals';
import { useGoals } from '~/hooks/useGoals';

const Home = () => {
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = React.useState(false);

  const { goals } = useGoals();

  const toggleNewGoalModal = () => {
    setIsNewGoalModalOpen(!isNewGoalModalOpen);
  };

  return (
    <SafeAreaView className='bg-gray-900 px-4'>
      <View className='h-full w-full'>
        <Header />
        <SignedIn>
          {goals && goals.length > 0 ? (
            <FlashList
              data={goals}
              keyExtractor={goal => goal.id}
              renderItem={({ item }) => <Card goal={item} />}
              estimatedItemSize={154}
              ItemSeparatorComponent={() => <View className='h-2' />}
            />
          ) : (
            <NoGoals onCreate={toggleNewGoalModal} />
          )}
          {goals && goals.length > 0 && (
            <TouchableOpacity
              className={cn(
                'absolute right-0 h-12 w-12 items-center justify-center rounded-lg bg-orange-500',
                Platform.OS === 'android' ? 'bottom-4' : '-bottom-4'
              )}
              onPress={toggleNewGoalModal}
            >
              <Text className='text-4xl text-white'>+</Text>
            </TouchableOpacity>
          )}
        </SignedIn>
        <SignedOut>
          <RedirectToLogin />
        </SignedOut>
      </View>
      <NewGoalModal open={isNewGoalModalOpen} onClose={toggleNewGoalModal} />
    </SafeAreaView>
  );
};

export default Home;

const RedirectToLogin = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
  }, [router, isSignedIn]);

  return null;
};
