import { CreateCustomerContent } from "@/_api/customers/_types/type-create-customer";

export const DefaultCreateCustomerContent: CreateCustomerContent = {
  name: '',
  cpf: '',
  maritalStatus: '',
  email: '',
  profile: '',
  phone: '',
  enterprise: '',
  businessPhone: '',
  lengthService: '',
  businessZipCode: '',
  businessAddress: '',
  businessSector: '',
  businessCity: '',
  businessState: '',
  businessPosition: '',
  addressData: {
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    referencePoint: '',
    city: '',
    state: '',
  },
  bank: '',
  agency: '',
  father: '',
  mother: '',
  referenceEntityList: [
  ],
};