'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { z } from 'zod';

import { useQuery } from '@tanstack/react-query';
import { getSales } from '@/_api/sales/get-sales';

import { SaleTableSkeleton } from '../skeleton/saleTableSkeleton';
import { Pagination } from './pagination';
import { SaleTableFilter } from './saleTableFilter';
import { SaleTableRow } from './saleTableRow';

export function SaleTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') ?? '1';
  const cpfFilter = searchParams.get('cpf') ?? '';
  const statusFilter = searchParams.get('status') ?? '';
  const priceFilter = searchParams.get('price') ?? '';

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page);

  const { data: sales, isLoading: isLoadingSales } = useQuery({
    queryKey: ['sales', pageIndex, cpfFilter, statusFilter, priceFilter],
    queryFn: () =>
      getSales({
        pageIndex,
        cpfFilter,
        statusFilter,
        priceFilter,
      }),
    staleTime: Infinity,
  });

  function handlePaginate(pageIndex: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', (pageIndex + 1).toString());

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
        <SaleTableFilter />
      </div>
      <div className="max-h-[60vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CPF</TableHead>
              <TableHead>Produtos(Qtd)</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isLoadingSales ? (
              <SaleTableSkeleton />
            ) : sales && sales.content.length > 0 ? (
              sales.content.map((sale) => (
                <SaleTableRow key={sale.id} {...sale} />
              ))
            ) : (
              <TableRow className="w-full">
                <TableCell colSpan={5} className="text-center w-full p-4">
                  <span>Nenhuma venda encontrada</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={pageIndex ?? 0}
        totalCount={sales?.totalElements ?? 0}
        perPage={sales?.pageable.pageSize ?? 0}
      />
    </div>
  );
}
