import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';
import { CreateSaleBody } from '@/_api/sales/_types/type-create-sale';
import { createSale } from '@/_api/sales/create-sale';

export interface SaleProduct {
  code?: string;
  name: string;
  unitPrice: number;
  totalPrice: number;
  amount: number;
}

export interface SaleInformationData {
  customerCpf: string;
  startDate?: Date;
  endDate?: Date;
  discountPercentage?: number | null;
  priceWithDiscount?: number;
  paymentMethod?: string;
}

export interface SaleProductData {
  productResponses: SaleProduct[];
  totalItems: number;
  totalPrice: number;
}

interface SaleContextType {
  informationData: SaleInformationData;
  productData: SaleProductData;
  setInformationData: (data: SaleInformationData) => void;
  setProductData: (data: SaleProductData) => void;
  handlecreateSale: () => Promise<void>;
  isCreatingSale: boolean;
  activeTab: string;
  setActiveTab: (index: string) => void;
}

export const SaleContext = createContext({} as SaleContextType);

export function SaleProvider({ children }: { children: ReactNode }) {
  const [informationData, setInformationData] = useState<SaleInformationData>({
    customerCpf: '',
    discountPercentage: 0,
    priceWithDiscount: 0,
  });

  const [productData, setProductData] = useState<SaleProductData>({
    productResponses: [],
    totalItems: 0,
    totalPrice: 0,
  });

  console.log(productData)

  const [activeTab, setActiveTab] = useState('product'); // 👈 estado da tab ativa

  const { mutateAsync: sendSale, isPending } = useMutation({
    mutationFn: createSale,
    onSuccess: () => toast.success('Venda cadastrada com sucesso!'),
    onError: () => toast.error('Erro ao cadastrar venda.'),
  });

   const handlecreateSale = async () => {
    const discount = informationData.discountPercentage ?? 0;
    const discountAmount = (productData.totalPrice * discount) / 100;
    const priceWithDiscount = productData.totalPrice - discountAmount;

    console.log("shdjshdjshdjsd")

    const payload: CreateSaleBody = {
      ...informationData,
      ...productData,
      status: 'PENDENTE',
      priceWithDiscount,
    };

    return sendSale(payload);
  };

  return (
    <SaleContext.Provider
      value={{
        informationData,
        productData,
        setInformationData,
        setProductData,
        handlecreateSale,
        isCreatingSale: isPending,
        activeTab,
        setActiveTab, // 👈 função de troca de tab disponível no contexto
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}

export const useSale = () => useContext(SaleContext);
