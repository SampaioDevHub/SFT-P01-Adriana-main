export interface GetProductContent {
  id: string;
  code: string;
  name: string;
  discountPercentage?: number;
  priceWithDiscount?: number;
  price: number;
  quantityInStock: number;
  size?: string | null;
  category: string;
}

export interface GetProductsBody {
  content: GetProductContent[];
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
