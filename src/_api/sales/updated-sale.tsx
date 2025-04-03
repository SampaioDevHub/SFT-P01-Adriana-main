/* eslint-disable no-console */

import { api } from '@/_lib/axios';

import { GetSaleContent } from './_types/type-get-sale';

export async function updatedSale({
  id,
  startDate,
  endDate,
  status,
  totalItems,
  customer,
  productResponses,
  valueTotalDiscount,
  totalDiscount,
  totalPayable,
}: GetSaleContent) {
  await api.put(`/sales/update/${id}`, {
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
