/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";

export interface GetProductsQuery {
  pageIndex?: number | null;
  nameFilter?: string | null;
  codeFilter?: string | null;
  categoryFilter?: string | null;
}

export interface GetProductsBody {
  id: string;
  name: string;
  price: number;
  amount: number;
  size: string;
  category: string;
  subCategory: string;
}

export async function getProducts({pageIndex, nameFilter, codeFilter, categoryFilter}: GetProductsQuery){
  const response = await api.get<GetProductsBody[]>(`/products/find-all?size=8?page=${pageIndex}?name=${nameFilter}`)

  return response.data
}