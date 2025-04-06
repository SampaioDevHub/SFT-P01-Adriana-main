import { Suspense } from 'react';
import CustomersPage from './Customers';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando clientes...</div>}>
      <CustomersPage />
    </Suspense>
  );
}
