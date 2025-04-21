'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { useSale } from '@/_components/providers/saleContext';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { ListProductType } from '../../_types/listProductsType';
import { DeleteSelectedProductModal } from './deleteSelectedProductModal';

interface TableOfSelectedProducts {
  products: ListProductType[];
  removeProduct: (id: string) => void;
}

export function TableOfSelectedProducts({
  products,
  removeProduct,
}: TableOfSelectedProducts) {
  const [
    isDeleteSelectedProductModalOpen,
    setIsDeleteSelectedProductModalOpen,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  const { setProductData, setActiveTab } = useSale();

  function handleAddProductsInContext() {
    try {
      setIsLoading(true);
      setProductData({
        products: products,
        totalItems: products.reduce((acc, product) => acc + product.amount, 0),
        subtotal: products.reduce(
          (acc, product) =>
            acc +
            (product.priceWithDiscount
              ? Number(product.priceWithDiscount)
              : product.totalPrice),
          0
        ),
      });
      setIsLoading(false);
      setActiveTab('information');
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  function formatForReals(valor: number) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

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
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  <span>Nenhum produto na lista</span>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>{product.discountPercentage}%</TableCell>
                    <TableCell>
                      {' '}
                      {product.discountPercentage &&
                      product.priceWithDiscount ? (
                        <div className="space-x-1 flex flex-wrap">
                          <span
                            style={{ textDecoration: 'line-through' }}
                            className="text-xs text-muted-foreground className='whitespace-nowrap'"
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <Button
        disabled={products.length === 0 ? true : isLoading}
        onClick={handleAddProductsInContext}
        className="disabled:cursor-not-allowed disabled:opacity-70 bg-green-500 text-background col-span-1 font-bold hover:bg-green-600"
      >
        Continuar
      </Button>
    </div>
  );
}
