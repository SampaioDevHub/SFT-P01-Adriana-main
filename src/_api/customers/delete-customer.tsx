import { api } from '@/_lib/axios';

interface GetCustomerByIdProps {
  customerId: string;
}

export async function DeleteCustomer({ customerId }: GetCustomerByIdProps) {
  await api.delete(`/customers/delete/${customerId}`);
}
