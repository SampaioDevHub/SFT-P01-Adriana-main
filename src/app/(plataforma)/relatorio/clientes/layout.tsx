'use client';

import { ReactNode, Suspense } from 'react';
import { ReportCustomerSkeleton } from './components/skeleton/reportCustomerSkeleton';

export default function ReportCustomerLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<ReportCustomerSkeleton />}>{children}</Suspense>;
}
