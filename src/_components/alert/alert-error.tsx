import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';

interface AlertErrorProps extends AlertDialogProps {
  title: string; 
  errorMessage: string;
}

export function AlertError({ title, errorMessage, ...props}: AlertErrorProps) {
  return (
    <Alert {...props} variant='destructive' className='mt-4'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
