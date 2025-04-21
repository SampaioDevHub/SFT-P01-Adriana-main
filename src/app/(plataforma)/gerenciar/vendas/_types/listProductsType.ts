
export interface ListProductType {
  id: string;
  code?: string;
  name: string;
  discountPercentage?: number | null;
  priceWithDiscount?: string
  unitPrice: number;
  totalPrice: number;
  amount: number;
}
