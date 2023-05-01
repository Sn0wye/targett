import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useGoals, type Goal } from '../hooks/useGoals';

const formSchema = z.object({
  goalName: z.string().min(1).max(50),
  total: z.string().min(1).max(3),
  current: z.string().min(1).max(3)
});

type FormFields = z.infer<typeof formSchema>;

type UpdateGoalModalProps = {
  goal: Goal;
  open: boolean;
  onClose: () => void;
};

export const UpdateGoalModal = ({
  open,
  onClose,
  goal
}: UpdateGoalModalProps) => {
  const { id, name, current, total } = goal;
  const { updateGoal } = useGoals();

  const { control, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalName: name,
      current: String(current),
      total: String(total)
    }
  });

  const onSubmit = (data: FormFields) => {
    updateGoal(id, {
      ...data,
      name: data.goalName,
      total: +data.total,
      current: +data.current
    });
    onClose();
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
            <Text className='text-2xl text-white'>Edição de meta</Text>

            <TouchableOpacity className='p-2' onPress={onClose}>
              <X color='#FFF' />
            </TouchableOpacity>
          </View>
          <View className='mt-8'>
            <Text className='mb-2 text-white'>Nome</Text>
            <Controller
              name='goalName'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  className='mb-4 rounded-lg bg-gray-700 p-4 text-white'
                  placeholder='Nome da meta'
                  placeholderTextColor='#7C7C8A'
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Text className='mb-2 text-white'>Etapa Atual</Text>
            <Controller
              name='current'
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  className='mb-4 rounded-lg bg-gray-700 p-4 text-white'
                  placeholder='Etapa Atual'
                  placeholderTextColor='#7C7C8A'
                  keyboardType='number-pad'
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Text className='mb-2 text-white'>Total de Etapas</Text>
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
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <TouchableOpacity
              className='items-center justify-center rounded-lg bg-blue-500 px-6 py-3'
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
