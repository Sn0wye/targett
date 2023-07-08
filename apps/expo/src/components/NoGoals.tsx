import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useClerk } from '@clerk/clerk-expo';
import { Plus } from 'lucide-react-native';

type NoGoalsProps = {
  onCreate: () => void;
};

export const NoGoals = ({ onCreate }: NoGoalsProps) => {
  const { signOut } = useClerk();

  return (
    <View className='flex-1 items-center justify-center'>
      <Text
        className='text-center text-3xl text-white'
        onPress={() => signOut()}
      >
        Parece que você ainda não tem nenhuma meta :(
      </Text>
      <TouchableOpacity
        className='mt-8 flex-row items-center rounded-md bg-orange-500 p-4'
        onPress={onCreate}
      >
        <Plus className='mr-1 text-white' size={24} strokeWidth={3} />
        <Text className='text-center text-2xl font-semibold uppercase tracking-tighter text-white'>
          Adicionar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
