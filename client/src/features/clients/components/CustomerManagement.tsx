/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
'use client'

import { useState, useEffect } from 'react'
import CustomerForm from './CustomerForm'
import CustomerTable from './CustomerTable'
import { Customer } from '../types/Customer'
import { useToast } from '@/hooks/use-toast'

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers')
    if (storedCustomers) {
      try {
        setCustomers(JSON.parse(storedCustomers))
      } catch (error) {
        console.error("Erro ao carregar os clientes do localStorage:", error)
      }
    }
  }, [])

  const saveCustomers = (updatedCustomers: Customer[]) => {
    setCustomers(updatedCustomers)
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
  }

  const addCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customer = { ...newCustomer, id: Date.now() }
    const updatedCustomers = [...customers, customer]
    saveCustomers(updatedCustomers)
    toast({
      title: "Cliente adicionado",
      description: `${customer.name} foi adicionado com sucesso.`,
    })
  }

  const updateCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    )
    saveCustomers(updatedCustomers)
    toast({
      title: "Cliente atualizado",
      description: `${updatedCustomer.name} foi atualizado com sucesso.`,
    })
  }

  const deleteCustomer = (id: number) => {
    const customerToDelete = customers.find(c => c.id === id)
    const updatedCustomers = customers.filter(c => c.id !== id)
    saveCustomers(updatedCustomers)
    if (customerToDelete) {
      toast({
        title: "Cliente excluído",
        description: `${customerToDelete.name} foi excluído com sucesso.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full space-y-8">
      <CustomerForm onAddCustomer={addCustomer} />
      <CustomerTable
        customers={customers}
        onUpdateCustomer={updateCustomer}
        onDeleteCustomer={deleteCustomer}
      />
    </div>
  )
}
