import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { useStore } from "./src/hooks/useStore";
import { Home } from "./src/screens/Home";

export default function App() {
  const { getData } = useStore();

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="fle x-1 bg-gray-900 px-4 pt-12">
      <StatusBar style="light" />
      <Home />
    </View>
  );
}
