/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

import { CreateCustomerContent } from './types/type-create-customer';

export async function createCustomer({ ...data }: CreateCustomerContent) {
  await api.post('/customers/create', {
    ...data
  });
}
