import { api } from '@/_lib/axios';

import { GetProductContent } from './_types/type-get-product';

interface GetProductByIdProps {
  productId: string;
}

export async function getProductsById({ productId }: GetProductByIdProps) {
  const response = await api.get<GetProductContent>(
    `/products/find/${productId}`
  );

  return response.data;
}
