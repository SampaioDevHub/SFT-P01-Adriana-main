import { ChangeEvent } from 'react';

import { Input, InputProps } from '../ui/input';

interface CpfInputProps extends InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function CpfInput({ value, onChange, ...props }: CpfInputProps) {
  const formatCpf = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(event.target.value);
    onChange({
      target: { value: formattedCpf },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <Input
      {...props}
      maxLength={14}
      type="text"
      required
      value={value || ''} // Garante que value nunca seja undefined
      onChange={handleChange}
    />
  );
}