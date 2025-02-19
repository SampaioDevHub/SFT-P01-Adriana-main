'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { DollarSign, Package, TrendingUp } from 'lucide-react';
import type React from 'react'; // Import React

import {
  GetProductContent,
  GetProductsBody,
} from '@/_api/products/_types/type-get-product';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/_api/products/get-products';

import type { Product } from '../types/product';
import { ProductsTable } from './products-table';

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function ProductReport() {
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({}),
    staleTime: Infinity,
  });

  if (!products) {
    return;
  }

  const totalproducts = products?.content.length;
  const totalStock = products.content[0].amount;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Produtos"
          value={totalproducts.toString()}
          icon={Package}
          description="Produtos cadastrados"
        />
        <StatCard
          title="Estoque Total"
          value={totalStock.toString()}
          icon={Package}
          description="Unidades em estoque"
        />
        <StatCard
          title="Total de Vendas"
          value="1000"
          icon={TrendingUp}
          description="Unidades vendidas"
        />
        <StatCard
          title="Receita Total"
          value={'R$ 1000,00'}
          icon={DollarSign}
          description="Receita gerada"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable data={products.content} />
        </CardContent>
      </Card>
    </div>
  );
}
