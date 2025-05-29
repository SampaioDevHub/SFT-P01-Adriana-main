// components/CnpjInput.tsx
import { forwardRef, ChangeEvent } from 'react';
import { Input } from '@/_components/ui/input';
import { InputProps } from '@/_components/ui/input';

type CnpjInputProps = InputProps;

function formatCnpj(value: string): string {
  // Remove tudo que não for número
  value = value.replace(/\D/g, '');

  // Aplica a máscara: 99.999.999/9999-99
  if (value.length <= 2) {
    return value;
  } else if (value.length <= 5) {
    return value.replace(/^(\d{2})(\d+)/, '$1.$2');
  } else if (value.length <= 8) {
    return value.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
  } else if (value.length <= 12) {
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
  } else {
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5');
  }
}

export const CnpjInput = forwardRef<HTMLInputElement, CnpjInputProps>(({ onChange, ...rest }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedValue = formatCnpj(e.target.value);

    // Cria um novo evento com o valor formatado
    const event = {
      ...e,
      target: {
        ...e.target,
        value: maskedValue,
      },
    };

    onChange?.(event as ChangeEvent<HTMLInputElement>);
  };

  return <Input {...rest} onChange={handleChange} ref={ref} />;
});

CnpjInput.displayName = 'CnpjInput';
