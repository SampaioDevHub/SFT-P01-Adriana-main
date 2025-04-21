import { api } from '@/_lib/axios';
import { GetCustomersBody } from './_types/type-get-custumer';

export interface GetCustomersQuery {
  pageIndex?: number | null;
  nameFilter?: string | null;
  cpfFilter?: string | null;
  phoneFilter?: string | null;
  pageSize?: number | null;
}

export async function getCustomers({
  pageIndex,
  nameFilter,
  cpfFilter,
  phoneFilter,
  pageSize
}: GetCustomersQuery) {
  const response = await api.get<GetCustomersBody>(
    `/customers/find-all?size=${pageSize ?? '10'}&page=${pageIndex ?? ''}&name=${nameFilter ?? ''}&cpf=${cpfFilter ?? ''}&phone=${phoneFilter ?? ''}`
  );

  return response.data;
}
