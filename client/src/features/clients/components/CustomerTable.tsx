/* eslint-disable import/no-unresolved */
'use client'
import { useState, useEffect } from 'react'
import { Customer } from '../types/Customer'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CustomerDetailsModal from './CustomerDetailsModal'
import DeleteCustomerModal from './DeleteCustomerModal'
export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers')
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers))
    }
  }, [])
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.cpf.includes(searchTerm)
  )
  const handleDeleteCustomer = (id: number) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id)
    setCustomers(updatedCustomers)
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Pesquisar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="max-h-[500px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.cpf}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.residentialAddress.city}</TableCell>
                  <TableCell>{customer.residentialAddress.state}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <CustomerDetailsModal customer={customer} />
                      <DeleteCustomerModal customer={customer} onDelete={handleDeleteCustomer} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}