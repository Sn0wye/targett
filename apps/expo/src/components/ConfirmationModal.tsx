import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { X } from 'lucide-react-native';

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
};

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCancel = () => {}
}: ConfirmationModalProps) => {
  return (
    <Modal
      transparent
      visible={open}
      animationType='fade'
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior='height'
        className='flex-1 items-center justify-center bg-black/60 px-6'
      >
        <View className='w-full rounded-lg bg-gray-900 p-6'>
          <View className='flex-row items-center justify-between'>
            <Text className='text-2xl text-white'>Confirmação</Text>

            <TouchableOpacity className='p-2' onPress={onClose}>
              <X color='#FFF' />
            </TouchableOpacity>
          </View>
          <Text className='mt-4 text-white'>
            Você tem certeza que deseja excluir a meta?
          </Text>
          <View className='mt-8 flex-row justify-end'>
            <TouchableOpacity
              className='mr-2 items-center justify-center rounded-lg bg-gray-800 px-6 py-3'
              onPress={() => {
                onClose();
                onCancel();
              }}
            >
              <Text className='text-white'>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='items-center justify-center rounded-lg bg-red-500 px-6 py-3'
              onPress={onConfirm}
            >
              <Text className='text-white'>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
