/* eslint-disable import/no-unresolved */
'use client'

import { useState } from 'react'
import { Customer } from '../types/Customer'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast'

interface DeleteCustomerModalProps {
  customer: Customer
  onDelete: (id: number) => void
}

export default function DeleteCustomerModal({ customer, onDelete }: DeleteCustomerModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleDelete = () => {
    onDelete(customer.id)
    setIsOpen(false)
    toast({
      title: "Cliente excluído",
      description: `${customer.name} foi removido com sucesso.`,
      variant: "destructive",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Excluir</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o cliente {customer.name}? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

