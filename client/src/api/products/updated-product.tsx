/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";
import { GetProductContent } from "./types/type-get-product";

export async function updatedProduct({
    id,
    code,
    name,
    discountPercentage,
    price,
    amount,
    size,
    category,
    subCategory,
}: GetProductContent) {
    await api.put(`/products/update/${id}`, {
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