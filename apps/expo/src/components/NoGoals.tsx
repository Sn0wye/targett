import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type NoGoalsProps = {
  onCreate: () => void;
};

export const NoGoals = ({ onCreate }: NoGoalsProps) => {
  return (
    <View className='flex-1 items-center'>
      <Text className='px-3 text-center text-3xl text-white'>
        Parece que você ainda não tem nenhuma meta :(
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
