'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/_components/ui/command';
import {
  formSchemaSaleProduct,
  FormSchemaSaleProduct,
} from '../../_types/saleProductYupType';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Button } from '@/_components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/_api/products/get-products';
import { TableOfSelectedProducts } from './tableOfSelectedProducts';
import { ListProductType } from '../../_types/listProductsType';

export function AddProduct() {
  const [listProducts, setListProducts] = useState<ListProductType[]>([]);

  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setError,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaSaleProduct>({
    resolver: yupResolver(formSchemaSaleProduct()),
    defaultValues: {
      name: '',
      amount: 1,
    },
  });

  const name = watch('name');
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

  function handleRemoveProduct (productId: string) {
    const products = listProducts.filter(product => product.id !== productId)
    setListProducts(products)
  }

  async function handleAddProductInList(data: FormSchemaSaleProduct) {
    try {
      const productData = await getProducts({ nameFilter: data.name });

      if (!productData?.content?.length) {
        setError('name', {
          type: 'manual',
          message: 'Produto não encontrado.',
        });
        return;
      }

      const selected = productData.content[0];
      const unitPrice = selected.priceWithDiscount ? Number(selected.priceWithDiscount) : Number(selected.price);
      const totalPrice = Number(selected.price) * data.amount;
      const priceWithDiscount = Number(selected.priceWithDiscount) * data.amount

      const product: ListProductType = {
        id: selected.id,
        code: selected.code,
        name: selected.name,
        unitPrice,
        amount: data.amount,
        priceWithDiscount: String(priceWithDiscount),
        discountPercentage: selected.discountPercentage,
        totalPrice,
      };

      setListProducts((prev) => [...prev, product]);
      reset()
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Erro ao buscar produto. Tente novamente.',
      });
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Adicione os produtos cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleAddProductInList)}
            className="space-y-4"
          >
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="name">
                  Nome do Produto{' '}
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>

                <Controller
                  name="name"
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
                                      setValue('name', product.name);
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

                {errors.name?.message && (
                  <p className="text-sm text-destructive">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Quantidade</Label>
                <Input id="amount" type="number" {...register(`amount`)} />
                {errors.amount?.message && (
                  <p className="text-sm text-destructive">
                    {errors.amount?.message}
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

            <TableOfSelectedProducts removeProduct={handleRemoveProduct} products={listProducts} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
