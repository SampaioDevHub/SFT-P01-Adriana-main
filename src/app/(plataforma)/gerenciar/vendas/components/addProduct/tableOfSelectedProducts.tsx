'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { useSale } from '@/_providers/sale-provider';

import { ListProductType } from '../../_types/listProductsType';
import { DeleteSelectedProductModal } from './deleteSelectedProductModal';
import { formatForReals } from '@/_utils/formatForReals';

type TableOfSelectedProductsProps = {
  products: ListProductType[];
  removeProduct: (productId: string) => void;
  name: string; // Recebe o valor de 'name' de AddProduct
  setError: UseFormSetError<{
    name: string;
  }>;
};

export function TableOfSelectedProducts({
  products,
  removeProduct,
  name,
  setError,
}: TableOfSelectedProductsProps) {
  const [
    isDeleteSelectedProductModalOpen,
    setIsDeleteSelectedProductModalOpen,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  const [displayedProducts, setDisplayedProducts] = useState<ListProductType[]>(
    []
  );

  const { setProductData, setActiveTab } = useSale();

  function handleAddProductsInContext() {
    if (name) {
      setError('name', {
        type: 'manual',
        message: 'Por favor, adicione o produto antes de continuar.',
      });
      return;
    }
    try {
      setIsLoading(true);
      setProductData({
        products: displayedProducts,
        totalItems: displayedProducts.reduce(
          (acc, product) => acc + product.amount,
          0
        ),
        subtotal: displayedProducts.reduce((acc, product) => {
          const discount = Number(product.priceWithDiscount);
          const totalPrice = Number(product.totalPrice);
          const validValue =
            !isNaN(discount) && discount > 0 ? discount : totalPrice;
          return acc + validValue;
        }, 0),
      });
      setActiveTab('information');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    let existingProducts: ListProductType[] = [];

    if (storedProducts) {
      try {
        existingProducts = JSON.parse(storedProducts);
      } catch (e) {
        console.error('Erro ao carregar produtos do localStorage', e);
      }
    }

    // Mescla os produtos novos com os que já existem no localStorage
    const mergedProducts = [...existingProducts];

    products.forEach((newProduct) => {
      const exists = mergedProducts.find((p) => p.id === newProduct.id);
      if (!exists) {
        mergedProducts.push(newProduct);
      }
    });

    // Atualiza o estado e o localStorage
    setDisplayedProducts(mergedProducts);
    localStorage.setItem('products', JSON.stringify(mergedProducts));
  }, [products]);

  return (
    <div className="space-y-4">
      <h2 className=" text-1xl">Produtos Selecionados</h2>
      <div className="max-h-[40vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Produtos(Promoção)</TableHead>
              <TableHead>Preço Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {displayedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">
                  <span>Nenhum produto na lista</span>
                </TableCell>
              </TableRow>
            ) : (
              displayedProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.amount}</TableCell>
                  <TableCell>{product.discountPercentage}%</TableCell>
                  <TableCell>
                    {product.discountPercentage && product.priceWithDiscount ? (
                      <div className="space-x-1 flex flex-wrap">
                        <span
                          style={{ textDecoration: 'line-through' }}
                          className="text-xs text-muted-foreground"
                        >
                          {formatForReals(product.totalPrice)}
                        </span>
                        <span className="whitespace-nowrap">
                          {formatForReals(Number(product.priceWithDiscount))}
                        </span>
                      </div>
                    ) : (
                      <p>{formatForReals(product.totalPrice)}</p>
                    )}
                  </TableCell>
                  <TableCell className="w-[10rem]">
                    <Dialog
                      open={isDeleteSelectedProductModalOpen}
                      onOpenChange={setIsDeleteSelectedProductModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => {
                            setProductIdToDelete(product.id);
                            setIsDeleteSelectedProductModalOpen(true);
                          }}
                          variant="destructive"
                          size="sm"
                          className="mr-2"
                        >
                          Remover
                        </Button>
                      </DialogTrigger>
                      <DeleteSelectedProductModal
                        setIsOpen={setIsDeleteSelectedProductModalOpen}
                        productId={productIdToDelete}
                        onConfirmDelete={removeProduct}
                      />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        type="button"
        disabled={displayedProducts.length === 0 || isLoading}
        onClick={handleAddProductsInContext}
        className="disabled:cursor-not-allowed disabled:opacity-70 bg-green-500 text-background col-span-1 font-bold hover:bg-green-600"
      >
        Continuar
      </Button>
    </div>
  );
}
