import { api } from '@/_lib/axios';
import { GetSalesBody } from './_types/type-get-sale';

export interface GetSalesQuery {
  pageIndex?: number | null;
  cpfFilter?: string | null;
  statusFilter?: string | null;
  priceFilter?: string | null;
  pageSize?: number | null;
}

export async function getSales({
  pageIndex,
  cpfFilter,
  statusFilter,
  priceFilter,
  pageSize,
}: GetSalesQuery) {
  const response = await api.get<GetSalesBody>(
    `/sales/find-all?size=${pageSize ?? '10'}&page=${pageIndex ?? ''}&customerCpf=${cpfFilter ?? ''}&status=${statusFilter ?? ''}&totalPrice=${priceFilter ?? ''}`
  );

  return response.data;
}
