import { View, Text, Image } from 'react-native';

export const Header = () => {
  return (
    <View className='w-full flex-row justify-between rounded-xl bg-gray-800 p-4'>
      <Text className=' text-3xl text-white'>targett</Text>
      <Image source={require('../../assets/logo.png')} className='h-10 w-10' />
    </View>
  );
};
