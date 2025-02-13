/* eslint-disable import/no-unresolved */
import { api } from '@/lib/axios';

import { GetProductContent } from './types/type-get-product';

interface GetProductsByIdProps {
  productId: string;
}

export async function getProductsById({ productId }: GetProductsByIdProps) {
  const response = await api.get<GetProductContent>(
    `/products/find/${productId}`
  );

  return response.data;
}
