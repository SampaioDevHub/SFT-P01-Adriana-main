import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';

import { DeleteModal } from '../deleteModal';

export function SaleTableRow({
  id,
  customerCpf,
  totalItems,
  totalPrice,
  priceWithDiscount,
  discountPercentage,
  status,
}: GetSaleContent) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{customerCpf}</TableCell>
      <TableCell>{totalItems}</TableCell>
      <TableCell>
        {discountPercentage && priceWithDiscount ? (
          <div className="space-x-1 flex flex-wrap">
            <span
              style={{ textDecoration: 'line-through' }}
              className="text-xs text-muted-foreground className='whitespace-nowrap'"
            >
              R$ {totalPrice.toString().replace('.', ',')}
            </span>
            <span className="whitespace-nowrap">
              R$ {priceWithDiscount.toString().replace('.', ',')}
            </span>
          </div>
        ) : (
          <p>R$ {totalPrice.toString().replace('.', ',')}</p>
        )}
      </TableCell>
      <TableCell>
        {status === 'FINALIZADO'
          ? 'Finalizado'
          : status === 'PENDENTE' && 'Pendente'}
      </TableCell>
      <TableCell className="w-[5rem]">
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
