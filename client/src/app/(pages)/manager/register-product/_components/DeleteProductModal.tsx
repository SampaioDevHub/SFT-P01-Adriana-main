/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
'use client'

import { CreateProductBody } from "@/api/create-product"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface DeleteProductModalProps {
  product: CreateProductBody
  onDelete: () => void
  onClose: () => void
}

export default function DeleteProductModal({ product, onDelete, onClose }: DeleteProductModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Produto</DialogTitle>
        </DialogHeader>
        <p className="py-4">Tem certeza que deseja excluir o produto "{product.name}"?</p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button variant="destructive" onClick={onDelete}>Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

