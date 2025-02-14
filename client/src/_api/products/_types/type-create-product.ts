export interface CreateProductBody {
  code?: string;
  name: string;
  discountPercentage?: number;
  price: string;
  amount: number;
  size?: string;
  category: string;
  subCategory: string;
}