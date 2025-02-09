/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

import { GetCustomerContent } from './types/type-get-custumer';

export async function updatedCustomer({ id, ...data }: GetCustomerContent) {
  await api.put(`/customers/update/${id}`, {
      ...data
  });
}
