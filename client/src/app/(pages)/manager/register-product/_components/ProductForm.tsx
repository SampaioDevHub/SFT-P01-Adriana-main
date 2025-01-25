'use client'

import * as yup from 'yup';
import { toast } from "sonner";
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from "react-hook-form";
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
import { useEffect, useState } from 'react';
import { MoneyInput } from './money-input';
import { useMutation } from '@tanstack/react-query';
import { createProduct } from '@/api/create-product';

const formSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  price: yup.number().integer().typeError('Informe o preço do produto').required('Informe o preço do produto'),
  amount: yup.number().integer().typeError('Informe a quantidade do produto').required('Informe a quantidade do produto'),
  size: yup.string().required('Selecione um tamanho'),
  category: yup.string().required('Informe uma categoria'),
  subcategory: yup.string().required('Informe uma Subcategoria')
});
  
type FormSchema = yup.InferType<typeof formSchema>

export default function ProductForm() {
  const [sizesArray, setSizesArray] = useState<string[]>([]); // Estado para armazenar os tamanhos
  const categories = {
    'Roupas': ['Masculino', 'Feminino', 'Juvenil', 'Infantil', 'Moda Praia', 'Cama', 'Mesa', 'Banho'],
    'Acessórios': ['Bolsas', 'Carteiras', 'Cintos', 'Óculos', 'Semijoias'],
    'Perfumaria': ['Mary Kay', 'Natura', 'O Boticário', 'Avon'],
  }

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG']

  const { handleSubmit, register, control, watch, formState: {isSubmitting, errors} } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct
  })

  async function handleCreateProduct(data: FormSchema) {
      console.log({...data,
        size: sizesString})
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
        amount: data.amount,
        size: sizesString,
        category: data.category,
        subcategory: data.subcategory,
      })
      toast.success('Produto cadastrado com sucesso');
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro');
    }
  }

  const category = watch('category')

  // Observa o valor do campo "size"
  const selectedSize = watch("size");

  // Adiciona o tamanho ao array sempre que o valor for alterado
  useEffect(() => {
    if (selectedSize && !sizesArray.includes(selectedSize)) {
      setSizesArray((prev) => [...prev, selectedSize]);
    }
  }, [selectedSize, sizesArray]);

  const sizesString = sizesArray.join(", ")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              {...register('name')}
              required
            />
            {errors.name?.message && <p className={`text-sm text-destructive`}>{errors.name?.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Controller
             name="category" // Nome do campo no formulário
             control={control}
             render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories).map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
             )}    
            />
            {errors.category?.message && <p className={`text-sm text-destructive`}>{errors.category?.message}</p>}
          </div>
          {category && (
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategoria</Label>
              <Controller
                name="subcategory" // Nome do campo no formulário
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma subcategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories[category as keyof typeof categories].map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}    
              />
              {errors.subcategory?.message && <p className={`text-sm text-destructive`}>{errors.subcategory?.message}</p>}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Controller
              name="price" // Nome do campo no formulário
              control={control}
              render={({ field }) => (
                <MoneyInput
                  onValueChange={(values) => {
                    field.onChange(values.floatValue); // Usa o valor numérico (floatValue)
                  }} 
                  value={field.value}
                />
              )}
            />    
            {errors.price?.message && <p className={`text-sm text-destructive`}>{errors.price?.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              {...register('amount')}
              id="quantity"
              type="number"
              required
            />
            {errors.amount?.message && <p className={`text-sm text-destructive`}>{errors.amount?.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sizes">Tamanhos Disponíveis</Label>
            <Controller
              name="size" // Nome do campo no formulário
              control={control}
              defaultValue='' // Valor inicial
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os tamanhos" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} {sizesArray?.includes(size) && "✓"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}    
            />
            {errors.size?.message && <p className={`text-sm text-destructive`}>{errors.size?.message}</p>}

            <div className="mt-2">
              Tamanhos selecionados: {sizesArray.join(", ")}
            </div>
          </div>
          <Button disabled={isSubmitting} className="disabled:cursor-not-allowed opacity-70" type="submit" >Adicionar Produto</Button>
        </form>
      </CardContent>
    </Card>
  )
}

