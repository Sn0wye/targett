import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Content, Form, Header, Input, Overlay } from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ open, onClose, onSave }: ModalProps) {
  const [table, setTable] = useState('');
  const isAndroid = Platform.OS === 'android';
  const isButtonDisabled = table.length === 0;

  const handleSubmit = () => {
    onSave(table);
    setTable('');
    onClose();
  };

  return (
    <Modal
      transparent
      visible={open}
      animationType='fade'
      onRequestClose={onClose}
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <Content>
          <Header>
            <Text weight={600}>TableModal</Text>

            <TouchableOpacity style={{ padding: 8 }} onPress={onClose}>
              <Close color='#000' />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              value={table}
              onChangeText={setTable}
            />

            <Button onPress={handleSubmit} disabled={isButtonDisabled}>
              Salvar
            </Button>
          </Form>
        </Content>
      </Overlay>
    </Modal>
  );
}
