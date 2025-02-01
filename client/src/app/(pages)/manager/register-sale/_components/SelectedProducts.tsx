'use client';

import React from 'react';

export default function SelectedProducts() {
  return (
    <div className='flex w-full flex-col items-start justify-end gap-4'>
      <h2 className='text-xl font-bold text-card-foreground'>
        Produtos Selecionados
      </h2>

      <div className='flex w-full flex-col items-center justify-between rounded-[8px] border'>
        <div className='flex h-12 w-full items-center justify-between rounded-tl-lg rounded-tr-lg border'>
          <div className='flex shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-[#a7a19d]'>
              Nome
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-[#a7a19d]'>
              Quantidade
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-[#a7a19d]'>
              Desconto
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-[#a7a19d]'>
              Preço Total
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-[#a7a19d]'>
              Deletar
            </div>
          </div>
        </div>

        <div className='flex h-12 w-full items-center justify-between border-b'>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              Bermuda
            </div>
          </div>
          <div className='flex w-[100px] grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              2
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              5%
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              R$ 95,00{' '}
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='inline-flex h-7 items-center justify-center gap-2.5 rounded-lg bg-[#a7a19d] px-3 py-2.5'>
              <div className='text-right text-sm font-medium leading-relaxed text-[#211f1d]'>
                Remover
              </div>
            </div>
          </div>
        </div>

        <div className='flex h-12 w-full items-center justify-between border-b'>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              Calça
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              3
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              5%
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              R$ 95,00{' '}
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='inline-flex h-7 items-center justify-center gap-2.5 rounded-lg bg-[#a7a19d] px-3 py-2.5'>
              <div className='text-right text-sm font-medium leading-relaxed text-[#211f1d]'>
                Remover
              </div>
            </div>
          </div>
        </div>

        <div className='flex h-12 w-full items-center justify-between'>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              Tênis
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              1
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              5%
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='text-right text-base font-medium leading-relaxed text-card-foreground'>
              R$ 95,00{' '}
            </div>
          </div>
          <div className='flex w-[100px] shrink grow items-center justify-between px-4 py-2.5'>
            <div className='inline-flex h-7 items-center justify-center gap-2.5 rounded-lg bg-[#a7a19d] px-3 py-2.5'>
              <div className='text-right text-sm font-medium leading-relaxed text-[#211f1d]'>
                Remover
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
