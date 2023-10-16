'use client';

import { ComponentProps, type ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog';
import { Button } from './button';

type ConfirmDialogProps = {
  onConfirm?: () => void;
  children?: ReactNode;
  description?: ReactNode;
  title?: string;
  isLoading: boolean;
} & ComponentProps<typeof AlertDialog>;

export const ConfirmDialog = ({
  onConfirm,
  children,
  title,
  description,
  isLoading,
  ...props
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ?? 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? 'This action cannot be undone.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleConfirm} isLoading={isLoading}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
