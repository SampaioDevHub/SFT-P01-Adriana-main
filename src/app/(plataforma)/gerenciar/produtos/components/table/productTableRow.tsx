import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetProductContent } from '@/_api/products/_types/type-get-product';
import { DeleteModal } from '../deleteModal';

import { EditProductModalContent } from '../editProductModalContent';
import { formatForReals } from '@/_utils/formatForReals';

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
              className="text-xs text-muted-foreground className='whitespace-nowrap'"
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
      <TableCell className="w-[10rem]">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              Editar
            </Button>
          </DialogTrigger>
          <EditProductModalContent
            setIsOpen={setIsEditModalOpen}
            open={isEditModalOpen}
            productId={id}
          />
        </Dialog>
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
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
      </TableCell>
    </TableRow>
  );
}
