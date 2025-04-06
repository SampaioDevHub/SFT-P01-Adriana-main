/* eslint-disable-next-line react/no-unescaped-entities */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteProduct } from '@/_api/products/delete-product';

interface ModalProps {
  title: string;
  subTitle: string;
  id: string;
  
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteModal({ id, title, subTitle, setIsOpen }: ModalProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSaleFn, isPending } = useMutation({
    mutationFn: () => DeleteProduct({ productId: id }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  async function handleDeleteSale() {
    deleteSaleFn();
    setIsOpen(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <p className='py-4'>
        {subTitle}
      </p>
      <DialogFooter>
        <Button variant='outline' onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button
          disabled={isPending}
          className='disabled:cursor-not-allowed disabled:opacity-70'
          variant='destructive'
          onClick={handleDeleteSale}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
