'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/_components/ui/card';
import { Skeleton } from '@/_components/ui/skeleton';
import { TrendingUp } from 'lucide-react';

export function MonthRevenueCard() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/manage_store/v1/revenue/monthly-total`
          
        );
        const json = await res.json();
        setRevenue(json.total);
      } catch (err) {
        console.error('Erro ao carregar receita mensal', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRevenue();
  }, []);

  return (
    <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 bg-white/80  backdrop-blur-md">
      <CardContent className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Receita do Mês
          </p>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-8 w-1/2 rounded" />
            <Skeleton className="h-3 w-1/3 rounded" />
          </div>
        ) : (
          <>
            <p className="text-3xl font-bold text-green-600 mt-2">
              R${' '}
              {revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-muted-foreground">
              Comparado ao mês anterior
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
