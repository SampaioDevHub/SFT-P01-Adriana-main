/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';
import { GetCustomersBody } from './types/type-get-custumer';

export interface GetCustomersQuery {
  pageIndex?: number | null;
  nameFilter?: string | null;
  cpfFilter?: string | null;
  phoneFilter?: string | null;
}

export async function getCustomers({
  pageIndex,
  nameFilter,
  cpfFilter,
  phoneFilter
}: GetCustomersQuery) {
  const response = await api.get<GetCustomersBody>(
    `/customers/find-all?size=10&page=${pageIndex}&name=${nameFilter}&cpf=${cpfFilter}&phone=${phoneFilter}`
  );

  return response.data;
}
