/* eslint-disable import/no-unresolved */
'use client';

import { Input } from '@/components/ui/input';

export default function CustomerSales() {
  return (
    <div className='inline-flex h-[71px] flex-col items-start justify-start gap-2 pt-8'>
      <h2 className='text-4'>Cliente</h2>
      <Input
        className='w-full items-center'
        placeholder='Digite o nome ou cpf.'
      />
    </div>
  );
}
