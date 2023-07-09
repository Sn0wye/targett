import { ReactNode } from 'react';
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
  DialogTitle,
  DialogTrigger
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
  children: ReactNode;
};

export const CreateGoalDialog = ({
  open,
  onOpenChange,
  children
}: DialogProps) => {
  const { userId } = useAuth();
  const form = useForm<FormFields>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: '',
      // @ts-ignore
      total: '',
      userId: String(userId)
    }
  });

  const { mutate, isLoading } = useZact(createGoalAction);

  const onSubmit = async (data: TransformedFormFields) => {
    await mutate(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogBody className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>New Goal</DialogTitle>
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
                    <FormLabel>Goal Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Total Steps</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        onChange={e => onChange(+e.target.value)}
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
            Cancel
          </Button>
          <Button type='submit' isLoading={isLoading} form='create-goal'>
            Create
          </Button>
        </DialogFooter>
      </DialogBody>
    </Dialog>
  );
};
