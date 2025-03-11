import { api } from '@/_lib/axios';
import { GetSalesBody } from './_types/type-get-sale';

export interface GetSalesQuery {
  pageIndex?: number | null;
  nameFilter?: string | null;
  codeFilter?: string | null;
  categoryFilter?: string | null;
}

export async function getSales({
  pageIndex,
  nameFilter,
  codeFilter,
  categoryFilter,
}: GetSalesQuery) {
  const response = await api.get<GetSalesBody>(
    `/sales/find-all?size=10&page=${pageIndex ?? ''}&name=${nameFilter ?? ''}&code=${codeFilter ?? ''}&category=${categoryFilter ?? ''}`
  );

  return response.data;
}
