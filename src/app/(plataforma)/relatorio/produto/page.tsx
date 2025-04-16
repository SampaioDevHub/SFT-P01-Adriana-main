'use client';

import PageContainer from '@/_components/layout/page-container';

import { ProductReport  } from './_components/productReport';

export default function ReportPage() {
  return (
    <PageContainer>
      <div className="container px-4 py-8">
        <ProductReport  />
      </div>
    </PageContainer>
  );
}
