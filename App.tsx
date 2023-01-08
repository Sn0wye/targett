import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useGoals } from './src/hooks/useGoals';
import { Home } from './src/screens/Home';

export default function App() {
  const { getGoals } = useGoals();

  useEffect(() => {
    getGoals();
  }, [getGoals]);

  return (
    <SafeAreaProvider>
      <View className='flex-1 bg-gray-900 px-4 pt-12'>
        <StatusBar style='light' />
        <Home />
      </View>
    </SafeAreaProvider>
  );
}
