import { createContext, ReactNode, useState } from 'react';

import { FormSchema } from '@/app/(plataforma)/gerenciar/vendas/_types/saleYupType';

interface SaleContextProps {
  sale: FormSchema;
}

export const SaleContext = createContext<SaleContextProps>({
  sale: {
    customer: '',
    productResponses: [],
  },
});

export function SaleProvider({ children }: { children: ReactNode }) {
    const [sale, setSale] = useState<FormSchema>()
  return (
    <SaleContext.Provider
      value={{
        sale: {
          customer: '',
          productResponses: [],
        },
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}
