import PageContainer from '@/_components/layout/page-container';
import SelectSales from './_components/SelectSales';
import CustomerSales from './_components/AddCustomer';
import AddProducts from './_components/AddProducts';
import SelectedProducts from './_components/SelectedProducts';
import GeneralSummary from './_components/GeneralSummary';

export const metadata = {
  title: 'Financeiro | Painel Caixa',
};

export default function RegisterSale() {
  return (
    <PageContainer>
      <div className="container mx-auto block h-auto flex-col px-4 py-6">
        <h1 className="mb-8 text-3xl font-bold">Cadastro de Vendas</h1>
        <SelectSales />
        <div className="flex flex-auto flex-col gap-6 md:flex-col">
          <CustomerSales />
          <AddProducts />
        </div>
        <div className="mt-60">
          <SelectedProducts />
        </div>
        <GeneralSummary />
      </div>
    </PageContainer>
  );
}
