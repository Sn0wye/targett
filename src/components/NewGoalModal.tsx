import { useState } from "react";
import {
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { useGoals } from "../hooks/useGoals";
import { Close } from "./Icons/Close";

type NewGoalModalProps = {
  open: boolean;
  onClose: () => void;
};

export const NewGoalModal = ({ open, onClose }: NewGoalModalProps) => {
  const [goalName, setGoalName] = useState("");
  const [total, setTotal] = useState("");

  const { addGoal } = useGoals();

  const handleSubmit = () => {
    addGoal(goalName, total);
    setGoalName("");
    setTotal("");
    onClose();
  };

  return (
    <Modal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior="height"
        className="flex-1 items-center justify-center bg-black/60 px-6"
      >
        <View className="w-full rounded-lg bg-gray-900 p-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl text-white">Nova Meta</Text>

            <TouchableOpacity className="p-2" onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </View>
          <View className="mt-8">
            <TextInput
              className="mb-2 rounded-lg bg-gray-700 p-4 text-white"
              placeholder="Nome da meta"
              placeholderTextColor="#7C7C8A"
              value={goalName}
              onChangeText={setGoalName}
            />

            <TextInput
              className="mb-6 rounded-lg bg-gray-700 p-4 text-white"
              placeholder="Total de Etapas"
              placeholderTextColor="#7C7C8A"
              keyboardType="number-pad"
              value={total}
              onChangeText={setTotal}
            />

            <TouchableOpacity
              className="items-center justify-center rounded-lg bg-gray-800 py-3 px-6"
              onPress={handleSubmit}
            >
              <Text className="text-white">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
