export interface CalcSaleBody {
  discountPercentage?: number | null;
  productResponses: [
    {
      code?: string;
      amount: number;
    },
  ];
}
