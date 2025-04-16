export interface CreateSaleBody {
  customerCpf: string;
  discountPercentage?: number | null;
  totalItems: number;
  priceWithDiscount?: number;
  totalPrice: number;
  productResponses:
    {
      code?: string;
      name: string;
      unitPrice: number;
      totalPrice: number;
      amount: number;
    }[];
  status: "FINALIZADO" | "PENDENTE";
  paymentMethod?: string
}