'use client'

import { useState } from 'react'
import { Product } from '../types/Product'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface EditProductModalProps {
  product: Product
  onUpdate: (updatedProduct: Product) => void
  onClose: () => void
}

export default function EditProductModal({ product, onUpdate, onClose }: EditProductModalProps) {
  const [editedProduct, setEditedProduct] = useState(product)

  const categories = {
    'Roupas': ['Masculino', 'Feminino', 'Juvenil', 'Infantil', 'Moda Praia', 'Cama', 'Mesa', 'Banho'],
    'Acessórios': ['Bolsas', 'Carteiras', 'Cintos', 'Óculos', 'Semijoias'],
    'Perfumaria': ['Mary Kay', 'Natura', 'O Boticário']
  }

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(editedProduct)
  }

  const handleSizeChange = (size: string) => {
    setEditedProduct(current => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter(s => s !== size)
        : [...current.sizes, size]
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome do Produto</Label>
            <Input
              id="edit-name"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <Select 
              value={editedProduct.category} 
              onValueChange={(value) => setEditedProduct({...editedProduct, category: value, subcategory: ''})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(categories).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-subcategory">Subcategoria</Label>
            <Select 
              value={editedProduct.subcategory} 
              onValueChange={(value) => setEditedProduct({...editedProduct, subcategory: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma subcategoria" />
              </SelectTrigger>
              <SelectContent>
                {categories[editedProduct.category as keyof typeof categories].map((subcat) => (
                  <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-price">Preço</Label>
            <Input
              id="edit-price"
              type="number"
              step="0.01"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({...editedProduct, price: parseFloat(e.target.value)})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-quantity">Quantidade</Label>
            <Input
              id="edit-quantity"
              type="number"
              value={editedProduct.quantity}
              onChange={(e) => setEditedProduct({...editedProduct, quantity: parseInt(e.target.value)})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tamanhos Disponíveis</Label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-size-${size}`}
                    checked={editedProduct.sizes.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <label
                    htmlFor={`edit-size-${size}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Atualizar Produto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

