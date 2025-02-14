/* eslint-disable import/no-unresolved */
import { api } from '@/_lib/axios';

import { CreateCustomerContent } from './_types/type-create-customer';

export async function createCustomer({ ...data }: CreateCustomerContent) {
  await api.post('/customers/create', {
    ...data,
  });
}
