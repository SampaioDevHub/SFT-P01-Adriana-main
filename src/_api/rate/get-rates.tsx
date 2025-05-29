import { api } from '@/_lib/axios';
import { GetRatesBody } from './_types/type-get-rate';

export interface GetRatesQuery {
  pageSize?: number | null;
}

export async function getRates({
  pageSize,
}: GetRatesQuery) {
  const response = await api.get<GetRatesBody>(
    `/rates/find-all?size=${pageSize ?? '10'}`
  );

  return response.data;
}
