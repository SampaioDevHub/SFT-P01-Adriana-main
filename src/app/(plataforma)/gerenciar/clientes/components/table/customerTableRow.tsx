import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog } from '@/_components/ui/dialog';
import { GetCustomerContent } from '@/_api/customers/_types/type-get-custumer';

import { DeleteModal } from '../deleteModal';
import { EditCustomerModalContent } from '../editCustomerModalContent';

import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/_components/ui/dropdown-menu';

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
    return phoneNumber && phoneNumber.isValid()
      ? phoneNumber.formatInternational()
      : phone;
  };

  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{cpf}</TableCell>
      <TableCell>{formatPhoneNumber(phone)}</TableCell>
      <TableCell>{addressData?.zipCode}</TableCell>
      <TableCell>{addressData?.city}</TableCell>
      <TableCell>{addressData?.state}</TableCell>
     <TableCell className="w-4">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-36">
      <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => setIsDeleteModalOpen(true)}
        className="w-full justify-start text-destructive focus:text-destructive"
      >
        Excluir
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Modais fora do menu */}
  <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
    <EditCustomerModalContent
      setIsOpen={setIsEditModalOpen}
      open={isEditModalOpen}
      customerId={id}
    />
  </Dialog>

  <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
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
