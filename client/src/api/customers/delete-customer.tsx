/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

interface GetCustomersByIdProps {
  customerId: string;
}

export async function DeleteCustomer({ customerId }: GetCustomersByIdProps) {
  await api.delete(`/customers/delete/${customerId}`);
}
