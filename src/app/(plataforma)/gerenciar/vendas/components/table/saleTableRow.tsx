import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';
import { formatForReals } from '@/_utils/formatForReals';

import { DeleteModal } from '../deleteModal';
import { OverviewModal } from '../overviewModal';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/_components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/_components/ui/tooltip';
import { DialogClose } from '@radix-ui/react-dialog';

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
              className="text-xs text-muted-foreground whitespace-nowrap"
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
              open={isOverviewModalOpen}
              onOpenChange={setIsOverviewModalOpen}
            >
              <DialogClose asChild />
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
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
                title="Excluir Venda"
                subTitle={`Tem certeza que deseja excluir a venda de id: ${id}`}
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
