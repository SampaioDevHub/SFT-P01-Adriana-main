
export interface ListProductType {
  code?: string;
  name: string;
  discountPercentage?: number | null;
  priceWithDiscount?: string
  unitPrice: number;
  totalPrice: number;
  amount: number;
}
