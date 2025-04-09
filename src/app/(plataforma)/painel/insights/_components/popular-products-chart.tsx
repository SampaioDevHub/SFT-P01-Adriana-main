'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Skeleton } from '@/_components/ui/skeleton';

type ProductData = {
  name: string;
  sales: number;
};

export function GraficoBarra() {
  const [data, setData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPopularProducts() {
      try {
        const res = await fetch(
          'http://localhost:8080/manage_store/v1/products'
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Erro ao carregar produtos populares', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularProducts();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border backdrop-blur-md p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Produtos Mais Vendidos
      </h3>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-1/3 rounded" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px', 
                fontSize: '0.875rem',
              }}
            />
            <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
