/* eslint-disable import/no-unresolved */
import { api } from '@/_lib/axios';

export interface GetCustomersByCategories {
  category: string;
  subCategories: string[];
}

export async function getCustomersByCategories() {
  const response = await api.get<GetCustomersByCategories[]>(
    '/customers/categories'
  );

  return response.data;
}
