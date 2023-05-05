import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';

const TabsLayout = () => {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FFF',
          tabBarStyle: {
            backgroundColor: '#202024',
            borderTopColor: '#202024',
            height: Platform.OS === 'ios' ? 80 : 60
          },
          tabBarItemStyle: {
            marginTop: 10,
            paddingBottom: Platform.OS === 'ios' ? 0 : 5
          },
          tabBarLabelStyle: {
            fontSize: 12
          },
          tabBarIconStyle: {
            marginBottom: 4
          }
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ focused }) => (
              <Home color={focused ? '#FFF' : '#A9A9B2'} />
            )
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default TabsLayout;
