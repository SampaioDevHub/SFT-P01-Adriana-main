' use client';

import React from 'react';
import { Button } from '@/components/ui/button';

export default function GeneralSummary() {
  return (
    <div className='mt-4 inline-flex flex-col items-start justify-start gap-3.5 overflow-hidden px-3'>
      <div className='text-xl font-semibold leading-tight text-card-foreground'>
        Resumo Geral
      </div>
      <div className='flex flex-col items-start justify-start gap-2'>
        <div>
          <span className='text-base font-normal leading-tight text-muted-foreground'>
            Total de Produtos:{' '}
          </span>
          <span className='text-base font-normal leading-tight text-card-foreground'>
            6
          </span>
        </div>
        <div>
          <span className='text-base font-normal leading-tight text-muted-foreground'>
            Subtotal:
          </span>
          <span className='text-base font-normal leading-tight text-card-foreground'>
            {' '}
            R$ 300,00
          </span>
        </div>
        <div>
          <span className='text-base font-normal leading-tight text-muted-foreground'>
            Total de Descontos:
          </span>
          <span className='text-base font-normal leading-tight text-card-foreground'>
            {' '}
            R$ 15,00
          </span>
        </div>
        <div>
          <span className='text-base font-normal leading-tight text-muted-foreground'>
            Total Geral:
          </span>
          <span className='text-base font-normal leading-tight text-card-foreground'>
            {' '}
            R$ 285
          </span>
        </div>
        <Button className=''>Finalizar Venda</Button>
      </div>
    </div>
  );
}
