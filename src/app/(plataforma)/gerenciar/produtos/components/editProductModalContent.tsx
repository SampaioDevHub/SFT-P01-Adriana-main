/* eslint-disable no-console */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Checkbox } from '@/_components/ui/checkbox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { getProductsById } from '@/_api/products/get-product-by-id';
import { updatedProduct } from '@/_api/products/updated-product';
import { AlertError } from '@/_components/alert/alert-error';
import { MoneyInput } from '@/_components/Inputs/moneyInput';

import { availableSizes } from '../_constants/availableSizes';
import { FormSchemaProduct, formSchemaProduct } from '../_types/productYupType';
import { EditProductContentSkeleton } from './skeleton/editProductContentSkeleton';

interface ModalProps {
  productId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditProductModalContent({
  productId,
  setIsOpen,
  open,
}: ModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: categoriesArray } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductsByCategories,
  });

  const { data: product, isLoading: isLoadingGetProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductsById({ productId }),
    enabled: open,
    staleTime: 0,
    gcTime: 0,
  });

  const {
    handleSubmit,
    register,
    watch,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaProduct>({
    resolver: yupResolver(formSchemaProduct()),
    values: {
      category: product?.category ?? '',
      code: product?.code ?? '',
      name: product?.name ?? '',
      quantityInStock: product?.quantityInStock ?? 0,
      subCategory: product?.subCategory ?? '',
      discountPercentage: product?.discountPercentage,
      size: product?.size,
      price: product?.price ?? 0,
    },
  });

  const category = watch('category');
  const subCategory = watch('subCategory');

  useEffect(() => {
    const selectedCategory = categoriesArray?.find(
      (c) => c.category === category
    );
    const isValidSub = selectedCategory?.subCategories.includes(subCategory);
    if (!isValidSub) {
      reset((formValues) => ({
        ...formValues,
        subCategory: '',
      }));
    }
  }, [category, categoriesArray, subCategory, reset]);

  const { mutateAsync: updatedProductFn } = useMutation({
    mutationFn: updatedProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });

  async function handleUpdatedProduct(data: FormSchemaProduct) {
    try {
      await updatedProductFn({
        ...data,
        id: productId,
      });
      reset();
      setIsOpen(false);
      setErrorMessage(null);
      toast.success('Produto atualizado com sucesso');
    } catch (error: unknown) {
      const err = error as AxiosError;
      const errorData = err.response?.data as { errors?: string[] };
      const message =
        errorData?.errors?.[0] || err.message || 'Erro desconhecido';
      setErrorMessage(message);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
      </DialogHeader>
      {isLoadingGetProduct && <EditProductContentSkeleton />}
      {product && (
        <form
          id="myForm"
          onSubmit={handleSubmit(handleUpdatedProduct)}
          className="max-h-[50vh] space-y-4 overflow-y-auto overflow-x-hidden py-1 px-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              required={errors.name?.message ? true : false}
              {...register('name')}
            />
            {errors.name?.message && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPercentage">Desconto(%)</Label>
            <Input
              id="discountPercentage"
              required={errors.discountPercentage?.message ? true : false}
              {...register('discountPercentage')}
            />
            {errors.discountPercentage?.message && (
              <p className="text-sm text-destructive">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              required={errors.category?.message ? true : false}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('category')}
            >
              <option value="" disabled hidden>
                Selecione uma categoria
              </option>
              {categoriesArray?.map((cat, index) => (
                <option
                  className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
                  key={index}
                  value={cat.category}
                >
                  {cat.category}
                </option>
              ))}
            </select>
            {errors.category?.message && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subCategory">SubCategoria</Label>
            <select
              id="subCategory"
              required={errors.subCategory?.message ? true : false}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('subCategory')}
            >
              <option value="" disabled hidden>
                Selecione uma subcategoria
              </option>
              {categoriesArray
                ?.find((c) => c.category === category)
                ?.subCategories.map((subcat, index) => (
                  <option
                    className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
                    key={index}
                    value={subcat}
                  >
                    {subcat}
                  </option>
                ))}
            </select>
            {errors.subCategory?.message && (
              <p className="text-sm text-destructive">
                {errors.subCategory.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">
              Preço{' '}
              <span className="text-muted-foreground">(Sem desconto)</span>
            </Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <MoneyInput
                  required={errors.price?.message ? true : false}
                  {...field}
                  valueInCents={String(field.value * 100 || '')}
                />
              )}
            />
            {errors.price?.message && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input
              required={errors.quantityInStock?.message ? true : false}
              {...register('quantityInStock')}
              type="number"
            />
            {errors.quantityInStock?.message && (
              <p className="text-sm text-destructive">
                {errors.quantityInStock.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">
              Tamanhos Disponiveis{' '}
              <span className="text-muted-foreground">(Opcional)</span>
            </Label>
            <Input
              required={errors.size?.message ? true : false}
              {...register('size')}
              id="size"
              type="string"
            />
            {errors.size?.message && (
              <p className="text-sm text-destructive">{errors.size.message}</p>
            )}
          </div>
        </form>
      )}
      {errorMessage && (
        <AlertError
          title="Ops, parece que temos um erro!"
          errorMessage={errorMessage}
        />
      )}
      <DialogFooter>
        <Button
          form="myForm"
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
