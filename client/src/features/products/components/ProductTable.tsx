/* eslint-disable import/no-unresolved */
'use client'

import { useState } from 'react'
import { Product } from '../types/Product'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductTableProps {
  products: Product[]
  onUpdateProduct: (product: Product) => void
  onDeleteProduct: (id: number) => void
}

export default function ProductTable({ products, onUpdateProduct, onDeleteProduct }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || product.category === filterCategory)
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Pesquisar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Todas as Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            <SelectItem value="Roupas">Roupas</SelectItem>
            <SelectItem value="Acessórios">Acessórios</SelectItem>
            <SelectItem value="Perfumaria">Perfumaria</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="max-h-[500px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Subcategoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Tamanhos</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.subcategory}</TableCell>
                  <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.sizes.join(', ')}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                      className="mr-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeletingProduct(product)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onUpdate={(updatedProduct) => {
            onUpdateProduct(updatedProduct)
            setEditingProduct(null)
          }}
          onClose={() => setEditingProduct(null)}
        />
      )}
      {deletingProduct && (
        <DeleteProductModal
          product={deletingProduct}
          onDelete={() => {
            onDeleteProduct(deletingProduct.id)
            setDeletingProduct(null)
          }}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  )
}

