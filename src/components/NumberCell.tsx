import { View, ViewProps, Text } from 'react-native';

export const NumberCell = ({ children, ...props }: ViewProps) => {
  return (
    <View className='rounded-lg bg-gray-700 px-2 pt-3 pb-1' {...props}>
      <Text className='text-5xl text-white'>{children}</Text>
    </View>
  );
};
