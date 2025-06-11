export interface CreateProductBody {
  code: string;
  name: string;
  discountPercentage?: number;
  price: number;
  quantityInStock: number;
  size?: string | null;
  category: string;
  subCategory: string;
}
