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
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidV4 } from 'uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/_api/products/create-product';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { AlertError } from '@/_components/alert/alert-error';
import { MoneyInput } from '@/_components/Inputs/moneyInput';

import { FormSchemaProduct, formSchemaProduct } from '../_types/productYupType';
import { CategoryModal } from './categoryModal';
import { DeleteCategoryModal } from './deleteCategoryModal';

export function ProductForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaProduct>({
    resolver: yupResolver(formSchemaProduct()),
    defaultValues: {
      code: uuidV4(),
    },
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  async function handleCreateProduct(data: FormSchemaProduct) {
    try {
      await createProductFn({
        ...data,
        code: uuidV4(),
      });
      reset();
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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(stored);
  }, []);

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
          {/* <div className="space-y-2">
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
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              required={errors.name?.message ? true : false}
              {...register('name')}
            />
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
              required={errors.discountPercentage?.message ? true : false}
              {...register('discountPercentage')}
            />
            {errors.discountPercentage?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.discountPercentage?.message}
              </p>
            )}
          </div>
          <div className="flex items-end gap-2">
            <div className="space-y-2 w-full">
              <Label htmlFor="category">Categoria</Label>
              <Controller
                name="category" // Nome do campo no formulário
                control={control}
                render={({ field }) => (
                  <Select
                    required={errors.category?.message ? true : false}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <>
                      <SelectContent>
                        {categories.map((cat) => (
                          <div
                            key={cat}
                            className="flex items-center justify-between pr-2"
                          >
                            <SelectItem value={cat} className="w-full">
                              {cat}
                            </SelectItem>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCategoryToDelete(cat);
                                setDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </SelectContent>

                      <DeleteCategoryModal
                        open={deleteModalOpen}
                        categoryName={categoryToDelete || ''}
                        onClose={() => setDeleteModalOpen(false)}
                        onConfirm={() => {
                          if (!categoryToDelete) return;
                          const updated = categories.filter(
                            (c) => c !== categoryToDelete
                          );
                          localStorage.setItem(
                            'categories',
                            JSON.stringify(updated)
                          );
                          setCategories(updated);

                          // se o valor deletado estiver selecionado, limpa
                          if (field.value === categoryToDelete) {
                            field.onChange('');
                          }

                          setDeleteModalOpen(false);
                          toast.success('Categoria excluída com sucesso');
                        }}
                      />
                    </>
                  </Select>
                )}
              />
            </div>
            <CategoryModal
              onAddCategory={() => {
                const updated = JSON.parse(
                  localStorage.getItem('categories') || '[]'
                );
                setCategories(updated);
              }}
            />
          </div>
          {errors.category?.message && (
            <p className={`text-sm text-destructive`}>
              {errors.category?.message}
            </p>
          )}
          <div className="space-y-2">
            <Label className="gap-1" htmlFor="price">
              Preço
              <span className="text-muted-foreground">(Sem desconto)</span>
            </Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <MoneyInput
                  value={
                    field.value !== null && field.value !== undefined
                      ? String(Math.round(Number(field.value * 100))) // converte de real para centavos
                      : '0'
                  }
                  onChange={(centValue: string) => {
                    const valueInReais = Number(centValue) / 100;
                    field.onChange(valueInReais); // atualiza o formulário com valor em reais (número)
                  }}
                />
              )}
            />

            {errors.price?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.price?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantityInStock">Quantidade</Label>
            <Input
              id="quantityInStock"
              required={errors.quantityInStock?.message ? true : false}
              {...register('quantityInStock')}
              type="number"
            />
            {errors.quantityInStock?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.quantityInStock?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">
              Tamanhos Disponiveis{' '}
              <span className="text-muted-foreground">(Opcional)</span>
            </Label>
            <Input
              id="size"
              required={errors.size?.message ? true : false}
              {...register('size')}
              type="string"
            />
            {errors.size?.message && (
              <p className={`text-sm text-destructive`}>
                {errors.size?.message}
              </p>
            )}
          </div>
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
