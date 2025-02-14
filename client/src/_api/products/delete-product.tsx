/* eslint-disable import/no-unresolved */
import { api } from '@/_lib/axios';

interface GetProductsByIdProps {
  productId: string;
}

export async function DeleteProduct({ productId }: GetProductsByIdProps) {
  await api.delete(`/products/delete/${productId}`);
}
