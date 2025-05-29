'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { Command, CommandGroup, CommandItem } from '@/_components/ui/command';
import {
  formSchemaSaleProduct,
  FormSchemaSaleProduct,
} from '../../_types/saleProductYupType';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

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
  // Estado local dos produtos selecionados
  const [listProducts, setListProducts] = useState<ListProductType[]>([]);

  // Modal de alerta de estoque
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [stockProductName, setStockProductName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);

  // Dropdown aberto
  const [open, setOpen] = useState(false);

  // Produto selecionado (armazenar o ID para evitar ambiguidade)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // Ref para controle de clique fora dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Formulário com react-hook-form
  const {
    handleSubmit,
    register,
    watch,
    setError,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaSaleProduct & { productId?: string }>({
    resolver: yupResolver(formSchemaSaleProduct()),
    defaultValues: {
      name: '',
      amount: 1,
      productId: undefined,
    },
  });

  // Carregar produtos salvos do localStorage na montagem
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setListProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Watch do nome para debounce e controle dropdown
  const name = watch('name');

  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(name || '');
    }, 300);

    return () => clearTimeout(handler);
  }, [name]);

  // Query para buscar produtos filtrados pelo nome
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', debouncedSearch],
    queryFn: () => getProducts({ nameFilter: debouncedSearch }),
    enabled: debouncedSearch.length >= 1 || debouncedSearch.length === 0, // busca também vazio para mostrar tudo
  });

  // Função para fechar dropdown ao clicar fora
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, handleClickOutside]);

  // Atualiza o campo 'name' e seleciona o produtoId ao escolher do dropdown
  const handleSelectProduct = (product: { id: string; name: string }) => {
    setValue('name', product.name, { shouldValidate: true });
    setValue('productId', product.id);
    setSelectedProductId(product.id);
    setOpen(false);
  };

  // Remove produto da lista e localStorage
  const handleRemoveProduct = useCallback(
    (productId: string) => {
      const updatedList = listProducts.filter(
        (product) => product.id !== productId
      );
      setListProducts(updatedList);
      localStorage.setItem('products', JSON.stringify(updatedList));
    },
    [listProducts]
  );

  // Função para adicionar produto
  async function handleAddProductInList(
    data: FormSchemaSaleProduct & { productId?: string }
  ) {
    try {
      // Buscar produto selecionado baseado no productId
      let selected;

      if (data.productId && products?.content) {
        selected = products.content.find((p) => p.id === data.productId);
      }

      // Caso não tenha o produto na lista, tentar buscar via API (fallback)
      if (!selected) {
        const productData = await getProducts({ nameFilter: data.name });
        selected = productData?.content?.[0];
      }

      if (!selected) {
        setError('name', {
          type: 'manual',
          message: 'Produto não encontrado.',
        });
        return;
      }

      const totalRequestedAmount = data.amount;

      // Verificar se o produto já existe na lista
      const existingProduct = listProducts.find((p) => p.id === selected.id);

      if (existingProduct) {
        const newAmount = existingProduct.amount + totalRequestedAmount;

        if (newAmount > selected.quantityInStock) {
          setStockProductName(selected.name);
          setStockQuantity(selected.quantityInStock);
          setShowUpdateStockModal(true);
          return;
        }

        const updatedList = listProducts.map((product) =>
          product.id === selected.id
            ? {
                ...product,
                amount: newAmount,
                totalPrice: product.unitPrice * newAmount,
              }
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

        const unitPrice = selected.priceWithDiscount ?? selected.price;
        const priceWithDiscount =
          (selected.priceWithDiscount ?? 0) * data.amount;
        const totalPrice = selected.price * data.amount;

        const product: ListProductType = {
          id: selected.id,
          code: selected.code,
          name: selected.name,
          unitPrice,
          amount: data.amount,
          priceWithDiscount,
          discountPercentage: selected.discountPercentage,
          totalPrice,
        };

        const updatedList = [...listProducts, product];
        setListProducts(updatedList);
        localStorage.setItem('products', JSON.stringify(updatedList));
      }

      reset({ name: '', amount: 1, productId: undefined });
      setSelectedProductId(null);
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
            id="myForm"
            onSubmit={handleSubmit(handleAddProductInList)}
            className="space-y-4"
            noValidate
          >
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="space-y-2 relative" ref={dropdownRef}>
                <Label htmlFor="name">
                  Nome do Produto{' '}
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        id="name"
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-controls="product-listbox"
                        aria-expanded={open}
                        aria-haspopup="listbox"
                        onFocus={() => setOpen(true)}
                      />
                      {open && (
                        <div
                          id="product-listbox"
                          role="listbox"
                          className="absolute z-50 w-full border rounded-md shadow-md mt-1 bg-white max-h-[30vh] overflow-auto"
                        >
                          <Command>
                            <CommandGroup heading="Resultados">
                              {isLoading ? (
                                <div className="p-2 text-center text-muted-foreground">
                                  Carregando...
                                </div>
                              ) : products?.content?.length ? (
                                products.content.map((product) => (
                                  <CommandItem
                                    key={product.id}
                                    value={product.name}
                                    onSelect={() =>
                                      handleSelectProduct(product)
                                    }
                                    role="option"
                                    aria-selected={
                                      selectedProductId === product.id
                                    }
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
                                <div className="p-2 text-muted-foreground">
                                  Nenhum produto encontrado
                                </div>
                              )}
                            </CommandGroup>
                          </Command>
                        </div>
                      )}
                    </>
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
                <Input
                  min={1}
                  id="amount"
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                />
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

            <TableOfSelectedProducts
              removeProduct={handleRemoveProduct}
              products={listProducts}
              name={name}
              setError={setError}
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
