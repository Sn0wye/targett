import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from '@clerk/clerk-expo';

import { TRPCProvider } from '~/utils/api';
import { tokenCache } from '~/utils/tokenCache';
import { useGoals } from '~/hooks/useGoals';

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const { getGoals } = useGoals();
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    getGoals().then(() => setAppIsReady(true));
  }, [getGoals]);

  const onLayoutReady = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.publishableKey}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView className='flex-1' onLayout={onLayoutReady}>
            <Stack
              screenOptions={{
                headerShown: false
              }}
            />
            <StatusBar style='inverted' />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
