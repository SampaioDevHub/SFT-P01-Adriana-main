import PageContainer from '@/_components/layout/page-container';

import { ProductForm } from './_components/productForm';
import { ProductTable } from './_components/productTable';

export default function RegisterProduct() {
  return (
    <PageContainer>
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Cadastro de Produtos</h1>
        <div className="w-full space-y-8">
          <ProductForm />
          <ProductTable />
        </div>
      </main>
    </PageContainer>
  );
}
