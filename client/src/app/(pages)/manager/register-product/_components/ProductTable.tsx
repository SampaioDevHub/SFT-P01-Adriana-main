/* eslint-disable import/no-unresolved */
'use client'

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

export default function ProductTable() {

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Pesquisar produtos..."
          className="max-w-sm"
        />
        <Select>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
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
              {/* {products.map((product) => (
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
                      className="mr-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

