import { api } from '@/_lib/axios';

import { GetRateContent } from './_types/type-get-rate';

interface GetRateByIdProps {
  rateId: string;
}

export async function getRateById({ rateId }: GetRateByIdProps) {
  const response = await api.get<GetRateContent>(
    `/rates/find/${rateId}`
  );

  return response.data;
}
