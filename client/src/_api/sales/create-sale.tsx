import { api } from '@/_lib/axios';

import { CreateSaleBody } from './_types/type-create-sale';

export async function createSale({
  startDate,
  endDate,
  status,
  totalItems,
  customer,
  productResponses,
  valueTotalDiscount,
  totalDiscount,
  totalPayable,
}: CreateSaleBody) {
  await api.post('/sales/create', {
    startDate,
    endDate,
    status,
    totalItems,
    customer,
    productResponses,
    valueTotalDiscount,
    totalDiscount,
    totalPayable,
  });
}
