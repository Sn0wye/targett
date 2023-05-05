import type { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'targett',
  slug: 'targett',
  scheme: 'expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#121214'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sn0wye.targett'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    },
    package: 'com.sn0wye.targett'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    eas: {
      projectId: '22751e82-985c-495e-aea7-1a53241f86e8'
    },
    publishableKey:
      'pk_test_c21hc2hpbmctdmVydmV0LTkyLmNsZXJrLmFjY291bnRzLmRldiQ'
  },
  plugins: ['./expo-plugins/with-modify-gradle.js']
});

export default defineConfig;
