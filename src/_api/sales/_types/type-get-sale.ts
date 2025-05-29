export interface GetSaleContent {
  id: string;
  customerCpf: string;
  discountPercentage?: number;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  products: {
    code: string;
    name: string;
    unitPrice: number;
    totalPrice: number;
    priceWithDiscount?: number, 
    amount: number;
  }[];
  status: 'FINALIZADO' | 'PENDENTE';
  paymentMethod: string;
  numberInstallments?: number;
  rateName?: string;
  rateAmount?: number;
  startDate?: Date;
  endDate?: Date;
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
