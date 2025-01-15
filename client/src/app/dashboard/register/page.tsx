/* eslint-disable import/no-unresolved */
import PageContainer from "@/components/layout/page-container";
import CustomerForm from "@/features/clients/components/CustomerForm";

export default function RegisterCustomerPage() {
    return (
        <PageContainer>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Cadastro de Cliente</h1>
                <CustomerForm/>
            </div>
        </PageContainer>
    )
}

