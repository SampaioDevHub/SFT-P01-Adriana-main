/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";
import { CreateProductBody } from "./types/type-create-product";

export async function createProduct({
    code,
    name,
    discountPercentage,
    price,
    amount,
    size,
    category,
    subCategory,
}: CreateProductBody) {
    await api.post('/products/create', {
        code,
        name,
        discountPercentage,
        price,
        amount,
        size,
        category,
        subCategory,
    })
}