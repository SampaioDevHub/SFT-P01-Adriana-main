import { ChangeEvent } from 'react';
import { Input } from '../ui/input';

interface CepInputProps {
  value?: string; // Agora aceita string | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function CepInput({ value = '', onChange }: CepInputProps) {
  // Função para formatar o CEP no padrão 99999-999
  const formatCep = (cep: string) => {
    return cep
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/^(\d{5})(\d)/, '$1-$2') // Adiciona o traço
      .slice(0, 9); // Garante que o CEP tenha no máximo 9 caracteres
  };

  // Manipulador de mudança
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(event.target.value);
    onChange({
      target: { value: formattedCep },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <Input
      type="text"
      value={value} // Agora `value` nunca será undefined
      onChange={handleChange}
    />
  );
}
