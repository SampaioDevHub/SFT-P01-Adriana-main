import { api } from '@/_lib/axios';
import { GetProductsBody } from './_types/type-get-product';

export interface GetProductsQuery {
  pageIndex?: number | null;
  nameFilter?: string | null;
  quantityInStockFilter?: string | null;
  categoryFilter?: string | null;
  pageSize?: number | null;
}

export async function getProducts({
  pageIndex,
  nameFilter,
  quantityInStockFilter,
  categoryFilter,
  pageSize
}: GetProductsQuery) {
  const response = await api.get<GetProductsBody>(
    `/products/find-all?size=${pageSize ?? '10'}&page=${pageIndex ?? ''}&name=${nameFilter ?? ''}&quantityInStock=${quantityInStockFilter ?? ''}&category=${categoryFilter ?? ''}`
  );

  return response.data;
}
