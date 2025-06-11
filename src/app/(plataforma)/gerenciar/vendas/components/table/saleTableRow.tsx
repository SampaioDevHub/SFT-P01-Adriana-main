import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog } from '@/_components/ui/dialog';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';
import { formatForReals } from '@/_utils/formatForReals';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';

import { DeleteModal } from '../deleteModal';
import { OverviewModal } from '../overviewModal';
// Importe o modal de emissão
import { PreviewNotaModal } from '../previewNotaModal';

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
  const [isEmitirNotaModalOpen, setIsEmitirNotaModalOpen] = useState(false); // novo estado

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setIsOverviewModalOpen(true)}>
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEmitirNotaModalOpen(true)}>
              Nota
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full justify-start text-destructive focus:text-destructive"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modais */}
        <Dialog open={isOverviewModalOpen} onOpenChange={setIsOverviewModalOpen}>
          <OverviewModal
            title="Visualizar Venda"
            subTitle="Visualize os detalhes da sua venda"
            setIsOpen={setIsOverviewModalOpen}
            id={id}
          />
        </Dialog>

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DeleteModal
            title="Excluir Venda"
            subTitle={`Tem certeza que deseja excluir a venda de id: ${id}`}
            setIsOpen={setIsDeleteModalOpen}
            id={id}
          />
        </Dialog>

        <Dialog open={isEmitirNotaModalOpen} onOpenChange={setIsEmitirNotaModalOpen}>
          <PreviewNotaModal
            setIsOpen={setIsEmitirNotaModalOpen}
            id={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
