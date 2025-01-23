/* eslint-disable import/no-unresolved */
'use client'
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
import { ClientStatusBadge } from "@/components/ui/client-status-badge"

export default function CustomerTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Pesquisar clientes..."
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
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Cpf</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                    </div>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}