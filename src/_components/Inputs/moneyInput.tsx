import { Input } from "@/_components/ui/input"; // ShadCN input
import { ChangeEvent } from "react";

interface MoneyInputProps {
  value: string; // valor em centavos, como string (ex: "1234" = R$ 12,34)
  onChange: (value: string) => void;
}

export function MoneyInput({ value, onChange }: MoneyInputProps) {
  const formatCurrency = (valor: string): string => {
    const cleaned = valor.replace(/\D/g, "");
    if (!cleaned) return "R$ 0,00";

    const padded = cleaned.padStart(3, "0");
    const reais = padded.slice(0, -2);
    const centavos = padded.slice(-2);
    const number = Number(`${reais}.${centavos}`);

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (raw.length === 0) {
      onChange("0"); // caso apague tudo
      return;
    }

    // Previne a inserção de mais que 2 dígitos no final (centavos)
    if (raw.length > 2) {
      const integerPart = raw.slice(0, -2); // Parte inteira
      const decimalPart = raw.slice(-2); // Parte decimal
      const formattedValue = integerPart + decimalPart;
      onChange(formattedValue); // Valor sem formatação, mas em centavos
    } else {
      onChange(raw); // Apenas os centavos se o valor for pequeno
    }
  };

  return (
    <Input
      value={formatCurrency(value)}
      onChange={handleChange}
      inputMode="numeric"
    />
  );
}
