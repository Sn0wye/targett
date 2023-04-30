import React from "react";
import { Button, SafeAreaView, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "~/hooks/useWarmupBrowser";

const SignInScreen = () => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const SignInWithOAuth = () => {
  // Warm up the browser to avoid a delay when the user clicks the button for good user UX
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_github" });

  const onPress = async () => {
    console.log("press");
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        console.log("OAuth session created", createdSessionId);
        setActive && void setActive({ session: createdSessionId });
        console.log("OAuth session activated", typeof setActive);
      } else {
        console.log("OAuth session not created");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button title="Sign in GitHub" onPress={() => void onPress} />
    </View>
  );
};
