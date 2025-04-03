import { api } from '@/_lib/axios';

import { GetCustomerContent } from './_types/type-get-custumer';

export async function updatedCustomer({ id, ...data }: GetCustomerContent) {
  await api.put(`/customers/update/${id}`, {
    ...data,
  });
}
