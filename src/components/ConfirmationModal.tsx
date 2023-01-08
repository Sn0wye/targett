import {
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import { Close } from './Icons/Close';

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm
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
              <Close />
            </TouchableOpacity>
          </View>
          <Text className='mt-4 text-white'>
            Você tem certeza que deseja excluir a meta?
          </Text>
          <View className='mt-8 flex-row justify-end'>
            <TouchableOpacity
              className='mr-2 items-center justify-center rounded-lg bg-gray-800 py-3 px-6'
              onPress={onClose}
            >
              <Text className='text-white'>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='items-center justify-center rounded-lg bg-red-500 py-3 px-6'
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
