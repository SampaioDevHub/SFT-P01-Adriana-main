'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { z } from 'zod';

import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/api/customers/get-customers';

import { CustomerTableSkeleton } from './_skeleton/customerTableSkeleton';
import { Pagination } from './pagination';
import { CustomerTableFilter } from './customerTableFilter';
import { CustomerTableRow } from './customerTableRow';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function CustomerTable() {
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
        phoneFilter: phoneFilter === 'all' ? null : phoneFilter
      }),
    staleTime: Infinity
  });

  function handlePaginate(pageIndex: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', (pageIndex + 1).toString());

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <div className='space-y-4'>
      <div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
        <CustomerTableFilter />
      </div>
      <div className='max-h-[60vh] overflow-auto rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='w-full'>
            {isLoadingCustomers && <CustomerTableSkeleton />}
            {customers &&
              customers.content?.map((customer) => {
                return <CustomerTableRow key={customer.id} {...customer} />;
              })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={pageIndex ?? 0}
        totalCount={customers?.totalElements ?? 8}
        perPage={customers?.pageable.pageSize ?? 8}
      />
    </div>
  );
}
