export interface GetSupplierContent {
  id: string;
  name: string;
  cnpj: string;
  email?: string;
  phone: string;
  productCost: number;
  addressData?: {
    zipCode?: string;
    address?: string;
    number?: string;
    complement?: string;
    referencePoint?: string;
    city?: string;
    state?: string;
  };
  products: {
    id: string;
    code: string;
    name: string;
    discountPercentage?: number;
    price: number;
    quantityInStock: number;
    size?: string;
    category: string;
  }[];
}

export interface GetSuppliersBody {
  content: GetSupplierContent[];
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
