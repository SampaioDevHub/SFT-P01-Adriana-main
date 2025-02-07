/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";
import { GetProductsBody } from "./get-products";

interface GetProductsByIdProps {
    productId: string
}

export async function getProductsById({productId}: GetProductsByIdProps) {
    const response = await api.get<GetProductsBody>(`/products/find/${productId}`);

    return response.data
}