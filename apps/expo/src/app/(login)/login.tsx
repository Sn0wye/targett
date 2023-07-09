import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';

import { useWarmUpBrowser } from '~/hooks/useWarmupBrowser';
import { Github, Google } from '~/icons';

WebBrowser.maybeCompleteAuthSession();

const SignInScreen = () => {
  return (
    <SafeAreaView className='bg-zinc-900'>
      <View className='h-full w-full'>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const useSignInWithOAuth = ({
  strategy
}: {
  strategy: 'oauth_github' | 'oauth_google';
}) => {
  const { startOAuthFlow } = useOAuth({ strategy });

  const router = useRouter();

  const logIn = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive && void setActive({ session: createdSessionId });
        router.push('/');
      }
    } catch (err) {
      console.error('OAuth error', JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow, router]);

  return { logIn };
};

const SignInWithOAuth = () => {
  // Warm up the browser to avoid a delay when the user clicks the button for good user UX
  useWarmUpBrowser();

  const { logIn: logInWithGithub } = useSignInWithOAuth({
    strategy: 'oauth_github'
  });

  const { logIn: logInWithGoogle } = useSignInWithOAuth({
    strategy: 'oauth_google'
  });

  return (
    <View className='h-full w-full items-center justify-center p-6'>
      <View className='mb-10 w-full'>
        <Image
          source={require('../../../assets/logo.png')}
          alt='targett logo'
          className='mb-10 h-40 w-40 self-center'
        />
        <TouchableOpacity
          className='mb-6 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-3'
          onPress={() => void logInWithGithub()}
        >
          <Text>
            <Github size={24} className='mb-1 text-white' />
          </Text>
          <Text className='h-full text-xl font-semibold text-white'>
            Log in with GitHub
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-row items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-3'
          onPress={() => void logInWithGoogle()}
        >
          <Google size={24} className='mb-1 text-white' />
          <Text className='h-full text-xl font-semibold text-white'>
            Log in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
