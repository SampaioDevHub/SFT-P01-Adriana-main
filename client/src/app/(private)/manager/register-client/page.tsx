/* eslint-disable import/no-unresolved */
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import CustomerTable from './_components/CustomerTable'
import PageContainer from '@/components/layout/page-container'
export default function CustomersPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Lista de Clientes</h1>
          <Link href="/dashboard/register">
            <Button className=''>Cadastrar Novo Cliente</Button>
          </Link>
        </div>
        <CustomerTable />
      </div>
    </PageContainer>
  )
}