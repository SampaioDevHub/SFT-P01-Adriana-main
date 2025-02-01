/* eslint-disable import/no-unresolved */
import PageContainer from "@/components/layout/page-container";
import ProductForm from "./_components/productForm";
import ProductTable from "./_components/productTable";

export default function RegisterProduct() {
  return (
    <PageContainer>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cadastro de Produtos</h1>
          <div className='w-full space-y-8'>
            <ProductForm />
            <ProductTable/>
          </div>
      </main>
    </PageContainer>
  );
}




