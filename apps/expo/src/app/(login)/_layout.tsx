import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='login' options={{}} />
      </Stack>
      {/* <Slot /> */}
    </SafeAreaProvider>
  );
};

export default AuthLayout;
