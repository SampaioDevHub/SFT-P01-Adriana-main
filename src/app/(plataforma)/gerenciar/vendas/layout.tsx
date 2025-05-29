'use client';

import { ReactNode } from 'react';

import { SaleProvider } from '@/_providers/sale-provider';

export default function SalesLayout({ children }: { children: ReactNode }) {
  return <SaleProvider>{children}</SaleProvider>;
}
