export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
  sizes: string[]; // Array de tamanhos disponíveis
}

