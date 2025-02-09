/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";

export interface UpdatedProductBody {
    id: string
    name: string;
    price: number;
    amount: number;
    size: string;
    category: string;
    subCategory: string;
}

export async function updatedProduct({
    id,
    name,
    price,
    amount,
    size,
    category,
    subCategory,
}: UpdatedProductBody) {
    console.log(subCategory, price)
    await api.put(`/products/update/${id}`, {
        name,
        price,
        amount,
        size,
        category,
        subCategory,
    })
}