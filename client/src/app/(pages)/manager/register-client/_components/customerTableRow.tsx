import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { EditCustomerModalContent } from './editCustomerModalContent';
import { useState } from 'react';
import { DeleteCustomerModal } from './deleteCustomerModal';
import { GetCustomerContent } from '@/api/customers/types/type-get-custumer';
import { DialogClose } from '@radix-ui/react-dialog';

export function CustomerTableRow({
  id,
  name,
  cpf,
  email,
  phone,
  city,
  state
}: GetCustomerContent) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{cpf}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>{state}</TableCell>
      <TableCell className='w-[10rem]'>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogClose className='d-none'></DialogClose>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='mr-2'>
              Editar
            </Button>
          </DialogTrigger>
          <EditCustomerModalContent
            setIsOpen={setIsEditModalOpen}
            open={isEditModalOpen}
            customerId={id}
          />
        </Dialog>
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' size='sm'>
              Excluir
            </Button>
          </DialogTrigger>
          <DeleteCustomerModal
            setIsOpen={setIsDeleteModalOpen}
            open={isDeleteModalOpen}
            customerId={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
