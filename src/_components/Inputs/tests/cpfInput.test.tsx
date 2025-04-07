import { render, screen, fireEvent } from '@testing-library/react';
import { CpfInput } from '../cpfInput';

describe('CPF Input Tests', () => {
    // mock da função onChange()
    const onChange_mock = jest.fn();
    beforeEach(() => {
        onChange_mock.mockClear();
    });

    it('should render the input ', () => {
        // renderizo o input
        const wrapper = render(<CpfInput onChange={onChange_mock} value="" />);

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // verifica se  o input esta sendo renderizado corretamente
        expect(input).toBeInTheDocument();
    });

    it('should type on the input and verify if the format function is called and if the value was really formatted', () => {
        // renderiza o input
        const wrapper = render(<CpfInput onChange={onChange_mock} value="" />);

        // busca  o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação de um cpf (sem formatação) no input
        fireEvent.change(input, { target: { value: '12345678909' } });

        // verifica se onChange() foi chamada e se formatou o input
        expect(onChange_mock).toHaveBeenCalledWith(
            // espera que o valor no  retorno seja o cpf formatado
            expect.objectContaining({
                target: expect.objectContaining({
                    value: '123.456.789-09',
                }),
            })
        );

        // renderiza novamente o input
        wrapper.rerender(
            <CpfInput onChange={onChange_mock} value="123.456.789-09" />
        );

        // outra renderização do input porem com o cpf digitado formatado
        const inputFormatted = screen.getByDisplayValue(
            '123.456.789-09'
        ) as HTMLInputElement;

        //verificando se exibe o cpf formatado
        expect(inputFormatted.value).toBe('123.456.789-09');
    });
});
