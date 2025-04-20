export interface CreateSaleBody {
  customerCpf: string;
  discountPercentage?: number | null;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  products:
    {
      code?: string;
      name: string;
      unitPrice: number;
      totalPrice: number;
      amount: number;
    }[];
  status: "FINALIZADO" | "PENDENTE";
  paymentMethod: string
}