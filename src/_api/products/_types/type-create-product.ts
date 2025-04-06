export interface CreateProductBody {
  code?: string;
  name: string;
  discountPercentage?: number | null;
  price: string;
  quantityInStock: number;
  size?: string;
  category: string;
  subCategory: string;
}
