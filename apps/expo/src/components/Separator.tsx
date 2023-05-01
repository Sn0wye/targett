import { Text, View, type ViewProps } from 'react-native';

export const Separator = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props}>
      <Text className='text-5xl text-white'>{children}</Text>
    </View>
  );
};
