'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Skeleton } from '@/_components/ui/skeleton';

type RevenueData = {
  month: string;
  revenue: number;
};

export function GraficoArea() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const res = await fetch(
          'http://206.42.51.75:8081/manage_store/v1/products/find-all'
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Erro ao carregar dados de receita', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRevenue();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border backdrop-blur-md p-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Receita Mensal
      </h3>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-1/3 rounded" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
