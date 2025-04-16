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
import { getProducts } from '@/_api/products/get-products';

import { ProductTableSkeleton } from '../skeleton/productTableSkeleton';
import { Pagination } from './pagination';
import { ProductTableFilter } from './productTableFilter';
import { ProductTableRow } from './productTableRow';

export function ProductTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = searchParams.get('page') ?? '1';
  const nameFilter = searchParams.get('name') ?? '';
  const quantityInStockFilter = searchParams.get('quantity') ?? '';
  const categoryFilter = searchParams.get('category') ?? '';

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(page);

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', pageIndex, nameFilter, quantityInStockFilter, categoryFilter],
    queryFn: () =>
      getProducts({
        pageIndex,
        nameFilter,
        quantityInStockFilter,
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
        <ProductTableFilter />
      </div>
      <div className="max-h-[40vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>SubCategoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Tamanhos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isLoadingProducts && <ProductTableSkeleton />}
            {products
              ? products.content?.map((product) => {
                  return <ProductTableRow key={product.id} {...product} />;
                })
              : !isLoadingProducts && (
                  <TableRow className="w-full">
                    <TableCell colSpan={5} className="text-center w-full p-4">
                      <span>Nenhum produto encontrado</span>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        onPageChange={handlePaginate}
        pageIndex={pageIndex ?? 0}
        totalCount={products?.totalElements ?? 0}
        perPage={products?.pageable.pageSize ?? 0}
      />
    </div>
  );
}
