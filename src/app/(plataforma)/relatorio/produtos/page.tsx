'use client';

import { PageContainer } from '@/_components/layout/page-container';

import { ProductReport } from './components/productReport';

export default function ReportProductPage() {
  return (
    <PageContainer>
      <div className="container px-4 py-8">
        <ProductReport />
      </div>
    </PageContainer>
  );
}
