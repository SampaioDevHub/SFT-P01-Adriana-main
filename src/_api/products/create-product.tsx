import { api } from '@/_lib/axios';
import { CreateProductBody } from './_types/type-create-product';

export async function createProduct({
  code,
  name,
  discountPercentage,
  price,
  quantityInStock,
  size,
  category,
  subCategory,
}: CreateProductBody) {
  await api.post('/products/create', {
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
