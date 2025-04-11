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
import { Button } from '@/_components/ui/button';
import { TabsList, TabsTrigger } from '@/_components/ui/tabs';

const sale = {
  cpf: '040.808.701-32',
  paymentMethod: 'PIX',
  totalProducts: 6,
  subtotal: 300,
  totalDiscounts: 15,
  grandTotal: 285,
  products: [
    {
      name: 'Camisa Polo',
      amount: 2,
    },
    {
      name: 'Calça Jeans',
      amount: 1,
    },
    {
      name: 'Jaqueta Corta-Vento',
      amount: 3,
    },
    {
      name: 'Vestido Floral',
      amount: 1,
    },
    {
      name: 'Saia Jeans',
      amount: 2,
    },
    {
      name: 'Camiseta Estampada',
      amount: 4,
    },
    {
      name: 'Short Moletom',
      amount: 2,
    },
    {
      name: 'Blusa de Frio',
      amount: 1,
    },
    {
      name: 'Macacão Feminino',
      amount: 1,
    },
    {
      name: 'Regata Básica',
      amount: 5,
    },
  ]
};

export function Overview() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
        <CardDescription>Detalhes da venda</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className="grid grid-cols-[60%_40%] gap-4">
          <div className="flex flex-col items-center bg-muted/40 rounded-md justify-between w-full">
            <div className="w-full">
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 rounded-sm">
                  <span className="text-muted-foreground">CPF</span>
                  <span>{sale.cpf}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 rounded-sm">
                  <span className="text-muted-foreground">
                    Método de Pagamento
                  </span>
                  <span>{sale.paymentMethod}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 rounded-sm">
                  <span className="text-muted-foreground">
                    Total de Produtos
                  </span>
                  <span>{sale.totalProducts}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 rounded-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{sale.subtotal}</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between p-2 rounded-sm">
                  <span className="text-muted-foreground">
                    Total de Descontos
                  </span>
                  <span>{sale.totalDiscounts}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full p-4 bg-muted rounded-md">
              <h2 className="text-sm">Valor Total</h2>
              <h1 className="text-green-500 text-lg">{sale.grandTotal}</h1>
            </div>
          </div>
          <div className="max-h-[30vh] overflow-auto rounded-md border-t border-b border-muted">
            <Table>
              <TableHeader className="border-b-2">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.products.map((product) => {
                  return (
                    <TableRow key={product.name}>
                      <TableCell className="w-[80%]">{product.name}</TableCell>
                      <TableCell className="text-center">
                        {product.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <TabsList asChild className='bg-transparent'>
          <TabsTrigger value="client" asChild>
            <Button variant="outline" className="h-9 px-4 py-2 mr-2">
              Voltar
            </Button>
          </TabsTrigger>
        </TabsList>
        <Button className="bg-green-500 text-background col-span-1 font-bold hover:bg-green-600">
          Finalizar
        </Button>
      </CardContent>
    </Card>
  );
}
