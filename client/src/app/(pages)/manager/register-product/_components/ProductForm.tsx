/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/api/product/create-product';
import { getProductsByCategories } from '@/api/product/get-products-by-categories';

import { MoneyInput } from './moneyInput';
import { availableSizes } from '../constants/availableSizes';

const formSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  price: yup.string().required('Informe o preço do produto'),
  amount: yup
    .number()
    .integer()
    .typeError('Informe a quantidade do produto')
    .required('Informe a quantidade do produto'),
  size: yup.string().when('category', ([category], schema) => {
    if (category === 'Roupas') {
      return schema.required('Selecione um tamanho');
    }
    return schema.notRequired();
  }),
  category: yup.string().required('Informe uma categoria'),
  subCategory: yup.string().required('Informe uma Subcategoria')
});

type FormSchema = yup.InferType<typeof formSchema>;


export default function ProductForm() {
  const queryClient = useQueryClient();

  const [sizesArray, setSizesArray] = useState<string[]>([]); // Estado para armazenar os tamanhos

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      category: '',
      size: '',
      price: ''
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductsByCategories
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productsLength'] });
    }
  });

  async function handleCreateProduct(data: FormSchema) {
    console.log(data)
    try {
      await createProductFn({
        name: data.name,
        price: Number(data.price.replace(/[^\d.-]/g, '')),
        amount: data.amount,
        size: isClothingCategory ? sizesString : '',
        category: data.category,
        subCategory: data.subCategory
      });
      toast.success('Produto cadastrado com sucesso');
      reset();
      setSizesArray([]);
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro');
    }
  }

  const category = watch('category');
  const isClothingCategory = category === 'Roupas';
 
  // Observa o valor do campo "size"
  const selectedSize = watch('size');

  // Adiciona o tamanho ao array sempre que o valor for alterado
  useEffect(() => {
    if (selectedSize && !sizesArray.includes(selectedSize)) {
      setSizesArray((prev) => [...prev, selectedSize]);
    }
  }, [selectedSize, sizesArray]);

  const sizesString = sizesArray.join(', ');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome do Produto</Label>
            <Input {...register('name')} required />
            {errors.name?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='category'>Categoria</Label>
            <Controller
              name='category' // Nome do campo no formulário
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione uma categoria' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat, index) => (
                      <SelectItem key={index} value={cat.category}>
                        {cat.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.category?.message}
              </p>
            )}
          </div>
          {category && (
            <div className='space-y-2'>
              <Label htmlFor='subcategory'>Subategoria</Label>
              <Controller
                name='subCategory' // Nome do campo no formulário
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione uma subcategoria' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((categoryy) => {
                        if (categoryy.category === category) {
                          return categoryy.subCategories.map(
                            (subcat, index) => (
                              <SelectItem key={index} value={subcat}>
                                {subcat}
                              </SelectItem>
                            )
                          );
                        }
                        return null;
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.subCategory?.message && (
                <p className={`text-sm text-destructive`}>
                  {errors.subCategory?.message}
                </p>
              )}
            </div>
          )}
          <div className='space-y-2'>
            <Label htmlFor='price'>Preço</Label>
            <Controller
              name='price' // Nome do campo no formulário
              control={control}
              render={({ field }) => <MoneyInput {...field} />}
            />
            {errors.price?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.price?.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='quantity'>Quantidade</Label>
            <Input {...register('amount')} type='number' required />
            {errors.amount?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.amount?.message}
              </p>
            )}
          </div>
          {isClothingCategory && (
            <div className='space-y-2'>
              <Label htmlFor='sizes'>Tamanhos Disponíveis</Label>
              <Controller
                name='size' // Nome do campo no formulário
                control={control}
                defaultValue='' // Valor inicial
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione os tamanhos' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size} {sizesArray?.includes(size) && '✓'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.size?.message && (
                <p className={`text-sm text-destructive`}>
                  {errors.size?.message}
                </p>
              )}
              <div className='mt-2'>
                Tamanhos selecionados: {sizesArray.join(', ')}
              </div>
            </div>
          )}
          <Button
            disabled={isSubmitting}
            className='disabled:cursor-not-allowed disabled:opacity-70'
            type='submit'
          >
            Adicionar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
