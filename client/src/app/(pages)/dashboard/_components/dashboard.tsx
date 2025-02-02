/* eslint-disable import/no-unresolved */
'use client';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';
import { useUser } from '@clerk/nextjs';
import { DollarSign, Package, TrendingUp } from 'lucide-react';
import { FloatingChat } from '@/components/FloatingChat';
import { Component } from './barchart-multiple';

export default function Dasboard() {
  const { user } = useUser();
  return (
    <PageContainer scrollable>
      <div className='space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Seja bem-vindo {user?.firstName || 'Usuário'} 👋
          </h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card className='transition-all duration-300 hover:scale-105 hover:shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-2xl font-medium'>
                    Receita Total
                  </CardTitle>
                  <DollarSign />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>R$ 0,00</div>
                  <p className='text-sm text-muted-foreground'>
                    Receita gerada
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:scale-105 hover:shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-2xl font-medium'>
                    Total de Vendas
                  </CardTitle>
                  <TrendingUp />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>0</div>
                  <p className='text-sm text-muted-foreground'>
                    Unidade vendidas
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:scale-105 hover:shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-2xl font-medium'>
                    Estoque Total
                  </CardTitle>
                  <Package />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>0</div>
                  <p className='text-sm text-muted-foreground'>
                    Unidades em estoque
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:scale-105 hover:shadow-md'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-2xl font-medium'>
                    Total de Produtos
                  </CardTitle>
                  <Package />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>0</div>
                  <p className='text-sm text-muted-foreground'>
                    Produtos cadastrados
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
              <div className='col-span-4'>
                <Component />
              </div>
              <Card className='col-span-4 md:col-span-3'>
                <CardHeader>
                  <CardTitle>Algoritomo Clientes</CardTitle>
                  <CardDescription>Algoritimo String</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className='col-span-4'>
                <AreaGraph />
              </div>
              <div className='col-span-4 md:col-span-3'>
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <FloatingChat/>
    </PageContainer>
  );
}
