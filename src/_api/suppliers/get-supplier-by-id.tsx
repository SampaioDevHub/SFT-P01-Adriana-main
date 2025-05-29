import { api } from '@/_lib/axios';

import { GetSupplierContent } from './_types/type-get-supplier';

interface GetSupplierByIdProps {
  supplierId: string;
}

export async function getSupplierById({ supplierId }: GetSupplierByIdProps) {
  const response = await api.get<GetSupplierContent>(
    `/suppliers/find/${supplierId}`
  );

  return response.data;
}
