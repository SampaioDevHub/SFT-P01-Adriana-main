import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';
import { DeleteModal } from '../deleteModal';

import { EditSaleModalContent } from '../editSaleModalContent';

export function SaleTableRow({ id, endDate }: GetSaleContent) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{endDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell>{endDate}</TableCell>
      <TableCell className="w-[10rem]">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              Editar
            </Button>
          </DialogTrigger>
          <EditSaleModalContent
            setIsOpen={setIsEditModalOpen}
            open={isEditModalOpen}
            saleId={id}
          />
        </Dialog>
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Excluir
            </Button>
          </DialogTrigger>
          <DeleteModal
            title="Excluir Venda"
            subTitle={`Tem certeza que deseja excluir a venda de id: ${id}`}
            setIsOpen={setIsDeleteModalOpen}
            id={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
