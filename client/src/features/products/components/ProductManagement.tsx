/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'
import { Product } from '../types/Product'
import { useToast } from '@/hooks/use-toast'

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const { toast } = useToast()
  const apiUrl = 'https://seu-backend.com/api/products' // Substitua pela URL da API

  // Carregar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(apiUrl)
        setProducts(response.data)
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os produtos.",
          variant: "destructive",
        })
        console.error(error)
      }
    }

    fetchProducts()
  }, [apiUrl, toast])

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await axios.post<Product>(apiUrl, newProduct)
      setProducts((prev) => [...prev, response.data])
      toast({
        title: "Produto adicionado",
        description: `${response.data.name} foi adicionado com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await axios.put(`${apiUrl}/${updatedProduct.id}`, updatedProduct)
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      )
      toast({
        title: "Produto atualizado",
        description: `${updatedProduct.name} foi atualizado com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o produto.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      const productToDelete = products.find((p) => p.id === id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      if (productToDelete) {
        toast({
          title: "Produto excluído",
          description: `${productToDelete.name} foi excluído com sucesso.`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o produto.",
        variant: "destructive",
      })
      console.error(error)
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
