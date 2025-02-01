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
    subcategory: string;
}

export async function updatedProduct({
    id,
    name,
    price,
    amount,
    size,
    category,
    subcategory,
}: UpdatedProductBody) {
    console.log(subcategory, price)
    await api.put(`/products/update/${id}`, {
        name,
        price,
        amount,
        size,
        category,
        subcategory,
    })
}