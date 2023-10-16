import { ComponentProps, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { api } from '~/trpc/react';
import { Calendar } from './ui/calendar';
import { Textarea } from './ui/textarea';

type FormFields = z.infer<typeof createGoalSchema>;
type TransformedFormFields = z.output<typeof createGoalSchema>;

export const CreateGoalDialog = ({
  children,
  ...props
}: ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const { refresh } = useRouter();

  const { mutate, isLoading } = api.goal.create.useMutation();

  const onSubmit = async (data: TransformedFormFields) => {
    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        refresh();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} {...props}>
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
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='deadline'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className='w-full'>
                          <Button
                            variant='outline'
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-zinc-400'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-auto p-0'
                        align='start'
                        portal={false}
                        sideOffset={16}
                      >
                        <Calendar
                          mode='single'
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={date =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                          className='rounded-md'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
        <DialogFooter className='sm:justify-between'>
          <Button variant='outline' onClick={() => setIsOpen(false)}>
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
