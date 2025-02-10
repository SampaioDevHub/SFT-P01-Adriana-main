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
import { getProducts } from '@/api/products/get-products';

import { ProductTableSkeleton } from './_skeleton/productTableSkeleton';
import { Pagination } from './pagination';
import { ProductTableFilter } from './productTableFilter';
import { ProductTableRow } from './productTableRow';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function ProductTable() {
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

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', pageIndex, nameFilter, codeFilter, categoryFilter],
    queryFn: () =>
      getProducts({
        pageIndex,
        nameFilter,
        codeFilter,
        categoryFilter: categoryFilter === 'all' ? null : categoryFilter
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
        <ProductTableFilter />
      </div>
      <div className='max-h-[40vh] overflow-auto rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Subcategoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Tamanhos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='w-full'>
            {isLoadingProducts && <ProductTableSkeleton />}
            {products &&
              products.content?.map((product) => {
                return <ProductTableRow key={product.id} {...product} />;
              })}
          </TableBody>
        </Table>
      </div>
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={pageIndex ?? 0}
        totalCount={products?.totalElements ?? 8}
        perPage={products?.pageable.pageSize ?? 8}
      />
    </div>
  );
}
