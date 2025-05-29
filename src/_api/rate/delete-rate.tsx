import { api } from '@/_lib/axios';

interface GetRateByIdProps {
  rateId: string;
}

export async function DeleteRate({ rateId }: GetRateByIdProps) {
  await api.delete(`/rates/delete/${rateId}`);
}
