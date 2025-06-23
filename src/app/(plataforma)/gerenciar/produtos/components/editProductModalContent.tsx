/* eslint-disable no-console */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import { AxiosError } from 'axios';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { getProductsById } from '@/_api/products/get-product-by-id';
import { updatedProduct } from '@/_api/products/updated-product';
import { AlertError } from '@/_components/alert/alert-error';
import { MoneyInput } from '@/_components/Inputs/moneyInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';

import { FormSchemaProduct, formSchemaProduct } from '../_types/productYupType';
import { EditProductContentSkeleton } from './skeleton/editProductContentSkeleton';
import { CategoryModal } from './categoryModal';
import { DeleteCategoryModal } from './deleteCategoryModal';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

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
      discountPercentage: product?.discountPercentage,
      size: product?.size,
      price: product?.price ?? 0,
    },
  });

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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(stored);
  }, []);

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
            <Label htmlFor="price">
              Preço{' '}
              <span className="text-muted-foreground">(Sem desconto)</span>
            </Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <MoneyInput
                  value={
                    field.value !== null && field.value !== undefined
                      ? String(Math.round(Number(field.value * 100)))
                      : '0'
                  }
                  onChange={(centValue: string) => {
                    const valueInReais = Number(centValue) / 100;
                    field.onChange(valueInReais);
                  }}
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
