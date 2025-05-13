import { api } from '@/_lib/axios';

import { CreateSaleBody } from './_types/type-create-sale';

export async function createSale({
  discountPercentage,
  status,
  totalItems,
  customerCpf,
  paymentMethod,
  products,
  subtotal,
  totalPrice,
  numberInstallments,
}: CreateSaleBody) {
  await api.post('/sales/create', {
    discountPercentage,
    status,
    totalItems,
    customerCpf,
    products,
    paymentMethod,
    subtotal,
    totalPrice,
    numberInstallments,
  });
}
