import { api } from '@/_lib/axios';

import { GetSaleContent } from './_types/type-get-sale';

interface GetSalesByIdProps {
  saleId: string;
}

export async function getSalesById({ saleId }: GetSalesByIdProps) {
  const response = await api.get<GetSaleContent>(
    `/sales/find/${saleId}`
  );

  return response.data;
}
