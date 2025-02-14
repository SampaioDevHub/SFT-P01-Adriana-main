import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  const name = ""
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-rose-600' />
              <p className='text-sm text-muted-foreground'>Carregando...</p>
      </div>
    </div>
  );
}
