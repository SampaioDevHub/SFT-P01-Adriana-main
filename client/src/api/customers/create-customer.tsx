/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

import { CreateCustomerContent } from './types/type-create-customer';

export async function createCustomer({
  name,
  cpf,
  email,
  phone,
  dataBirth,
  addressData,
  referenceEntityList
}: CreateCustomerContent) {
  await api.post('/customers/create', {
    name,
    cpf,
    email,
    phone,
    dataBirth,
    addressData,
    referenceEntityList
  });
}
