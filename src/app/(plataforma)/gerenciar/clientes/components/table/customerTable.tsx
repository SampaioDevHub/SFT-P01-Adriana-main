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
import { getCustomers } from '@/_api/customers/get-customers';

import { CustomerTableSkeleton } from '../skeleton/customerTableSkeleton';
import { CustomerTableFilter } from './customerTableFilter';
import { CustomerTableRow } from './customerTableRow';
import { Pagination } from './pagination';

export function CustomerTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') ?? '1';
  const nameFilter = searchParams.get('name') ?? '';
  const cpfFilter = searchParams.get('cpf') ?? '';
  const phoneFilter = searchParams.get('phone') ?? '';

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page);

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ['customers', pageIndex, nameFilter, cpfFilter, phoneFilter],
    queryFn: () =>
      getCustomers({
        pageIndex,
        nameFilter,
        cpfFilter,
        phoneFilter: phoneFilter === 'all' ? null : phoneFilter,
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
        <CustomerTableFilter />
      </div>
      <div className="max-h-[60vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cep</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isLoadingCustomers && <CustomerTableSkeleton />}
            {customers
              ? customers.content?.map((customer) => {
                  return <CustomerTableRow key={customer.id} {...customer} />;
                })
              : !isLoadingCustomers && (
                  <TableRow className="w-full">
                    <TableCell colSpan={5} className="text-center w-full p-4">
                      <span>Nenhum cliente encontrado</span>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={pageIndex ?? 0}
        totalCount={customers?.totalElements ?? 0}
        perPage={customers?.pageable.pageSize ?? 0}
      />
    </div>
  );
}
