/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { DeleteCustomer } from '@/api/customers/delete-customer';
import { getCustomerById } from '@/api/customers/get-customer-by-id';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ModalProps {
  customerId: string ;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteCustomerModal({
  customerId,
  open,
  setIsOpen
}: ModalProps) {
  const queryClient = useQueryClient();

  const { data: customer } = useQuery({
    queryKey: ['customer'],
    queryFn: () => getCustomerById({ customerId }),
    enabled: open
  });

  const { mutateAsync: deleteCustomerFn, isPending } = useMutation({
    mutationFn: () => DeleteCustomer({ customerId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  async function handleDeleteCustomer() {
    deleteCustomerFn();
    setIsOpen(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir Produto</DialogTitle>
      </DialogHeader>
      <p className='py-4'>
        Tem certeza que deseja excluir o produto "{customer?.name}"?
      </p>
      <DialogFooter>
        <Button variant='outline' onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button
          disabled={isPending}
          className='disabled:cursor-not-allowed disabled:opacity-70'
          variant='destructive'
          onClick={handleDeleteCustomer}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
