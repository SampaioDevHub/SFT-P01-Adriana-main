/* eslint-disable import/no-unresolved */
import PageContainer from "@/components/layout/page-container";
import ProductManagement from "./_components/ProductManagement";

export default function RegisterProduct() {
  return (
    <PageContainer>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cadastro de Produtos</h1>
        {/*Produto Component*/}
        <ProductManagement />
      </main>
    </PageContainer>
  );
}




