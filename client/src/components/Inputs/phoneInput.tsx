import PhoneInputComponent from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Importa o estilo da biblioteca
import { Input } from "../ui/input";

interface PhoneInputProps {
  value?: string;
  onChange: (value?: string) => void; // Ajusta o tipo de onChange para corresponder ao esperado
}

export function PhoneInput({ value = "", onChange }: PhoneInputProps) {
  const handlePhoneChange = (value: string | undefined): void => {
    // A função `onChange` agora recebe um valor no formato E.164
    onChange(value); 
  };

  return (
    <PhoneInputComponent
      defaultCountry="BR"
      inputComponent={Input}
      value={value}
      onChange={handlePhoneChange} // Passa a função de manipulação
    />
  );
}
