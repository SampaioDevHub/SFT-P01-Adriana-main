import { api } from "@/lib/axios";

export interface CreateCustomerBody {
    name: string;
    phone: string;
    residentialAddress: {
        street: string;
        sector: string;
        city: string;
        state: string;
        zipCode: string;
        reference: string;
    };
    cpf: string;
    identityDocument: {
        number: string;
        issuer: string;
    };
    birthDate: string;
    maritalStatus: string;
    clientStatus: "bom" | "regular" | "ruim" | ""
    professional: {
        company: string;
        phone: string;
        duration: string;
        address: string;
        sector: string;
        city: string;
        state: string;
        section: string;
        role: string;
    };
    bank: {
        name: string;
        branch: string;
    };
    parents: {
        father: string;
        mother: string;
    };
    commercialInfo: string;
    personalReferences: Array<{
        name: string;
        phone: string;
        address: string;
    }>;
    observations: string;
}

export async function createCustomer({
    name,
    phone,
    residentialAddress,
    cpf,
    identityDocument,
    birthDate,
    maritalStatus,
    clientStatus,
    professional,
    bank,
    parents,
    commercialInfo,
    personalReferences,
    observations,
}: CreateCustomerBody) {
    await api.post('/customer/create', {
        name,
        phone,
        residentialAddress,
        cpf,
        identityDocument,
        birthDate,
        maritalStatus,
        clientStatus,
        professional,
        bank,
        parents,
        commercialInfo,
        personalReferences,
        observations,
    });
}
