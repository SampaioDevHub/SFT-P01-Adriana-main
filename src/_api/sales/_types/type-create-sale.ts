export interface CreateSaleBody {
  customerCpf: string;
  discountPercentage?: number;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  products: {
    code: string;
    name: string;
    unitPrice: number;
    totalPrice: number;
    priceWithDiscount?: number, 
    amount: number;
  }[];
  status: 'FINALIZADO' | 'PENDENTE';
  paymentMethod: string;
  numberInstallments?: number;
  rateName?: string;
  rateAmount?: number;
  startDate?: Date;
  endDate?: Date;
}
