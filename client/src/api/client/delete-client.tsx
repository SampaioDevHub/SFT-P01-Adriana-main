/* eslint-disable import/no-unresolved */
import { api } from "@/lib/axios";

interface GetCustomerByIdProps {
    customerId: string
}

export async function DeleteProduct({ customerId }: GetCustomerByIdProps) {
    await api.delete(`/customer/delete/${customerId}`);
}