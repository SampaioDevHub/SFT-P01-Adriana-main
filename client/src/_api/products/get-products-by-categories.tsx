/* eslint-disable import/no-unresolved */
import { api } from '@/_lib/axios';

export interface GetProductsByCategories {
  category: string;
  subCategories: string[];
}

export async function getProductsByCategories() {
  const response = await api.get<GetProductsByCategories[]>(
    '/products/categories'
  );

  return response.data;
}
