import { api } from '@/_lib/axios';

import { RateGetBody } from './_types/type-get-rate';

interface GetRateByIdProps {
  rateId: string;
}

export async function getRateById({ rateId }: GetRateByIdProps) {
  const response = await api.get<RateGetBody>(
    `/rates/find/${rateId}`
  );

  return response.data;
}
