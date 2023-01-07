import { View, Text, ViewProps } from "react-native";
import { Goal } from "../hooks/useStore";

type CardProps = {
  goal: Goal;
}

export const Card = ({ goal }: CardProps) => {
  const { current, total, name } = goal;
  const currentCells = String(current).split('').map((digit, i) => {
    const ml = i === 0 ? 0 : 8; 

    return (
    <Cell key={i} style={{ marginLeft: ml}}>{digit}</Cell>
  )
  });

  const totalCells = String(total).split('').map((digit, i) => {
    const ml = i === 0 ? 12 : 8; 

    return (
    <Cell key={i} style={{ marginLeft: ml}}>{digit}</Cell>
  )
  });

  return (
    <View className="rounded-xl bg-gray-800 p-4">
      <Text className="text-2xl text-gray-100">{name}</Text>
      <View className="mt-4 flex-row items-center">
        {currentCells}
        <Separator className="ml-3">/</Separator>
        {totalCells}
      </View>
    </View>
  );
};


const Separator = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props}>
      <Text className="text-5xl text-white">{children}</Text>
    </View>
  );
};

const Cell = ({ children, ...props }: ViewProps) => {
  return (
    <View className="rounded-lg bg-gray-700 px-2 pt-3 pb-1" {...props}>
      <Text className="text-5xl text-white">{children}</Text>
    </View>
  );
};
