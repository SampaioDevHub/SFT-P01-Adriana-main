/* eslint-disable import/no-unresolved */
'use client'

import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'
import { Product } from '../types/Product'
import { useToast } from '@/hooks/use-toast'

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Carregar produtos do localStorage quando o componente montar
    const storedProducts = localStorage.getItem('products')
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = { ...newProduct, id: Date.now() }
    const updatedProducts = [...products, product]
    saveProducts(updatedProducts)
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado com sucesso.`,
    })
  }

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    saveProducts(updatedProducts)
    toast({
      title: "Produto atualizado",
      description: `${updatedProduct.name} foi atualizado com sucesso.`,
    })
  }

  const deleteProduct = (id: number) => {
    const productToDelete = products.find(p => p.id === id)
    const updatedProducts = products.filter(p => p.id !== id)
    saveProducts(updatedProducts)
    if (productToDelete) {
      toast({
        title: "Produto excluído",
        description: `${productToDelete.name} foi excluído com sucesso.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full space-y-8">
      <ProductForm onAddProduct={addProduct} />
      <ProductTable 
        products={products}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
      />
    </div>
  )
}

