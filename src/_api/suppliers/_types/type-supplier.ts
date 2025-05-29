export interface CreateSupplierBody {
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
}