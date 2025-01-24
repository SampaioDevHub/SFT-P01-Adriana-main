/* eslint-disable import/no-unresolved */
'use client'
import CustomerForm from './CustomerForm'
import CustomerTable from './CustomerTable'
import { useToast } from '@/hooks/use-toast'
export default function CustomerManagement() {
  const { toast } = useToast()

  toast({
    title: "Cliente atualizado",
    description: `${"sd"} foi atualizado com sucesso.`,
  })

  return (
    <div className="w-full space-y-8">
      <CustomerForm  />
      <CustomerTable
      />
    </div>
  )
}