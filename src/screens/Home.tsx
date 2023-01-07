import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../hooks/useStore";
import { Card } from "../components/Card";

export const Home = () => {
  const [goalName, setGoalName] = useState("");
  const [total, setTotal] = useState("0");

  const { goals, addValue, clearStore } = useStore();

  const handleAdd = () => {
    addValue(goalName, total);
    setGoalName("");
    setTotal("0");
  };


  return (
    <View className="h-full w-full">
      {/* <TextInput
        className='bg-white'
        value={goalName}
        onChangeText={setGoalName}
        placeholder='Nome da Meta...'
      />
      <TextInput
        className='bg-white'
        keyboardType='numeric'
        value={total}
        onChangeText={setTotal}
        placeholder='Objetivo...'
      />
      <TouchableOpacity className='bg-white' onPress={handleAdd}>
        <Text className=''>Adicionar</Text>
      </TouchableOpacity>
      */}
      <TouchableOpacity className='bg-white' onPress={clearStore}>
        <Text className=''>Clear</Text>
      </TouchableOpacity>
      
      {goals && goals.length > 0 && <Card goal={goals[0]} />}
       <Text className='text-zinc-100 text-4xl'>
        {JSON.stringify(goals, null, 2)}
      </Text> 
    </View>
  );
};