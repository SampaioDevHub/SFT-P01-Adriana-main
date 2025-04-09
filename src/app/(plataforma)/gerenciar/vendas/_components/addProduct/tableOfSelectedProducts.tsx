'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { DeleteSelectedProductModal } from './deleteSelectedProductModal';
import { Dialog, DialogTrigger } from '@/_components/ui/dialog';

export function TableOfSelectedProducts() {
  const [
    isDeleteSelectedProductModalOpen,
    setIsDeleteSelectedProductModalOpen,
  ] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className=" text-1xl">Produtos Selecionados</h2>
      <div className="max-h-[40vh] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Desconto(%)</TableHead>
              <TableHead>Preço Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            <TableRow>
              <TableCell>Calça</TableCell>
              <TableCell>2</TableCell>
              <TableCell>10%</TableCell>
              <TableCell>R$ 100,00</TableCell>
              <TableCell className="w-[10rem]">
                <Dialog
                  open={isDeleteSelectedProductModalOpen}
                  onOpenChange={setIsDeleteSelectedProductModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="mr-2">
                      Remover
                    </Button>
                  </DialogTrigger>
                  <DeleteSelectedProductModal
                    setIsOpen={setIsDeleteSelectedProductModalOpen}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
