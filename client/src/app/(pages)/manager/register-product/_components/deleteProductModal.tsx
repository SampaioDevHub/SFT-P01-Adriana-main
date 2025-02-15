/* eslint-disable-next-line react/no-unescaped-entities */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import { DeleteProduct } from '@/_api/products/delete-product';
import { getProductsById } from '@/_api/products/get-products-by-id';
import { Button } from '@/_components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ModalProps {
  productId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteProductModal({ productId, open, setIsOpen }: ModalProps) {
  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ['product'],
    queryFn: () => getProductsById({ productId }),
    enabled: open,
  });

  const { mutateAsync: deleteProductFn, isPending } = useMutation({
    mutationFn: () => DeleteProduct({ productId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['productsLength'] });
    },
  });

  async function handleDeleteProduct() {
    deleteProductFn();
    setIsOpen(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir Produto</DialogTitle>
      </DialogHeader>
      <p className="py-4">
        Tem certeza que deseja excluir o produto "{product?.name}"?
      </p>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button
          disabled={isPending}
          className="disabled:cursor-not-allowed disabled:opacity-70"
          variant="destructive"
          onClick={handleDeleteProduct}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
