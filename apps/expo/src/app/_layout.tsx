import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from '@clerk/clerk-expo';
import { Home } from 'lucide-react-native';

import { TRPCProvider } from '~/utils/api';
import { tokenCache } from '~/utils/tokenCache';

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.publishableKey}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false
            }}
          />
          <StatusBar style='inverted' />
        </SafeAreaProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
