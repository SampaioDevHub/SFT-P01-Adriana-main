import PhoneInputComponent from 'react-phone-number-input';

import { Input, InputProps } from '../ui/input';

import 'react-phone-number-input/style.css';

interface PhoneInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange: (value?: string) => void;
}

export function PhoneInput({
  value = '',
  onChange,
  ...props
}: PhoneInputProps) {
  const handlePhoneChange = (value: string | undefined): void => {
    onChange(value);
  };

  return (
    <PhoneInputComponent
      {...props}
      limitMaxLength
      defaultCountry="BR"
      international={false}
      displayInitialValueAsLocalNumber={true}
      inputComponent={Input}
      value={value}
      onChange={handlePhoneChange}
    />
  );
}
