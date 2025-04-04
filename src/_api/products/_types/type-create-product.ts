export interface CreateProductBody {
  code?: string;
  name: string;
  discountPercentage?: number | null;
  price: string;
  amount: number;
  size?: string;
  category: string;
  subCategory: string;
}
