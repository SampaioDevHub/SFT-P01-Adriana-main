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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';

const sale = {
  cpf: '040.808.701-32',
  paymentMethod: 'PIX',
  totalProducts: 6,
  subtotal: 300,
  totalDiscounts: 15,
  grandTotal: 285,
  products: [
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
    {
      name: 'Calça',
      code: 'jhasjdshdksjdh',
      amount: 1,
    },
  ],
};

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
        <CardDescription>Detalhes da venda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-2 bg-background rounded-sm">
                <span className='text-muted-foreground'>CPF</span>
                <span>{sale.cpf}</span>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-2 bg-background rounded-sm">
                <span className='text-muted-foreground'>Método de Pagamento</span>
                <span>{sale.paymentMethod}</span>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-2 bg-background rounded-sm">
                <span className='text-muted-foreground'>Total de Produtos</span>
                <span>{sale.totalProducts}</span>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-2 bg-background rounded-sm">
                <span className='text-muted-foreground'>Subtotal</span>
                <span>{sale.subtotal}</span>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between p-2 bg-background rounded-sm">
                <span className='text-muted-foreground'>Total de Descontos</span>
                <span>{sale.totalDiscounts}</span>
            </div>
        </div>
        <Table className="">
          <TableHeader className='border-b-2'>
            <TableRow className="hover:bg-background">
              <TableHead>Nome</TableHead>
              <TableHead className='w-[40%]'>Código</TableHead>
              <TableHead>Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sale.products.map((product) => {
              return (
                <TableRow className="hover:bg-background">
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter className='bg-muted'>
            <TableRow>
                <TableCell className='text-center'>
                <h2 className='text-sm'>Valor Total</h2>
                </TableCell>
                <TableCell></TableCell>
                <TableCell className='text-center'>
                <h1 className='text-green-500 text-lg'>{sale.grandTotal}</h1>
                </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
