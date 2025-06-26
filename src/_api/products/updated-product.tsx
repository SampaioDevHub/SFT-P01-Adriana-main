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
}: GetProductContent) {
  await api.put(`/products/update/${id}`, {
    code,
    name,
    discountPercentage,
    price,
    quantityInStock,
    size,
    category,
    subCategory: "1"
  }).catch((error) => console.log(error));
}
