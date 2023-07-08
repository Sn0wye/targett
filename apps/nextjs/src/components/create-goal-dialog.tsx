import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useZact } from 'zact/client';
import { type z } from 'zod';

import { createGoalSchema } from '@targett/db/schemas';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { createGoalAction } from '~/actions/create-goal';

type FormFields = z.infer<typeof createGoalSchema>;
type TransformedFormFields = z.output<typeof createGoalSchema>;

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateGoalDialog = ({ open, onOpenChange }: DialogProps) => {
  const { userId } = useAuth();
  const form = useForm<FormFields>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: '',
      current: 0,
      total: 0,
      userId: String(userId),
      // @ts-expect-error Type 'Date' is not assignable to type 'string'
      createdAt: new Date(),
      // @ts-expect-error Type 'Date' is not assignable to type 'string'
      updatedAt: new Date()
    }
  });

  const { mutate, isLoading } = useZact(createGoalAction);

  const onSubmit = async (data: TransformedFormFields) => {
    await mutate(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogBody className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Nova Meta</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Form<FormFields, TransformedFormFields> {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, e => console.warn(e))}
              className='space-y-8'
              id='create-goal'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder='Ex: Comprar um carro' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='total'
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Total de etapas</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        onChange={event => onChange(+event.target.value)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
        <DialogFooter className='sm:justify-between'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type='submit' isLoading={isLoading} form='create-goal'>
            Continuar
          </Button>
        </DialogFooter>
      </DialogBody>
    </Dialog>
  );
};
