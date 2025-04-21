'use client';

import { ReactNode, Suspense } from 'react';

import { SaleProvider } from '@/_components/providers/saleContext';

import { SaleSkeleton } from './components/skeleton/saleSkeleton';

export default function SalesLayout({ children }: { children: ReactNode }) {
  return (
    <SaleProvider>
      <Suspense fallback={<SaleSkeleton />}>{children}</Suspense>
    </SaleProvider>
  );
}
