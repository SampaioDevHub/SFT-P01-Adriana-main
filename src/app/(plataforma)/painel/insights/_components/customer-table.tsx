'use client';

import { useEffect, useState } from 'react';
import { CardHeader, CardContent, CardTitle } from '@/_components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { Skeleton } from '@/_components/ui/skeleton';

type Customer = {
  id: string;
  name: string;
  email: string;
  lastPurchase: string;
};

export function ClientesTable() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch(
          'http://localhost:8080/manage_store/v1/customers/recent'
        );
        if (!res.ok) throw new Error('Erro na resposta da API');
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border backdrop-blur-md w-full">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold">
          Clientes Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto p-6 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">
                Nome
              </TableHead>
              <TableHead className="min-w-[200px]">
                Email
              </TableHead>
              <TableHead className="min-w-[150px]">
                Última Compra
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : customers?.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell className="">
                      {customer.email}
                    </TableCell>
                    <TableCell className="">
                      {new Date(customer.lastPurchase).toLocaleDateString(
                        'pt-BR'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
}
