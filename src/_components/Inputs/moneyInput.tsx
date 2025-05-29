import { ChangeEvent } from 'react';
import { Input, InputProps } from '@/_components/ui/input';

interface MoneyInputProps extends InputProps {
  valueInCents: string; // Valor controlado pelo Controller
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Manipulador de mudança
}

export function MoneyInput({ valueInCents, onChange, ...props }: MoneyInputProps) {
  // Função para formatar o valor como moeda
  const formatValue = (valor: string): string => {
    const onlyDigits = valor.replace(/\D/g, ''); // Remove tudo que não for número

    if (!onlyDigits) return ''; // Retorna uma string vazia se não houver números

    const digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2);

    return maskCurrency(digitsFloat);
  };

  // Função de formatação da moeda
  const maskCurrency = (
    valor: string,
    locale = 'pt-BR',
    currency = 'BRL'
  ): string => {
    const numValue = Number(valor);
    if (isNaN(numValue)) return 'R$ 0,00'; // Retorna um valor padrão se for NaN

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(numValue);
  };

  // Função chamada ao mudar o valor no input
  const mascaraMoeda = (event: ChangeEvent<HTMLInputElement>): void => {
    const onlyDigits = event.target.value
      .replace(/\D/g, '') // Remove tudo que não for número
      .padStart(3, '0'); // Adiciona zeros à esquerda para evitar valores inválidos

    const digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2);

    // Chama a função onChange passada via props para atualizar o valor controlado
    onChange({
      target: { value: digitsFloat },
    } as ChangeEvent<HTMLInputElement>);
  };

  // Formata o valor quando ele é alterado e exibido
  const formattedValue = formatValue(valueInCents);

  return (
    <Input
      {...props}
      id="valor"
      value={formattedValue} // Exibe o valor formatado
      onChange={mascaraMoeda} // Chama a função que formata o valor enquanto o usuário digita
    />
  );
}
