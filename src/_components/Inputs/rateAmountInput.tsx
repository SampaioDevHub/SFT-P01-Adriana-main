import * as React from 'react'
import { Input } from '@/_components/ui/input'

interface PercentageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | undefined
  onChange: (value: number) => void // aqui obrigamos sempre number, nunca undefined
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const [displayValue, setDisplayValue] = React.useState('0.0%')

  // Sincroniza o display com o valor do form
  React.useEffect(() => {
    if (value === undefined || isNaN(value)) {
      setDisplayValue('0.0%')
      onChange(0)
    } else {
      setDisplayValue(`${value.toFixed(1)}%`)
    }
  }, [value, onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pega só os números
    const raw = e.target.value.replace(/\D/g, '')

    if (raw === '') {
      // Não permite apagar completamente, mantém 0.0%
      setDisplayValue('0.0%')
      onChange(0)
      return
    }

    // Transforma para decimal (ex: 44 => 4.4)
    const numeric = Number(raw) / 10
    setDisplayValue(e.target.value)
    onChange(numeric)
  }

  const handleFocus = () => {
    if (value === undefined || isNaN(value)) {
      setDisplayValue('0')
    } else {
      setDisplayValue((value * 10).toFixed(0))
    }
  }

  const handleBlur = () => {
    let numeric = Number(displayValue.replace(/\D/g, '')) / 10
    if (isNaN(numeric)) numeric = 0
    setDisplayValue(`${numeric.toFixed(1)}%`)
    onChange(numeric)
  }

  return (
    <Input
      {...rest}
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="0.0%"
    />
  )
}
