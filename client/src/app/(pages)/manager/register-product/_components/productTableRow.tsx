import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { GetProductContent } from '@/api/products/types/type-get-product';

import DeleteProductModal from './deleteProductModal';
import { EditProductModalContent } from './editProductModalContent';

export function ProductTableRow({
  id,
  name,
  amount,
  category,
  subCategory,
  price,
  priceWithDiscount,
  size
}: GetProductContent) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{subCategory}</TableCell>
      <TableCell>
        {priceWithDiscount ? (
          <div className='space-x-1'>
            <span style={{textDecoration: "line-through"}} className='text-xs text-muted-foreground'>
              R$ {price}
            </span>
            <span>R$ {priceWithDiscount.toString().replace(".", ",")}</span>
          </div>
        ) : (
          <p>R$ {price}</p>
        )}
      </TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{size}</TableCell>
      <TableCell className='w-[10rem]'>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='mr-2'>
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
            <Button variant='destructive' size='sm'>
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
