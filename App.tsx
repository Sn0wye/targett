import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';

import { useGoals } from './src/hooks/useGoals';
import { Home } from './src/screens/Home';

export default function App() {
  const { getGoals } = useGoals();

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <View className='fle x-1 bg-gray-900 px-4 pt-12'>
      <StatusBar style='light' />
      <Home />
    </View>
  );
}
