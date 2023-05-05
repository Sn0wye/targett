import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { useAuth, useClerk, useUser } from '@clerk/clerk-expo';
import { FlashList } from '@shopify/flash-list';

import { api } from '~/utils/api';
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
      </View>
      <NewGoalModal open={isNewGoalModalOpen} onClose={toggleNewGoalModal} />
    </SafeAreaView>
  );
};

const _AuthShowcase = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery();

  const { signOut } = useClerk();

  const router = useRouter();

  return (
    <View className='flex flex-col items-center justify-center gap-4'>
      {user && (
        <Text className='text-center text-2xl text-white'>
          <Text>Logged in as {user.fullName}</Text>
          {secretMessage && <Text> - {secretMessage}</Text>}
        </Text>
      )}
      <TouchableOpacity
        className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
        onPress={
          isSignedIn ? () => void signOut() : () => router.push('/login')
        }
      >
        <Text className='text-white'>
          {isSignedIn ? 'Sign out' : 'Sign in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
