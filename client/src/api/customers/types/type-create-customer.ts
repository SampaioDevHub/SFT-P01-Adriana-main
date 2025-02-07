export type customerAddressData = {
  zipCode: string;
  address: string;
  number: string;
  referencePoint: string;
  complement: string;
  city: string;
  state: string;
};

export interface CustomerReferenceList {
  name: string;
  phone: string;
  addressData: customerAddressData;
  observation: string;
}

export interface CreateCustomerContent {
  name: string;
  cpf: string;
  maritalStatus?: string;
  email?: string;
  phone?: string;
  dataBirth?: string;
  enterprise?: string;
  businessPhone?: string;
  lengthService?: string;
  businessAddress?: string;
  businessSector?: string;
  businessCity?: string;
  businessState?: string;
  businessPosition?: string;
  bank?: string,
  agency?: string,
  father?: string,
  mother?: string,
  addressData?: customerAddressData;
  referenceEntityList?: CustomerReferenceList[];
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
