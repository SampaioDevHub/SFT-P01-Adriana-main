import PhoneInputComponent from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Importa o estilo da biblioteca
type CountryCode = 'BR' | 'US'; // TODO pensar numa forma de passar dinamicamente todos os CountryCode
import { Input } from '../ui/input';

interface PhoneInputProps {
    value?: string;
    onChange: (value?: string) => void; // Ajusta o tipo de onChange para corresponder ao esperado
    defaultCountry?: CountryCode; // para poder validar se algum numero de outro pais sera usado
    international?: boolean; // também para validação de numero internacional
}

export function PhoneInput({
    value = '',
    onChange,
    defaultCountry = 'BR',
    international = false,
}: PhoneInputProps) {
    const handlePhoneChange = (value: string | undefined): void => {
        // A função `onChange` agora recebe um valor no formato E.164
        onChange(value);
    };

    return (
        <PhoneInputComponent
            defaultCountry={defaultCountry as CountryCode}
            international={international}
            inputComponent={Input}
            value={value}
            onChange={handlePhoneChange} // Passa a função de manipulação
        />
    );
}
