/* eslint-disable import/no-unresolved */
import GenerateStoreReport from '@/app/(pages)/manager/product-report/_components/GenerateStoreReport';
import financialGif from '@/assets/financialreport.gif';
import financialGifTab from '@/assets/financialgiftab.gif';
import Image from 'next/image';

export default function ReportsPage() {
  return (
    <main className='relative min-h-screen w-full items-center overflow-hidden'>
      <div className='relative z-10'>
        <GenerateStoreReport />
      </div>
      <div className='flex items-center justify-center'>
        {/* Desktop Image */}
        <Image
          src={financialGif}
          alt='Relatório'
          className='hidden w-auto max-w-[80%] object-cover p-10 pt-0 lg:block'
          sizes='(min-width: 1024px) 80vw'
          priority
        />
        {/* Tablet Image */}
        <Image
          src={financialGifTab}
          alt='Relatório'
          className='mt-10 w-[500px] items-center object-cover pt-4 lg:hidden'
          sizes='(max-width: 1023px) 80vw'
          priority
        />
      </div>
    </main>
  );
}
