import { Suspense } from 'react';
import RegisterProduct from './products';

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando clientes...</div>}>
      <RegisterProduct />
    </Suspense>
  );
}
