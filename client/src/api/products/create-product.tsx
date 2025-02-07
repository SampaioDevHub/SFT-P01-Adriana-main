/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";

export interface CreateProductBody {
    name: string;
    price: number;
    amount: number;
    size: string;
    category: string;
    subcategory: string;
}

export async function createProduct({
    name,
    price,
    amount,
    size,
    category,
    subcategory,
}: CreateProductBody) {
    await api.post('/products/create', {
        name,
        price,
        amount,
        size,
        category,
        subcategory,
    })
}