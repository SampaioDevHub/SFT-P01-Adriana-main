/* eslint-disable import/no-unresolved */
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void
}

export default function ProductForm({ onAddProduct }: ProductFormProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sizes, setSizes] = useState<string[]>([])

  const categories = {
    'Roupas': ['Masculino', 'Feminino', 'Juvenil', 'Infantil', 'Moda Praia', 'Cama', 'Mesa', 'Banho'],
    'Acessórios': ['Bolsas', 'Carteiras', 'Cintos', 'Óculos', 'Semijoias'],
    'Perfumaria': ['Mary Kay', 'Natura', 'O Boticário']
  }

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProduct({
      name,
      category,
      subcategory,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      sizes
    })
    setName('')
    setCategory('')
    setSubcategory('')
    setPrice('')
    setQuantity('')
    setSizes([])
  }

  const handleSizeChange = (size: string) => {
    setSizes(current =>
      current.includes(size)
        ? current.filter(s => s !== size)
        : [...current, size]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
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
          {category && (
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategoria</Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma subcategoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories[category as keyof typeof categories].map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Tamanhos Disponíveis</Label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={sizes.includes(size)}
                    onCheckedChange={() => handleSizeChange(size)}
                  />
                  <label
                    htmlFor={`size-${size}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Adicionar Produto</Button>
        </form>
      </CardContent>
    </Card>
  )
}

