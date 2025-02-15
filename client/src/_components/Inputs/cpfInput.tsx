import { ChangeEvent } from 'react';
import { Input } from '../ui/input';

interface CpfInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function CpfInput({ value, onChange }: CpfInputProps) {
  const formatCpf = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(event.target.value);
    onChange({ target: { value: formattedCpf } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <Input
      type="text"
      value={value || ''}  // Garante que value nunca seja undefined
      onChange={handleChange}
    />
  );
}
