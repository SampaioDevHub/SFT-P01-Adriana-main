/* eslint-disable import/no-unresolved */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
<<<<<<< HEAD
import { getProductsByCategories } from '@/api/product/get-products-by-categories';
import { getProductsById } from '@/api/product/get-products-by-id';
import { updatedProduct } from '@/api/product/updated-product';
=======
import { getProductsByCategories } from '@/api/products/get-products-by-categories';
import { getProductsById } from '@/api/products/get-products-by-id';
import { updatedProduct } from '@/api/products/updated-product';
>>>>>>> 4c2894b1a0f819cde3fccbe830981175496985c0

import { EditProductContentSkeleton } from './_skeleton/editProductContentSkeleton';
import { MoneyInput } from '../../../../../components/Inputs/moneyInput';
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
  subcategory: yup.string().required('Informe uma Subcategoria')
});

type FormSchema = yup.InferType<typeof formSchema>;

interface ModalProps {
  productId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditProductModalContent({
  productId,
  setIsOpen,
  open
}: ModalProps) {
  const queryClient = useQueryClient();

  const [sizesArray, setSizesArray] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    if (sizesArray?.includes(size)) {
      setSizesArray(sizesArray.filter((s) => s !== size));
    } else {
      setSizesArray([...sizesArray, size]);
    }
  };

  const { data: categoriesArray } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductsByCategories
  });

  const { data: product, isLoading: isLoadingGetProduct } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductsById({ productId }),
    enabled: open,
    staleTime: 0, // Sempre buscar novos dados
    gcTime: 0 // Remove do cache imediatamente
  });

  useEffect(() => {
    if (product?.size) {
      setSizesArray(product?.size.split(', '));
    }
  }, [product?.size]);
  const sizesString = sizesArray.join(', ');

  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    values: {
      name: product?.name ?? '',
      price: JSON.stringify(product?.price) ?? '',
      amount: product?.amount ?? 0,
      size: product?.size ?? '',
      category: product?.category ?? 'Roupas',
      subcategory: product?.subCategory ?? ''
    }
  });

  const { mutateAsync: updatedProductFn } = useMutation({
    mutationFn: updatedProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  async function handleUpdatedProduct(data: FormSchema) {
    try {
      await updatedProductFn({
        id: productId,
        name: data.name,
        price: Number(data.price.replace(/[^\d.-]/g, '')),
        amount: data.amount,
        size: data.category === 'Roupas' ? sizesString : '',
        category: data.category,
        subCategory: data.subcategory
      });
      reset();
      setIsOpen(false);
      toast.success('Produto atualizado com sucesso');
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro');
    }
  }

  const category = watch('category');

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
      </DialogHeader>
      {isLoadingGetProduct && <EditProductContentSkeleton />}
      {product && (
        <form
          onSubmit={handleSubmit(handleUpdatedProduct)}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Input {...register('name')} required />
            {errors.name?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='edit-category'>Categoria</Label>
            <select
              defaultValue=''
              className='flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              {...register('category')}
            >
              <option value='' disabled hidden>
                Selecione uma categoria
              </option>
              {categoriesArray?.map((cat, index) => (
                <option
                  className='w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none'
                  key={index}
                  value={cat.category}
                >
                  {cat.category}
                </option>
              ))}
            </select>
            {errors.category?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.category?.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='edit-subcategory'>Subcategoria</Label>
            <select
              defaultValue=''
              className='flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              {...register('subcategory')}
            >
              <option value='' disabled hidden>
                Selecione uma categoria
              </option>
              {categoriesArray?.map((categories) => {
                if (categories.category === category) {
                  return categories.subCategories.map((subcat, index) => (
                    <option
                      className='w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none'
                      key={index}
                      value={subcat}
                    >
                      {subcat}
                    </option>
                  ));
                }
                return null;
              })}
            </select>
            {errors.subcategory?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.subcategory?.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='edit-price'>Preço</Label>
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
            <Label>Quantidade</Label>
            <Input {...register('amount')} type='number' required />
            {errors.amount?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.amount?.message}
              </p>
            )}
          </div>
          {category === 'Roupas' && (
            <div className='space-y-2'>
              <Label>Tamanhos Disponíveis</Label>
              <div className='flex flex-wrap gap-2'>
                {availableSizes.map((size) => (
                  <div key={size} className='flex items-center space-x-2'>
                    <Checkbox
                      id={`edit-size-${size}`}
                      checked={sizesArray.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <label
                      htmlFor={`edit-size-${size}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              disabled={isSubmitting}
              className='disabled:cursor-not-allowed disabled:opacity-70'
              type='submit'
            >
              Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}
