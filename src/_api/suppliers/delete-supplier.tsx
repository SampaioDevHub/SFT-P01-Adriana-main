import { api } from '@/_lib/axios';

interface GetSupplierByIdProps {
  supplierId: string;
}

export async function DeleteSupplier({ supplierId }: GetSupplierByIdProps) {
  await api.delete(`/suppliers/delete/${supplierId}`);
}
