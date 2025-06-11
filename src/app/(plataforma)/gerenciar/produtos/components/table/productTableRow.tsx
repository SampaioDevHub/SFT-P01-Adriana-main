import { MoreHorizontal } from 'lucide-react'; // Importando o ícone
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog } from '@/_components/ui/dialog';
import { GetProductContent } from '@/_api/products/_types/type-get-product';
import { formatForReals } from '@/_utils/formatForReals';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';

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
            <DropdownMenuItem className="w-full justify-start text-destructive focus:text-destructive" onClick={() => setIsDeleteModalOpen(true)}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modais fora do menu */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <EditProductModalContent
            setIsOpen={setIsEditModalOpen}
            open={isEditModalOpen}
            productId={id}
          />
        </Dialog>

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DeleteModal
            title="Excluir Produto"
            subTitle={`Tem certeza que deseja excluir o produto: ${name}?`}
            setIsOpen={setIsDeleteModalOpen}
            id={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
