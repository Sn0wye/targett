import { Image, Text, View } from 'react-native';
import { Settings } from 'lucide-react-native';

export const Header = () => {
  return (
    <View className='mb-2 w-full flex-row items-center justify-between rounded-xl bg-gray-800 p-4'>
      <View className='flex-row gap-2'>
        <Image
          source={require('@/logo.png')}
          alt='targett logo'
          className='h-10 w-10'
        />
        <Text className=' text-3xl text-white'>targett</Text>
      </View>
      <View className='items-center'>
        <Settings className='text-gray-400' />
      </View>
    </View>
  );
};
