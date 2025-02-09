/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';
import { GetCustomerContent } from './types/type-get-custumer';

interface GetCustomersByIdProps {
  customerId: string;
}

export async function getCustomerById({ customerId }: GetCustomersByIdProps) {
  const response = await api.get<GetCustomerContent>(
    `/customers/find/${customerId}`
  );

  return response.data;
}
