import { Button } from '@/_components/ui/button';
import { Card } from '@/_components/ui/card';
import { TabsList, TabsTrigger } from '@/_components/ui/tabs';

export function ProductSummary() {
  const resumo = [
    { label: 'Total de Produtos', valor: '6' },
    { label: 'Subtotal', valor: 'R$ 300,00' },
    { label: 'Total de Descontos', valor: 'R$ 15,00' },
    { label: 'Total Geral', valor: 'R$ 285', destaque: true },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {resumo.map((item, index) => (
        <Card
          key={index}
          className={`p-4 rounded-lg ${
            item.destaque && 'bg-transparent border font-bold row-span-2'
          }`}
        >
          <p className={`${item.destaque ? 'text-2xl mb-2' : 'text-sm'}`}>
            {item.label}
          </p>
          <p
            className={`${item.destaque ? 'text-3xl text-green-500' : 'text-sm'}`}
          >
            {item.valor}
          </p>
        </Card>
      ))}
      <TabsList asChild>
        <TabsTrigger value="client" asChild>
          <Button className="disabled:cursor-not-allowed disabled:opacity-70 bg-green-500 text-background col-span-1 font-bold hover:bg-green-600">
            Continuar
          </Button>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
