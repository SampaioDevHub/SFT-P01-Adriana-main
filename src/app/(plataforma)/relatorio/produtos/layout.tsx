'use client';

import { ReactNode, Suspense } from 'react';
import { ReportProductSkeleton } from './components/skeleton/reportProductSkeleton';

export default function ReportProductLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<ReportProductSkeleton />}>{children}</Suspense>;
}
