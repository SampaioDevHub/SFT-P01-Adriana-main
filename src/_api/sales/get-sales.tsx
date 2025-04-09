import { api } from '@/_lib/axios';
import { GetSalesBody } from './_types/type-get-sale';

export interface GetSalesQuery {
  pageIndex?: number | null;
  cpfFilter?: string | null;
  statusFilter?: string | null;
  priceFilter?: string | null;
}

export async function getSales({
  pageIndex,
  cpfFilter,
  statusFilter,
  priceFilter,
}: GetSalesQuery) {
  console.log(statusFilter)
  const response = await api.get<GetSalesBody>(
    `/sales/find-all?size=10&page=${pageIndex ?? ''}&customerCpf=${cpfFilter ?? ''}&status=${statusFilter ?? ''}&totalPrice=${priceFilter ?? ''}`
  );

  return response.data;
}
