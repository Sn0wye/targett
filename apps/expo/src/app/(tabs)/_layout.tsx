import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';

const TabsLayout = () => {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF0080',
          tabBarStyle: {
            backgroundColor: '#1F104A'
          }
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Posts',
            tabBarIcon: ({ focused }) => (
              <Home color={focused ? '#FF0080' : '#000000'} />
            )
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default TabsLayout;
