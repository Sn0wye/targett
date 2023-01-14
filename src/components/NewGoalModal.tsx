import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  View,
  TextInput
} from 'react-native';
import { z } from 'zod';

import { useGoals } from '../hooks/useGoals';
import { Close } from './Icons/Close';

const formSchema = z.object({
  goalName: z.string().min(1).max(50),
  total: z.string().min(1).max(3)
});

type FormFields = z.infer<typeof formSchema>;

type NewGoalModalProps = {
  open: boolean;
  onClose: () => void;
};

export const NewGoalModal = ({ open, onClose }: NewGoalModalProps) => {
  const { control, handleSubmit, setValue } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: '',
      total: ''
    }
  });

  const { createNewGoal } = useGoals();

  const onSubmit = (data: FormFields) => {
    const { goalName, total } = data;

    createNewGoal({
      name: goalName,
      total: +total
    });

    onClose();

    setValue('goalName', '');
    setValue('total', '');
  };

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
            <Text className='text-2xl text-white'>Nova Meta</Text>

            <TouchableOpacity className='p-2' onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </View>
          <View className='mt-8'>
            <Controller
              name='goalName'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  className='mb-2 rounded-lg bg-gray-700 p-4 text-white'
                  placeholder='Nome da meta'
                  placeholderTextColor='#7C7C8A'
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name='total'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  className='mb-6 rounded-lg bg-gray-700 p-4 text-white'
                  placeholder='Total de Etapas'
                  placeholderTextColor='#7C7C8A'
                  keyboardType='number-pad'
                  onBlur={onBlur}
                  value={String(value) || ''}
                  onChangeText={onChange}
                />
              )}
            />

            <TouchableOpacity
              className='items-center justify-center rounded-lg bg-gray-800 py-3 px-6'
              onPress={handleSubmit(onSubmit)}
            >
              <Text className='text-white'>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
