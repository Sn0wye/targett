import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from '@clerk/clerk-expo';
import { NativeBaseProvider } from 'native-base';

import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { TRPCProvider } from '~/utils/api';
import { tokenCache } from '~/utils/tokenCache';
import { useGoals } from '~/hooks/useGoals';

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const { getGoals } = useGoals();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    getGoals().then(() => setIsReady(true));
  }, [getGoals]);

  const onLayoutReady = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.publishableKey}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView className='flex-1' onLayout={onLayoutReady}>
              {!isReady && <SplashScreen />}
              <Stack
                screenOptions={{
                  headerShown: false
                }}
              />
              <StatusBar style='light' />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
