import { render, screen, fireEvent } from '@testing-library/react';
import { CpfInput } from '../cpfInput';

describe('CPF Input Tests', () => {
  const onChange_mock = jest.fn();
  beforeEach(() => {
    onChange_mock.mockClear();
  });

  it('should render the input ', () => {
    // renderizo o input
    render(<CpfInput onChange={onChange_mock} value="" />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should type the cpf on input', () => {
    // renderizo o input
    render(<CpfInput onChange={onChange_mock} value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12345678909' } });

    expect(onChange_mock).toHaveBeenCalled();
  });

  it('should type on the input and format the value', () => {
    // renderizo o input
    render(<CpfInput onChange={onChange_mock} value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    // simula a digitação de um cep (sem formatação) no input
    fireEvent.change(input, { target: { value: '12345678909' } });

    // verifica se onChange() foi chamada e se formatou o input
    expect(onChange_mock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '123.456.789-09',
        }),
      })
    );

    // renderiza novamente
    render(<CpfInput onChange={onChange_mock} value="123.456.789-09" />);

    // outra renderização do input porem com o cep digitado formatado
    const inputFormatted = screen.getByDisplayValue(
      '123.456.789-09'
    ) as HTMLInputElement;

    //verificando se exibe o cep formatado
    expect(inputFormatted.value).toBe('123.456.789-09');
  });
});
