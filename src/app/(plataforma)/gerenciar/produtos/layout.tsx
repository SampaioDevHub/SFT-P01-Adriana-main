'use client';

import { ReactNode, Suspense } from 'react';

import { ProductSkeleton } from './components/skeleton/productSkeleton';

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
      <Suspense fallback={<ProductSkeleton />}>{children}</Suspense>
  );
}
