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
  CommandItem,
} from '@/_components/ui/command';
import {
  formSchemaSaleProduct,
  FormSchemaSaleProduct,
} from '../../_types/saleProductYupType';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Button } from '@/_components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/_api/products/get-products';

import { ListProductType } from '../../_types/listProductsType';
import { AlertStockModal } from '../alertStockModal';
import { TableOfSelectedProducts } from './tableOfSelectedProducts';

export function AddProduct() {
  const [listProducts, setListProducts] = useState<ListProductType[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setListProducts(JSON.parse(storedProducts));
    }
  }, []);

  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [stockProductName, setStockProductName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);

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

  function handleRemoveProduct(productId: string) {
    const updatedList = listProducts.filter(product => product.id !== productId);
    setListProducts(updatedList);
    // Atualizar no localStorage
    localStorage.setItem('products', JSON.stringify(updatedList));
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
  
      // Verificar estoque disponível
      const totalRequestedAmount = data.amount;
      const existingProduct = listProducts.find(p => p.id === selected.id);
  
      if (existingProduct) {
        const newAmount = existingProduct.amount + totalRequestedAmount;
  
        if (newAmount > selected.quantityInStock) {
          setStockProductName(selected.name);
          setStockQuantity(selected.quantityInStock);
          setShowUpdateStockModal(true);
          return;
        }
  
        // Atualizar quantidade do produto existente
        const updatedList = listProducts.map(product => 
          product.id === selected.id 
            ? { ...product, amount: newAmount } 
            : product
        );
  
        setListProducts(updatedList);
        localStorage.setItem('products', JSON.stringify(updatedList));
      } else {
        if (totalRequestedAmount > selected.quantityInStock) {
          setStockProductName(selected.name);
          setStockQuantity(selected.quantityInStock);
          setShowUpdateStockModal(true);
          return;
        }
  
        const unitPrice = selected.priceWithDiscount ? selected.priceWithDiscount : selected.price;
        const priceWithDiscount = selected.priceWithDiscount || 0 * data.amount;
        const totalPrice = selected.price * data.amount;
  
        const product: ListProductType = {
          id: selected.id,
          code: selected.code,
          name: selected.name,
          unitPrice,
          amount: data.amount,
          priceWithDiscount: priceWithDiscount,
          discountPercentage: selected.discountPercentage,
          totalPrice,
        };
  
        const updatedList = [...listProducts, product];
        setListProducts(updatedList);
        localStorage.setItem('products', JSON.stringify(updatedList));
      }
  
      reset();
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
          <form id='myForm' onSubmit={handleSubmit(handleAddProductInList)} className="space-y-4">
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
                            <CommandGroup className="max-h-[30vh] overflow-auto" heading="Resultados">
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
                                      <span className="font-medium">{product.name}</span>
                                      <span className="text-sm text-muted-foreground">Categoria: {product.category}</span>
                                    </div>
                                  </CommandItem>
                                ))
                              ) : (
                                <div className="text-muted-foreground p-2">Nenhum produto encontrado</div>
                              )}
                            </CommandGroup>
                          </Command>
                        </div>
                      )}
                    </div>
                  )}
                />
                {errors.name?.message && <p className="text-sm text-destructive">{errors.name?.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Quantidade</Label>
                <Input min={1} id="amount" type="number" {...register('amount')} />
                {errors.amount?.message && <p className="text-sm text-destructive">{errors.amount?.message}</p>}
              </div>
            </div>

            <Button
              form='myForm'
              disabled={isSubmitting}
              variant="secondary"
              className="disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar Produto'}
            </Button>

            <TableOfSelectedProducts
              removeProduct={handleRemoveProduct}
              products={listProducts}
              name={name} // Passando o valor de 'name'
              setError={setError} // Para disparar um erro no AddProduct
            />
          </form>
        </CardContent>
      </Card>
      <AlertStockModal
        open={showUpdateStockModal}
        onClose={() => setShowUpdateStockModal(false)}
        productName={stockProductName}
        currentStock={stockQuantity}
      />
    </div>
  );
}

