/* eslint-disable no-console */

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/_api/products/create-product';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { AlertError } from '@/_components/alert/alert-error';
import { MoneyInput } from '@/_components/Inputs/moneyInput';

import { availableSizes } from '../_constants/availableSizes';
import { formSchema, FormSchema } from '../_types/productYupType';

export function ProductForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sizesArray, setSizesArray] = useState<string[]>([]); // Estado para armazenar os tamanhos

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema(false)),
    defaultValues: {
      category: '',
      size: '',
      price: '',
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getProductsByCategories,
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  async function handleCreateProduct(data: FormSchema) {
    try {
      await createProductFn({
        code: data.code,
        name: data.name,
        discountPercentage: data.discountPercentage,
        price: data.price,
        quantityInStock: data.quantityInStock,
        size: sizesString,
        category: data.category,
        subCategory: data.subCategory,
      });
      reset();
      setSizesArray([]);
      setErrorMessage(null);
      toast.success('Produto cadastrado com sucesso');
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
  const isClothingCategory = category === 'Roupas';

  // Observa o valor do campo 'size'
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
        <CardTitle>Cadastrar Novo Produto</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label className="gap-1" htmlFor="code">
              Código do Produto
              <span className="text-muted-foreground">(Opcional)</span>
            </Label>
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
            <Label className="gap-1" htmlFor="price">
              Desconto(%)
              <span className="text-muted-foreground">(Opcional)</span>
            </Label>
            <Input
              type="number"
              id="discountPercentage"
              {...register('discountPercentage')}
            />
            {errors.discountPercentage?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.discountPercentage?.message}
              </p>
            )}
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
            <div className="space-y-2">
              <Label htmlFor="subcategory">SubCategoria</Label>
              <Controller
                name="subCategory" // Nome do campo no formulário
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma SubCategoria" />
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
          <div className="space-y-2">
            <Label className="gap-1" htmlFor="price">
              Preço
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
            <Label htmlFor="quantityInStock">Quantidade</Label>
            <Input id="quantityInStock" {...register('quantityInStock')} type="number" required />
            {errors.quantityInStock?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.quantityInStock?.message}
              </p>
            )}
          </div>
          {isClothingCategory && (
            <div className="space-y-2">
              <Label htmlFor="sizes">Tamanhos Disponíveis</Label>
              <Controller
                name="size" // Nome do campo no formulário
                control={control}
                defaultValue="" // Valor inicial
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione os tamanhos" />
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
              <div className="mt-2">
                Tamanhos selecionados: {sizesArray.join(', ')}
              </div>
            </div>
          )}
          {errorMessage && (
            <AlertError
              title="Ops, parece que temos um erro!"
              errorMessage={errorMessage}
            />
          )}
          <Button
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Produto'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
