/* eslint-disable-next-line react/no-unescaped-entities */
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { format } from 'date-fns';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSaleById } from '@/_api/sales/get-sale-by-id';
import { formatForReals } from '@/_utils/formatForReals';

import { paymentLabels } from '../_constants/paymentMethod';
import { formatUTCToBRDate } from '@/_utils/formatUTCToBRDate';

interface ModalProps {
  title: string;
  subTitle: string;
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function OverviewModal({ id, title, subTitle, setIsOpen }: ModalProps) {
  const { data: sale, isPending } = useQuery({
    queryKey: ['sale', id],
    queryFn: () => getSaleById({ saleId: id }),
  });

  let totalDiscount = 0;
  let priceWithDiscont = 0;
  let totalRate = 0;

  if (sale?.discountPercentage) {
    totalDiscount = (sale.subtotal * sale.discountPercentage) / 100;

    priceWithDiscont =
      sale.subtotal - (sale.subtotal * sale.discountPercentage) / 100;
  }

  if (sale?.rateAmount && sale.discountPercentage) {
    totalRate =
      ((sale.subtotal - (sale.subtotal * sale.discountPercentage) / 100) /
        100) *
      sale.rateAmount;
  }
  if (sale?.rateAmount && sale.discountPercentage === 0) {
    totalRate = (sale.subtotal / 100) * sale.rateAmount;
  }

  return (
    <DialogContent className="max-h-[90vh] w-full overflow-auto ">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <p className="py-2">{subTitle}</p>
      </DialogHeader>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex flex-col items-center bg-muted/40 rounded-md justify-between w-full">
          <div className="w-full max-h-[30vh] overflow-auto">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-2.5 rounded-sm">
                <span className="text-muted-foreground">CPF</span>
                <span>{sale?.customerCpf}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-2.5 rounded-sm">
                <span className="text-muted-foreground">
                  Método de Pagamento
                </span>
                <span>{paymentLabels[sale?.paymentMethod ?? '']}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-2.5 rounded-sm">
                <span className="text-muted-foreground">Total de Produtos</span>
                <span>{sale?.totalItems}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-2.5 rounded-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatForReals(sale?.subtotal ?? 0)}</span>
              </div>
            </div>
            {totalDiscount > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">
                    Total de Descontos
                  </span>
                  <span>{formatForReals(totalDiscount)}</span>
                </div>
              </div>
            )}
            {totalRate > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">Taxas</span>
                  <span>{formatForReals(totalRate)}</span>
                </div>
              </div>
            )}
            {sale?.numberInstallments ? (
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">Parcelas</span>
                  <span>{sale?.numberInstallments}</span>
                </div>
              </div>
            ) : (
              ''
            )}
            {sale?.endDate && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">
                    Data de finalização
                  </span>
                  <span>{formatUTCToBRDate(sale?.endDate)}</span>
                </div>
              </div>
            )}
          </div>
          {sale?.subtotal && (
            <div className="flex items-center justify-between w-full p-4 bg-muted rounded-md">
              <h2 className="text-sm">Valor Total</h2>
              <h1 className="text-green-500 text-lg">
                {formatForReals(sale.subtotal - totalDiscount + totalRate)}
              </h1>
            </div>
          )}
        </div>
        <div className="max-h-[50vh] w-full overflow-auto rounded-md border-t border-b border-muted">
          <Table>
            <TableHeader className="border-b-2">
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sale?.products.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="w-1/3">{product.name}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell className="w-1/3">
                      {' '}
                      {Number(product.priceWithDiscount) > 0 ? (
                        <div className="space-x-1 flex flex-wrap">
                          <span
                            style={{ textDecoration: 'line-through' }}
                            className="text-xs text-muted-foreground className='whitespace-nowrap'"
                          >
                            {formatForReals(product.totalPrice)}
                          </span>
                          <span className="whitespace-nowrap">
                            {formatForReals(Number(product.priceWithDiscount))}
                          </span>
                        </div>
                      ) : (
                        <p>{formatForReals(product.totalPrice)}</p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </DialogContent>
  );
}
