import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../hooks/useStore";
import { Card } from "../components/Card";
import { NewGoalModal } from "../components/NewGoalModal";
import { ConfirmationModal } from "../components/ConfirmationModal";

export const Home = () => {
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const { goals, clearStore } = useStore();

  const toggleNewGoalModal = () => {
    setIsNewGoalModalOpen(!isNewGoalModalOpen);
  };

  return (
    <>
      <View className="h-full w-full">
        {goals &&
          goals.length > 0 &&
          goals.map((goal) => <Card key={goal.id} goal={goal} />)}
        <TouchableOpacity
          className="absolute bottom-5 right-2 h-12 w-12 items-center justify-center rounded-lg bg-gray-800"
          onPress={toggleNewGoalModal}
        >
          <Text className="text-4xl text-white">+</Text>
        </TouchableOpacity>
      </View>
      <NewGoalModal open={isNewGoalModalOpen} onClose={toggleNewGoalModal} />
    </>
  );
};
