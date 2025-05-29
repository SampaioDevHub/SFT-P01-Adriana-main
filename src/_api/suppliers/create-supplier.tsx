import { api } from '@/_lib/axios';

import { CreateSupplierBody } from './_types/type-supplier';

export async function createSupplier({
  name,
  cnpj,
  phone,
  email,
  productCost,
  addressData,
}: CreateSupplierBody) {
  await api.post('/suppliers/create', {
    name,
    cnpj,
    phone,
    email,
    productCost,
    addressData,
  });
}
