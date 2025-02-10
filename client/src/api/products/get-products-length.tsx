/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

export interface GetProductsLengthBody {
  id: string;
  name: string;
  price: number;
  amount: number;
  size: string;
  category: string;
  subCategory: string;
}

export async function getProductsLength() {
  const response = await api.get<GetProductsLengthBody[]>(
    `/products/find-all?size=100`
  );

  return response.data;
}
