
'use client';

import { SaleProvider } from '@/_components/providers/saleContext';
import { ReactNode } from 'react';

export default function VendasLayout({ children }: { children: ReactNode }) {
  return <SaleProvider>{children}</SaleProvider>;
}
