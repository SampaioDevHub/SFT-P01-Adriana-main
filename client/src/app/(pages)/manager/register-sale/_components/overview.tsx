import { Button } from "@/_components/ui/button";
import { Card } from "@/_components/ui/card";

export default function Overview() {
    const resumo = [
      { label: "Total de Produtos", valor: "6" },
      { label: "Subtotal", valor: "R$ 300,00" },
      { label: "Total de Descontos", valor: "R$ 15,00" },
      { label: "Total Geral", valor: "R$ 285", destaque: true },
    ];
  
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {resumo.map((item, index) => (
            <Card
              key={index}
              className={`p-4 rounded-lg ${
                item.destaque && "bg-green-500 text-black font-bold"
              }`}
            >
              <p className="text-sm">{item.label}</p>
              <p className="text-lg">{item.valor}</p>
            </Card>
          ))}
        </div>
        <Button className="bg-green-500 text-black w-full font-bold hover:bg-green-600">
          Finalizar Venda
        </Button>
      </div>
    );
  }
