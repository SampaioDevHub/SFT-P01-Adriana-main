import { api } from '@/_lib/axios';

interface GetProductByIdProps {
  productId: string;
}

export async function DeleteProduct({ productId }: GetProductByIdProps) {
  await api.delete(`/products/delete/${productId}`);
}
