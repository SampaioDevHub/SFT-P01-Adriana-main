export interface CreateCustomerContent {
  name: string;
  cpf: string;
  maritalStatus?: string;
  email?: string;
  phone?: string;
  enterprise?: string;
  businessPhone?: string;
  lengthService?: string;
  businessAddress?: string;
  businessSector?: string;
  businessCity?: string;
  businessState?: string;
  businessPosition?: string;
  dateBirth?: string;
  addressData: {
    zipCode?: string;
    address?: string;
    number?: string;
    complement?: string;
    referencePoint?: string;
    city?: string;
    state?: string;
  };
  bank?: string;
  agency?: string;
  father?: string;
  mother?: string;
}

export interface CreateCustomerBody {
  content: CreateCustomerContent[];
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