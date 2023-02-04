import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useGoals } from './src/hooks/useGoals';
import { Home } from './src/screens/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { getGoals } = useGoals();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    getGoals().then(() => setAppIsReady(true));
  }, [getGoals]);

  const onLayoutReady = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView
          className='flex-1 bg-gray-900 px-4 pt-12'
          onLayout={onLayoutReady}
        >
          <StatusBar style='light' />
          <Home />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
