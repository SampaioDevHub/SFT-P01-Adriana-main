/* eslint-disable import/no-unresolved */

import { GenerateStoreReport } from './_components/GenerateStoreReport';

// dados 
const mockProducts = [
  {
    id: "1",
    name: "Notebook Pro",
    category: "Eletrônicos",
    price: 4999.99,
    stock: 15,
    sales: 23,
    lastUpdated: "2024-01-30",
  },
  {
    id: "2",
    name: "Mouse Sem Fio",
    category: "Acessórios",
    price: 89.99,
    stock: 45,
    sales: 156,
    lastUpdated: "2024-01-29",
  },
]

export default function ReportPage() {
  return (
    <main className='container flex flex-col lg:gap-0 gap-8 px-4 py-8'>
      <GenerateStoreReport />
      <div
        className='hidden h-[65vh] w-full bg-cover bg-center lg:flex'
        style={{
          backgroundImage: "url('/assets/relatorio-products-report.gif')"
        }}
      ></div>
      <div
        className='h-[40vh] w-full bg-cover bg-center lg:hidden'
        style={{
          backgroundImage: "url('/assets/relatorio-products-gif-tab.png')"
        }}
      ></div>
    </main>
  );
}

