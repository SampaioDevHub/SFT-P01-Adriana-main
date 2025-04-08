import { render, screen, fireEvent } from '@testing-library/react';
import { MoneyInput } from '../moneyInput';

describe('Money Input Tests', () => {
    // mock da função onChange()
    const onChange_mock = jest.fn();

    beforeEach(() => {
        onChange_mock.mockClear();
    });

    it('should render the input and the value ', () => {
        // renderiza o componente
        const wrapper = render(
            <MoneyInput onChange={onChange_mock} value="100.00" />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // verifica se o input está em tela
        expect(input).toBeInTheDocument();

        // regex para verificar se o valor formatado em R$ é renderizado
        expect(input.value.replace(/\u00A0/g, ' ')).toBe('R$ 100,00');
    });
    it('should type on the input with a value and verify if the onChange is called (the value must be formatted)', async () => {
        // valor do input inicia vazio
        let test_value = '';

        // renderiza o componente
        const wrapper = render(
            <MoneyInput
                onChange={(e) => {
                    test_value = e.target.value;
                }}
                value={test_value}
            />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação de um valor qualquer sem formatação
        // chama a função mascaraMoeda para que sempre os 2 últimos dígitos sejam centavos
        await fireEvent.change(input, { target: { value: '10000' } });

        // verifica se formata o valor
        expect(test_value).toBe('100.00');

        // renderiza novamente o componente com o novo value
        // função maskCurrency aqui formata para R$
        wrapper.rerender(
            <MoneyInput
                onChange={(e) => {
                    test_value = e.target.value;
                }}
                value={test_value}
            />
        );

        // busca novamente o input porém espera ter o valor formatado
        const updatedInput = screen.getByRole('textbox') as HTMLInputElement;

        // regex para verificar se realmente é exibido o valor formatado em R$
        /* 
        O regex /\u00A0/g substitui espaços não separáveis (non-breaking spaces) por espaços normais, garantindo que a formatação do valor seja comparada corretamente.
        */
        expect(updatedInput.value.replace(/\u00A0/g, ' ')).toBe('R$ 100,00');
    });
    it('should work with big numbers)', async () => {
        // valor do input inicia vazio
        let test_value = '';

        // renderiza o componente
        const wrapper = render(
            <MoneyInput
                onChange={(e) => {
                    test_value = e.target.value;
                }}
                value={test_value}
            />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação de um valor qualquer sem formatação
        // chama a função mascaraMoeda para que sempre os 2 últimos dígitos sejam centavos
        await fireEvent.change(input, { target: { value: '123456789' } });

        // verifica se formata o valor
        expect(test_value).toBe('1234567.89');

        // renderiza novamente o componente com o novo value
        // função maskCurrency aqui formata para R$
        wrapper.rerender(
            <MoneyInput
                onChange={(e) => {
                    test_value = e.target.value;
                }}
                value={test_value}
            />
        );

        // busca novamente o input porém espera ter o valor formatado
        const updatedInput = screen.getByRole('textbox') as HTMLInputElement;

        // regex para verificar se realmente é exibido o valor formatado em R$
        /* 
        O regex /\u00A0/g substitui espaços não separáveis (non-breaking spaces) por espaços normais, garantindo que a formatação do valor seja comparada corretamente.
        */
        expect(updatedInput.value.replace(/\u00A0/g, ' ')).toBe(
            'R$ 1.234.567,89'
        );
    });
    it('should type on the input with a value and verify if the value is NaN', async () => {
        // valor do input inicia vazio
        let test_value = '';

        // mock da função onChange()
        const onChange_mock = jest.fn();

        // renderiza o componente
        const wrapper = render(
            <MoneyInput
                onChange={(e) => {
                    onChange_mock(e);
                    test_value = e.target.value;
                }}
                value=""
            />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação de um valor que não é numérico
        // chama a função mascaraMoeda para que sempre os 2 últimos dígitos sejam centavos
        await fireEvent.change(input, { target: { value: 'abc' } }); // coloco o valor não numérico

        // verifica se onChange() realmente tem o valor de 0.00 (função transforma valores nao numéricos em 0 reais)
        expect(onChange_mock).toHaveBeenCalledWith({
            target: { value: '0.00' },
        });

        // renderiza o componente novamente com o valor atualizado
        wrapper.rerender(
            <MoneyInput
                onChange={(e) => {
                    onChange_mock(e);
                    test_value = e.target.value;
                }}
                value={'0.00'} // valor esperado que seja exibido
            />
        );

        // regex verifica se realmente é exibido o valor formatado em R$ 0.00
        /* 
        O regex /\u00A0/g substitui espaços não separáveis (non-breaking spaces) por espaços normais, garantindo que a formatação do valor seja comparada corretamente.
        */
        expect(input.value.replace(/\u00A0/g, ' ')).toBe('R$ 0,00');

        console.log(`valor no input: ${input.value}`);
        wrapper.debug();
    });
    it('should test when the input has no value', async () => {
        // mock da função onChange()
        const onChange_mock = jest.fn();

        // renderiza o componente
        const wrapper = render(
            <MoneyInput onChange={onChange_mock} value="" />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // verifica se o valor inicial é vazio
        expect(input.value).toBe('');

        // verifica se onChange() não foi chamado pois não mudou o valor
        expect(onChange_mock).not.toHaveBeenCalled();

        // verifica se não houve valor digitado
        await fireEvent.change(input, { target: { value: '' } });

        // verifica se o valor retornado é  vazio
        expect(input.value).toBe('');

        // verifica se onChange() continua não chamado pois não mudou o valor
        expect(onChange_mock).not.toHaveBeenCalled();

        console.log(`valor no input: ${input.value}`);
        wrapper.debug();
    });
});
