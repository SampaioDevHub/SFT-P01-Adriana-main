import { render, screen, fireEvent } from '@testing-library/react';
import { CepInput } from '../cepInput';

describe('Cep Input Tests', () => {
  const onChange_mock = jest.fn();
  beforeEach(() => {
    onChange_mock.mockClear();
  });

  it('should render the input ', () => {
    // renderizo o input
    render(<CepInput onChange={onChange_mock} value="" />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
  it('should type on the input and format the value', () => {
    // renderizo o input
    render(<CepInput onChange={onChange_mock} value="" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    // simula a digitação de um cep (sem formatação) no input
    fireEvent.change(input, { target: { value: '99999999' } });

    // verifica se onChange() foi chamada e se formatou o input
    expect(onChange_mock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '99999-999',
        }),
      })
    );

    // renderiza novamente
    render(<CepInput onChange={onChange_mock} value="99999-999" />);

    // outra renderização do input porem com o cep digitado formatado
    const inputFormatted = screen.getByDisplayValue(
      '99999-999'
    ) as HTMLInputElement;

    //verificando se exibe o cep formatado
    expect(inputFormatted.value).toBe('99999-999');
  });
});
