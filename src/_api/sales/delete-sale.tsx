import { api } from '@/_lib/axios';

interface GetSaleByIdProps {
  saleId: string;
}

export async function DeleteSale({ saleId }: GetSaleByIdProps) {
  await api.delete(`/sales/delete/${saleId}`);
}
