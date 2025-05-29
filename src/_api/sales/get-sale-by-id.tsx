import { api } from '@/_lib/axios';

import { GetSaleContent } from './_types/type-get-sale';

interface GetSaleByIdProps {
  saleId: string;
}

export async function getSaleById({ saleId }: GetSaleByIdProps) {
  const response = await api.get<GetSaleContent>(
    `/sales/find/${saleId}`
  );

  return response.data;
}
