import { api } from '@/_lib/axios';

import { RateBody } from './_types/type-rate';

export async function createRate({
  rateAmount,
  rateName,
  numberInstallments,
}: RateBody) {
  await api.post('/rates/create', {
    rateAmount,
    rateName,
    numberInstallments,
  });
}
