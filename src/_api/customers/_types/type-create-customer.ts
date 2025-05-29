export interface CreateCustomerContent {
  name: string;
  cpf: string;
  maritalStatus?: string;
  email?: string | null;
  profile: string;
  phone?: string;
  enterprise?: string;
  businessPhone?: string;
  lengthService?: string;
  businessZipCode?: string;
  businessAddress?: string;
  businessSector?: string;
  businessCity?: string;
  businessState?: string;
  businessPosition?: string;
  dateBirth?: Date | null;
  addressData?: {
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
  referenceEntityList?: {
    name: string;
    phone?: string;
    addressData?: {
      zipCode?: string;
      address?: string;
      number?: string;
      complement?: string;
      referencePoint?: string;
      city?: string;
      state?: string;
    };
  }[];
}