import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CreateSaleBody } from '@/_api/sales/_types/type-create-sale';
import { createSale } from '@/_api/sales/create-sale';

export interface SaleProduct {
  code?: string;
  name: string;
  unitPrice: number;
  priceWithDiscount?: string;
  totalPrice: number;
  amount: number;
}

export interface SaleInformationData {
  customerCpf: string;
  startDate?: Date;
  endDate?: Date;
  discountPercentage?: number | null;
  totalPrice: number;
  paymentMethod: string;
}

export interface SaleProductData {
  products: SaleProduct[];
  totalItems: number;
  subtotal: number;
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
  resetSaleData: () => void;
}

export const SaleContext = createContext({} as SaleContextType);

export function SaleProvider({ children }: { children: ReactNode }) {
  const [informationData, setInformationData] = useState<SaleInformationData>({
    customerCpf: '',
    discountPercentage: 0,
    totalPrice: 0,
    paymentMethod: '',
  });

  const [productData, setProductData] = useState<SaleProductData>({
    products: [],
    totalItems: 0,
    subtotal: 0,
  });

  const [activeTab, setActiveTab] = useState('product');

  const queryClient = useQueryClient();

  const { mutateAsync: sendSale, isPending } = useMutation({
    mutationFn: createSale,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Venda cadastrada com sucesso!');
    },
    onError: () => toast.error('Erro ao cadastrar venda.'),
  });

  const handlecreateSale = async () => {
    const discount = informationData.discountPercentage ?? 0;
    const discountAmount = (productData.subtotal * discount) / 100;
    const totalPrice = productData.subtotal - discountAmount;

    const payload: CreateSaleBody = {
      ...informationData,
      ...productData,
      status: 'PENDENTE',
      totalPrice,
    };

    console.log(payload);

    return sendSale(payload);
  };

  const resetSaleData = () => {
    setInformationData({
      customerCpf: '',
      discountPercentage: 0,
      totalPrice: 0,
      paymentMethod: '',
    });

    setProductData({
      products: [],
      totalItems: 0,
      subtotal: 0,
    });
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
        setActiveTab,
        resetSaleData,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}

export const useSale = () => useContext(SaleContext);
