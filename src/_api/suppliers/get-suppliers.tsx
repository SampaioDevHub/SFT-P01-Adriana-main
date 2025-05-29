import { api } from '@/_lib/axios';
import { GetSuppliersBody } from './_types/type-get-supplier';

export interface GetSuppliersQuery {
  pageIndex?: number | null;
  cpfFilter?: string | null;
  cnpjFilter?: string | null;
  priceFilter?: string | null;
  pageSize?: number | null;
}

export async function getSuppliers({
  pageIndex,
  cpfFilter,
  cnpjFilter,
  priceFilter,
  pageSize,
}: GetSuppliersQuery) {
  const response = await api.get<GetSuppliersBody>(
    `/supliers/find-all?size=${pageSize ?? '10'}&page=${pageIndex ?? ''}&customerCpf=${cpfFilter ?? ''}&cnpj=${cnpjFilter ?? ''}&totalPrice=${priceFilter ?? ''}`
  );

  return response.data;
}
