import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetCustomerContent } from '@/_api/customers/_types/type-get-custumer';
import { DialogClose } from '@radix-ui/react-dialog';

import { DeleteModal } from '../deleteModal';
import { EditCustomerModalContent } from '../editCustomerModalContent';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/_components/ui/tooltip';
import { MoreVertical } from 'lucide-react';

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
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-background/75">
              <p>Ações</p>
            </TooltipContent>
          </Tooltip>

          <PopoverContent className="flex flex-col gap-2 w-32">
            <Dialog
              open={isEditModalOpen}
              onOpenChange={setIsEditModalOpen}
            >
              <DialogClose asChild />
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Editar
                </Button>
              </DialogTrigger>
              <EditCustomerModalContent
                setIsOpen={setIsEditModalOpen}
                open={isEditModalOpen}
                customerId={id}
              />
            </Dialog>

            <Dialog
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                >
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
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
