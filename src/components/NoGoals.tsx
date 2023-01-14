import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type NoGoalsProps = {
  onCreate: () => void;
};

export const NoGoals = ({ onCreate }: NoGoalsProps) => {
  const animation = useRef<LottieView>(null);
  return (
    <View className='flex-1 items-center'>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400
        }}
        source={require('../../assets/lottie/empty-box.json')}
      />
      <Text className='px-3 text-center text-3xl text-white'>
        Parece que você ainda não tem metas.
      </Text>
      <TouchableOpacity
        className='mt-4 rounded-md bg-gray-800 p-2'
        onPress={onCreate}
      >
        <Text className='text-center text-3xl text-white'>Crie uma</Text>
      </TouchableOpacity>
    </View>
  );
};
