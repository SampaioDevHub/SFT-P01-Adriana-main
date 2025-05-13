import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';
import { formatForReals } from '@/_utils/formatForReals';

import { DeleteModal } from '../deleteModal';
import { OverviewModal } from '../overviewModal';

export function SaleTableRow({
  id,
  customerCpf,
  totalItems,
  totalPrice,
  subtotal,
  discountPercentage,
  status,
}: GetSaleContent) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOverviewModalOpen, setIsOverviewModalOpen] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{customerCpf}</TableCell>
      <TableCell>{totalItems}</TableCell>
      <TableCell>
        {discountPercentage ? (
          <div className="space-x-1 flex flex-wrap">
            <span
              style={{ textDecoration: 'line-through' }}
              className="text-xs text-muted-foreground className='whitespace-nowrap'"
            >
              {formatForReals(subtotal)}
            </span>
            <span className="whitespace-nowrap">
              {formatForReals(totalPrice)}
            </span>
          </div>
        ) : (
          <p>{formatForReals(totalPrice)}</p>
        )}
      </TableCell>
      <TableCell>
        {status === 'FINALIZADO'
          ? 'Finalizado'
          : status === 'PENDENTE' && 'Pendente'}
      </TableCell>
      <TableCell className="flex w-[11rem]">
      <Dialog open={isOverviewModalOpen} onOpenChange={setIsOverviewModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              Visualizar
            </Button>
          </DialogTrigger>
          <OverviewModal
            title="Visualizar Venda"
            subTitle="Visualize os detalhes da sua venda"
            setIsOpen={setIsOverviewModalOpen}
            id={id}
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
