'use client';

import { ReactNode, Suspense } from 'react';
import { ReportSaleSkeleton } from './components/skeleton/reportSaleSkeleton';

export default function ReportSaleLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<ReportSaleSkeleton />}>{children}</Suspense>;
}
