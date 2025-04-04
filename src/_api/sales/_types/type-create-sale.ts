export interface CreateSaleBody {
  startDate?: string;
  endDate?: string;
  status: string;
  totalItems: number;
  customer: string;
  productResponses: [
    {
      id: number;
      code?: string;
      name: string;
      priceWithDiscount?: number;
      discountPercentage?: number | null;
      price: number;
      amount: number;
      size?: string;
      category: string;
      subCategory: string;
    },
  ];
  discountPercentage?: number;
  valueTotalDiscount?: number;
  totalDiscount?: number;
  totalPayable: number;
}
