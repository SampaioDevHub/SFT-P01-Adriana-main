import { api } from '@/_lib/axios';

interface GetSalesByIdProps {
  saleId: string;
}

export async function DeleteSale({ saleId }: GetSalesByIdProps) {
  await api.delete(`/sales/delete/${saleId}`);
}
