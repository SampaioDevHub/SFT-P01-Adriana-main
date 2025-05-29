import { api } from '@/_lib/axios';
import { GetCustomerContent } from './_types/type-get-custumer';

interface GetCustomerByIdProps {
  customerId: string;
}

export async function getCustomerById({ customerId }: GetCustomerByIdProps) {
  const response = await api.get<GetCustomerContent>(
    `/customers/find/${customerId}`
  );

  return response.data;
}
