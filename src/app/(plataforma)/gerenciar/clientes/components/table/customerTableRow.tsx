import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetCustomerContent } from '@/_api/customers/_types/type-get-custumer';
import { DialogClose } from '@radix-ui/react-dialog';

import { DeleteModal } from '../deleteModal';
import { EditCustomerModalContent } from '../editCustomerModalContent';

export function CustomerTableRow({
  id,
  name,
  cpf,
  phone,
  addressData,
}: GetCustomerContent) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatPhoneNumber = (phone: string | undefined) => {
    if (!phone) return '';

    const phoneNumber = parsePhoneNumberFromString(phone);

    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational(); // +55 11 91234-5678
    }

    return phone; // fallback para o número original
  };

  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{cpf}</TableCell>
      <TableCell>{formatPhoneNumber(phone)}</TableCell>
      <TableCell>{addressData.zipCode}</TableCell>
      <TableCell>{addressData.city}</TableCell>
      <TableCell>{addressData.state}</TableCell>
      <TableCell className="w-[10rem]">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogClose className="d-none"></DialogClose>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
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
            <Button variant="destructive" size="sm">
              Excluir
            </Button>
          </DialogTrigger>
          <DeleteModal
            title="Excluir Cliente"
            subTitle={`Tem certeza que deseja excluir o cliente: ${name}?`}
            setIsOpen={setIsDeleteModalOpen}
            id={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
