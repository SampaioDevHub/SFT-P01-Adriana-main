import { api } from '@/_lib/axios';

import { CreateRateBody } from './_types/type-rate';

export async function createRate({
  TaxAmount,
  TaxName,
  numberInstallments,
}: CreateRateBody) {
  await api.post('/rates/create', {
    TaxAmount,
    TaxName,
    numberInstallments,
  });
}
