import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { AxiosError } from 'axios';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { TabsList, TabsTrigger } from '@/_components/ui/tabs';
import { useSale } from '@/_components/providers/saleContext';
import { AlertError } from '@/_components/alert/alert-error';
import { paymentLabels } from '../../_constants/paymentMethod';

export function Overview() {
  const {
    productData,
    informationData,
    handlecreateSale,
    isCreatingSale,
    setActiveTab,
    resetSaleData,
  } = useSale();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function formatForReals(valor: number) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  async function handleCreateSale() {
    try {
      await handlecreateSale();
      resetSaleData();
      setActiveTab('product');
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.data) {
        const errorData = err.response.data as { errors?: string[] };
        const errorMessage =
          errorData.errors?.[0] || 'Erro desconhecido do servidor';

        setErrorMessage(errorMessage);
      }
    }
  }
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
        <CardDescription>Detalhes da venda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid lg:grid-cols-[65%_35%] gap-4">
          <div className="flex flex-col items-center bg-muted/40 rounded-md justify-between w-full">
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">CPF</span>
                  <span>{informationData.customerCpf}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">
                    Método de Pagamento
                  </span>
                  <span>
                    {paymentLabels[informationData.paymentMethod]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">
                    Total de Produtos
                  </span>
                  <span>{productData.totalItems}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatForReals(productData.subtotal)}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2.5 rounded-sm">
                  <span className="text-muted-foreground">
                    Total de Descontos
                  </span>
                  <span>
                    {informationData.discountPercentage
                      ? formatForReals(
                          (productData.subtotal *
                            informationData.discountPercentage) /
                            100
                        )
                      : 'não teve desconto'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full p-4 bg-muted rounded-md">
              <h2 className="text-sm">Valor Total</h2>
              {informationData.discountPercentage ? (
                <div className="space-x-1 flex flex-wrap">
                  <span
                    style={{ textDecoration: 'line-through' }}
                    className="text-xs text-muted-foreground className='whitespace-nowrap'"
                  >
                    {formatForReals(productData.subtotal)}
                  </span>
                  <h1 className="text-green-500 text-lg">
                    {informationData.discountPercentage
                      ? formatForReals(
                          productData.subtotal -
                            (productData.subtotal *
                              informationData.discountPercentage) /
                              100
                        )
                      : productData.subtotal}
                  </h1>
                </div>
              ) : (
                <h1 className="text-green-500 text-lg">
                  {formatForReals(informationData.totalPrice)}
                </h1>
              )}
            </div>
          </div>
          <div className="max-h-[30vh] overflow-auto rounded-md border-t border-b border-muted">
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productData.products.map((product, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className='w-1/3'>{product.name}</TableCell>
                      <TableCell>
                        {product.amount}
                      </TableCell>
                      <TableCell className='w-1/3'>
                        {' '}
                        {product.priceWithDiscount ? (
                          <div className="space-x-1 flex flex-wrap">
                            <span
                              style={{ textDecoration: 'line-through' }}
                              className="text-xs text-muted-foreground className='whitespace-nowrap'"
                            >
                              {formatForReals(product.totalPrice)}
                            </span>
                            <span className="whitespace-nowrap">
                              {formatForReals(
                                Number(product.priceWithDiscount)
                              )}
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
        <TabsList asChild className="bg-transparent">
          <TabsTrigger value="client" asChild>
            <Button variant="outline" className="h-9 px-4 py-2 mr-2">
              Voltar
            </Button>
          </TabsTrigger>
        </TabsList>
        {errorMessage && (
          <AlertError
            title="Ops, parece que temos um erro!"
            errorMessage={errorMessage}
          />
        )}
        <Button
          onClick={handleCreateSale}
          disabled={isCreatingSale}
          className="disabled:cursor-not-allowed disabled:opacity-70 bg-green-500 text-background col-span-1 font-bold hover:bg-green-600"
        >
          Finalizar
        </Button>
      </CardContent>
    </Card>
  );
}
