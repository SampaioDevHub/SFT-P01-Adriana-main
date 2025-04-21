'use client';

import { ReactNode, Suspense } from 'react';

import { CustomerSkeleton } from './components/skeleton/customerSkeleton';

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<CustomerSkeleton />}>{children}</Suspense>;
}
