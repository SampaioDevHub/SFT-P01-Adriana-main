'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/_components/ui/card';
import { Skeleton } from '@/_components/ui/skeleton';
import { Users } from 'lucide-react';

export function ActiveCustomersCard() {
  const [activeCustomers, setActiveCustomers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch(
          'http://206.42.51.75:8081/manage_store/v1/customers/find-all'
        );
        const json = await res.json();
        setActiveCustomers(json.totalElements);
        console.warn('clientes', json.content);
      } catch (err) {
        console.error('Erro ao carregar clientes ativos', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 bg-white/80 backdrop-blur-md">
      <CardContent className="p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Clientes Ativos
          </p>
          <Users className="w-5 h-5 text-indigo-500" />
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 mt-2">
            <Skeleton className="h-8 w-1/2 rounded" />
            <Skeleton className="h-3 w-1/3 rounded" />
          </div>
        ) : (
          <>
            <p className="text-4xl font-bold text-indigo-600 mt-2 flex items-center justify-center">
              {activeCustomers}
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
