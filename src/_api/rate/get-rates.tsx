import { api } from '@/_lib/axios';

import { RateGetBody } from './_types/type-get-rate';

export interface GetRatesQuery {
  pageSize?: number | null;
}

export async function getRates() {
  const response = await api.get<RateGetBody[]>(`/rates/find-all`);

  return response.data;
}
