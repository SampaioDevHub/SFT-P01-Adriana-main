
export interface ListProductType {
  id: string;
  code: string;
  name: string;
  discountPercentage?: number;
  priceWithDiscount?: number;
  unitPrice: number;
  totalPrice: number;
  amount: number;
}
