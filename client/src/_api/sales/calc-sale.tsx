import { api } from '@/_lib/axios';

import { CalcSaleBody } from './_types/type-calc-sale';

export async function calcSale({
  discountPercentage,
  productResponses,
}: CalcSaleBody) {
  await api.post('/sales/calc-sales', {
    discountPercentage,
    productResponses,
  });
}
