'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { z } from 'zod';

import { useQuery } from '@tanstack/react-query';
import { getSales } from '@/_api/sales/get-sales';

import { SaleTableSkeleton } from '../_skeleton/saleTableSkeleton';
import { Pagination } from './pagination';
import { SaleTableFilter } from './saleTableFilter';
import { SaleTableRow } from './saleTableRow';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function SaleTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') ?? '1';
  const nameFilter = searchParams.get('name') ?? '';
  const codeFilter = searchParams.get('code') ?? '';
  const categoryFilter = searchParams.get('category') ?? '';

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page);

  const { data: sales, isLoading: isLoadingSales } = useQuery({
    queryKey: ['sales', pageIndex, nameFilter, codeFilter, categoryFilter],
    queryFn: () =>
      getSales({
        pageIndex,
        nameFilter,
        codeFilter,
        categoryFilter: categoryFilter === 'all' ? null : categoryFilter,
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
      <div className="max-h-[40vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CPF</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Data Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isLoadingSales && <SaleTableSkeleton />}
            {sales &&
              sales.content?.map((sale) => {
                return <SaleTableRow key={sale.id} {...sale} />;
              })}
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
