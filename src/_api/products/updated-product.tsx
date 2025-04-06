/* eslint-disable no-console */

import { api } from '@/_lib/axios';
import { GetProductContent } from './_types/type-get-product';

export async function updatedProduct({
  id,
  code,
  name,
  discountPercentage,
  price,
  quantityInStock,
  size,
  category,
  subCategory,
}: GetProductContent) {
  await api.put(`/products/update/${id}`, {
    code,
    name,
    discountPercentage,
    price,
    quantityInStock,
    size,
    category,
    subCategory,
  });
}
