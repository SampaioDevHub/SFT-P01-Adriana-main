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
import { MoreVertical } from 'lucide-react'; // Importando o ícone
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetProductContent } from '@/_api/products/_types/type-get-product';
import { formatForReals } from '@/_utils/formatForReals';

import { DeleteModal } from '../deleteModal';
import { EditProductModalContent } from '../editProductModalContent';

export function ProductTableRow({
  id,
  name,
  quantityInStock,
  category,
  subCategory,
  price,
  discountPercentage,
  priceWithDiscount,
  size,
}: GetProductContent) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{subCategory}</TableCell>
      <TableCell>
        {discountPercentage && priceWithDiscount ? (
          <div className="space-x-1 flex flex-wrap">
            <span
              style={{ textDecoration: 'line-through' }}
              className="text-xs text-muted-foreground whitespace-nowrap"
            >
              {formatForReals(price)}
            </span>
            <span className="whitespace-nowrap">
              {formatForReals(priceWithDiscount)}
            </span>
          </div>
        ) : (
          <p>{formatForReals(price)}</p>
        )}
      </TableCell>
      <TableCell className="md:text-left text-center flex-1">
        {quantityInStock}
      </TableCell>
      <TableCell>{size}</TableCell>

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
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Editar
                </Button>
              </DialogTrigger>
              <EditProductModalContent
                setIsOpen={setIsEditModalOpen}
                open={isEditModalOpen}
                productId={id}
              />
            </Dialog>

            <Dialog
              open={isDeleteModalOpen}
              onOpenChange={setIsDeleteModalOpen}
            >
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="w-full">
                  Excluir
                </Button>
              </DialogTrigger>
              <DeleteModal
                title="Excluir Produto"
                subTitle={`Tem certeza que deseja excluir o produto: ${name}?`}
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
