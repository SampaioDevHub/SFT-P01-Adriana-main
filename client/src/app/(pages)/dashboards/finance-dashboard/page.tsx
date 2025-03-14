'use client';

import { useUser } from '@clerk/nextjs';
import PageContainer from '@/_components/layout/page-container';

import { DayOrdersAmountCard } from './_components/cards/day-orders-amount-card';
import { MonthOrdersAmountCard } from './_components/cards/month-orders-amount-card';
import { MonthRevenueCard } from './_components/cards/month-revenue-card';
import { RevenueChart } from './_components/revenue-chart';
import { PopularProductsChart } from './_components/popular-products-chart';

export default function FinanceDashboard() {
  const { user } = useUser();
  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Seja bem-vindo {user?.firstName || 'Usuário'} 👋
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
        </div>

        <div className="md:flex-row flex flex-col justify-between gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </PageContainer>
  );
}
