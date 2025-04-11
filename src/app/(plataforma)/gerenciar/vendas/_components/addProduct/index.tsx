'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/_components/ui/command';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Button } from '@/_components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/_api/products/get-products';

import { formSchema, FormSchema } from '../../_types/saleYupType';
import { ProductSummary } from './productSummary';
import { TableOfSelectedProducts } from './tableOfSelectedProducts';

export function AddProduct() {
  const [finishLater, setFinishLater] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema({ finishLater })),
    defaultValues: {
      discountPercentage: 0,
      productResponses: [
        {
          name: '',
          quantityInStock: 1,
        },
      ],
    },
  });

  const name = watch('productResponses.0.name');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(name || '');
    }, 300);
    return () => clearTimeout(handler);
  }, [name]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', debouncedSearch],
    queryFn: () => getProducts({ nameFilter: debouncedSearch }),
    enabled: debouncedSearch.length >= 2,
  });

  function handleAddProduct(data: FormSchema) {
    console.log('Form enviado com:', data);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Nova Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="discountPercentage">Desconto (%)</Label>
                <Input
                  type="number"
                  id="discountPercentage"
                  {...register('discountPercentage')}
                />
                {errors.discountPercentage?.message && (
                  <p className="text-sm text-destructive">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="name">
                  Nome do Produto{' '}
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>

                <Controller
                  name="productResponses.0.name"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        id="name"
                        autoComplete="off"
                        onFocus={() => setOpen(true)}
                        onBlur={() => setTimeout(() => setOpen(false), 200)}
                      />

                      {open && (
                        <div className="absolute z-50 w-full border rounded-md shadow-md mt-1">
                          <Command>
                            <CommandGroup
                              className="max-h-[30vh] overflow-auto"
                              heading="Resultados"
                            >
                              {products?.content?.length ? (
                                products.content.map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    value={product.name}
                                    onSelect={() => {
                                      setValue(
                                        'productResponses.0.name',
                                        product.name
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {product.name}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        Categoria: {product.category}
                                      </span>
                                    </div>
                                  </CommandItem>
                                ))
                              ) : (
                                <div className="text-muted-foreground p-2">
                                  Nenhum produto encontrado
                                </div>
                              )}
                            </CommandGroup>
                          </Command>
                        </div>
                      )}
                    </div>
                  )}
                />

                {errors.productResponses?.[0]?.name?.message && (
                  <p className="text-sm text-destructive">
                    {errors.productResponses?.[0]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Quantidade</Label>
                <Input
                  id="amount"
                  type="number"
                  {...register(`productResponses.0.quantityInStock`)}
                />
                {errors.productResponses?.[0]?.quantityInStock?.message && (
                  <p className="text-sm text-destructive">
                    {errors.productResponses?.[0]?.quantityInStock?.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              disabled={isSubmitting}
              variant="secondary"
              className="disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar Produto'}
            </Button>

            <TableOfSelectedProducts />
          </form>
        </CardContent>
      </Card>

      <ProductSummary />
    </div>
  );
}
