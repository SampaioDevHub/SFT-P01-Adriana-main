import { api } from '@/_lib/axios';

import { CreateCustomerContent } from './_types/type-create-customer';

export async function createCustomer({ ...data }: CreateCustomerContent) {
  console.log(data)
  await api.post('/customers/create', {
    ...data,
  });
}
