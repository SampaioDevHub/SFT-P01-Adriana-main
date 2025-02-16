import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TableRow, TableCell } from '@/_components/ui/table';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';
import { GetProductContent } from '@/_api/products/_types/type-get-product';

import { DeleteProductModal } from './deleteProductModal';
import { EditProductModalContent } from './editProductModalContent';

export function ProductTableRow({
  id,
  name,
  amount,
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
              R$ {price.toString().replace('.', ',')}
            </span>
            <span className='whitespace-nowrap'>R$ {priceWithDiscount.toString().replace('.', ',')}</span>
          </div>
        ) : (
          <p>R$ {price.toString().replace('.', ',')}</p>
        )}
      </TableCell>
      <TableCell className='md:text-left text-center flex-1'>{amount}</TableCell>
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
          <DeleteProductModal
            setIsOpen={setIsDeleteModalOpen}
            open={isDeleteModalOpen}
            productId={id}
          />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
