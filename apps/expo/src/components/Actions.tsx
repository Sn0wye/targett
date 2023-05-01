import { TouchableOpacity, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type ActionsProps = {
  onDecrement: () => void;
  onIncrement: () => void;
};

export const Actions = ({ onIncrement, onDecrement }: ActionsProps) => {
  return (
    <View className='mt-4 flex-row'>
      <TouchableOpacity
        className='h-10 w-10 items-center justify-center rounded-lg bg-gray-700'
        onPress={onDecrement}
      >
        <Minus color='#fff' />
      </TouchableOpacity>
      <TouchableOpacity
        className='ml-1 h-10 w-10 items-center justify-center rounded-lg bg-gray-700'
        onPress={onIncrement}
      >
        <Plus color='#fff' />
      </TouchableOpacity>
    </View>
  );
};
