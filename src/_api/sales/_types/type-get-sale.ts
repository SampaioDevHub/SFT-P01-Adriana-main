export interface GetSaleContent {
  id: string;
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

export interface GetSalesBody {
  content: GetSaleContent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
