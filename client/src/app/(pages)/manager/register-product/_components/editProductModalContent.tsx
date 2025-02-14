/* eslint-disable import/no-unresolved */
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

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Checkbox } from '@/_components/ui/checkbox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { getProductsById } from '@/_api/products/get-products-by-id';
import { updatedProduct } from '@/_api/products/updated-product';
import { AlertError } from '@/_components/alert/alert-error';

import { MoneyInput } from '@/_components/Inputs/moneyInput';
import { availableSizes } from '../_constants/availableSizes';
import { formSchema, FormSchema } from '../_types/productYupType';
import { EditProductContentSkeleton } from './_skeleton/editProductContentSkeleton';

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
  const [sizesArray, setSizesArray] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const toggleSize = (size: string) => {
    if (sizesArray?.includes(size)) {
      setSizesArray(sizesArray.filter((s) => s !== size));
    } else {
      setSizesArray([...sizesArray, size]);
    }
  };

  const { data: categoriesArray } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductsByCategories,
  });

  const { data: product, isLoading: isLoadingGetProduct } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductsById({ productId }),
    enabled: open,
    staleTime: 0, // Sempre buscar novos dados
    gcTime: 0, // Remove do cache imediatamente
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
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    values: {
      code: product?.code,
      name: product?.name ?? '',
      discountPercentage: JSON.stringify(product?.discountPercentage) ?? '',
      price: JSON.stringify(product?.price) ?? '',
      amount: product?.amount ?? 0,
      size: product?.size ?? '',
      category: product?.category ?? 'Roupas',
      subCategory: product?.subCategory ?? '',
    },
  });

  const { mutateAsync: updatedProductFn } = useMutation({
    mutationFn: updatedProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  async function handleUpdatedProduct(data: FormSchema) {
    try {
      await updatedProductFn({
        id: productId,
        code: data.code,
        name: data.name,
        discountPercentage: Number(
          data.discountPercentage?.replace(/[^\d.-]/g, '')
        ),
        price: data.price.replace(/[^\d.-]/g, ''),
        amount: data.amount,
        size: data.category === 'Roupas' ? sizesString : '',
        category: data.category,
        subCategory: data.subCategory,
      });
      reset();
      setIsOpen(false);
      setErrorMessage(null);
      toast.success('Produto atualizado com sucesso');
    } catch (error: unknown) {
      const err = error as AxiosError;

      if (err.response?.data) {
        const errorData = err.response.data as { errors?: string[] };
        const errorMessage =
          errorData.errors?.[0] || 'Erro desconhecido do servidor';

        setErrorMessage(errorMessage);
      } else {
        setErrorMessage(err.message || 'Erro inesperado');
      }
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
          id="myForm"
          onSubmit={handleSubmit(handleUpdatedProduct)}
          className="max-h-[50vh] space-y-4 overflow-y-auto overflow-x-hidden pr-2"
        >
          <div className="space-y-2">
            <Label htmlFor="code">Código do Produto</Label>
            <Input id="code" {...register('code')} />
            {errors.code?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.code?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" {...register('name')} required />
            {errors.name?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Desconto(%)</Label>
            <Input
              id="discountPercentage"
              {...register('discountPercentage')}
            />
            {errors.discountPercentage?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.discountPercentage?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <select
              defaultValue=""
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
              <p className={`text-sm text-destructive`}>
                {errors.category?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-subcategory">Subcategoria</Label>
            <select
              defaultValue=""
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register('subCategory')}
            >
              <option value="" disabled hidden>
                Selecione uma categoria
              </option>
              {categoriesArray?.map((categories) => {
                if (categories.category === category) {
                  return categories.subCategories.map((subcat, index) => (
                    <option
                      className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
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
            {errors.subCategory?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.subCategory?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="gap-1" htmlFor="price">
              Preço{' '}
              <span className="text-muted-foreground">(Sem desconto)</span>
            </Label>
            <Controller
              name="price" // Nome do campo no formulário
              control={control}
              render={({ field }) => <MoneyInput {...field} />}
            />
            {errors.price?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.price?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input {...register('amount')} type="number" required />
            {errors.amount?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.amount?.message}
              </p>
            )}
          </div>
          {category === 'Roupas' && (
            <div className="space-y-2">
              <Label>Tamanhos Disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-size-${size}`}
                      checked={sizesArray.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
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
          )}
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
          type="submit"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
