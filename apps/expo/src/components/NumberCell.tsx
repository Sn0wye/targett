import { Text, View, type ViewProps } from 'react-native';

export const NumberCell = ({ children, ...props }: ViewProps) => {
  return (
    <View className='rounded-lg bg-gray-700 px-2 pb-1 pt-3' {...props}>
      <Text className='text-5xl text-white'>{children}</Text>
    </View>
  );
};
