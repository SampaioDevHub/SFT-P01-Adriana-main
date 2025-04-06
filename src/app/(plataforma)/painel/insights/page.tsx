
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import PageContainer from '@/_components/layout/page-container';

import { ActiveCustomersCard } from './_components/cards/day-orders-amount-card';
import { MonthOrdersAmountCard } from './_components/cards/month-orders-amount-card';
import { MonthRevenueCard } from './_components/cards/month-revenue-card';
import { GraficoArea } from './_components/revenue-chart';
import { GraficoBarra } from './_components/popular-products-chart';
import { ClientesTable } from './_components/customer-table';

type Produto = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function FinanceDashboard() {
  const { user } = useUser();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch(
          'http://localhost:8080/manage_store/v1/products/find-all'
        );
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProdutos();
  }, []);

  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-6 max-w-screen-xl w-full mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Seja bem-vindo, {user?.firstName || 'Usuário'} 👋
          </h2>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <ActiveCustomersCard />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <GraficoArea />
          <GraficoBarra />
        </div>

        {/* Tabela de Produtos */}
        <ClientesTable />
      </div>
    </PageContainer>
  );
}
