import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PhoneInput } from '../phoneInput';

describe('Phone Input Tests', () => {
    // mock da função onChange()
    const onChange_mock = jest.fn();

    beforeEach(() => {
        onChange_mock.mockClear();
    });

    it(' should render the input', () => {
        // renderiza o componente
        const wrapper = render(
            <PhoneInput onChange={onChange_mock} value="2199999-9999" />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // verifica se existe o input
        expect(input).toBeInTheDocument();

        // verifica se ele tem algum valor (que ja vem formatado nessa render)
        expect(input.value).toBe('21999999999');
    });
    it('should  type on the input with a value and verify if the onChange is called (the value must be formatted)', async () => {
        // inicio o valor do input vazio
        let test_value = '';

        // renderiza o componente
        const wrapper = render(
            <PhoneInput
                onChange={(value) => {
                    test_value = value || '';
                }}
                value={test_value}
                defaultCountry="BR"
                international={false} // numero vai conter () e - na formatação
            />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação/preenchimento do input com um numero sem formatação
        await userEvent.type(input, '21999999999');

        // verifica se o value agora tem formatação no formato E.164
        expect(test_value).toBe('+5521999999999');

        // verifica se em tela é renderizado de fato o numero 100% formatado
        expect(input.value).toBe('(21) 99999-9999');
        /* 
        após pesquisa verifiquei que números nacionais na lib react-phone-number-input  usam () e - ao formatar com a prop international={false} */
    });
    it('should  type on the input with a international (US) phone number value and verify if the onChange is called (the value must be formatted)', async () => {
        // inicio o valor do input vazio
        let test_value = '';

        // renderiza o componente com as props para um número internacional
        const wrapper = render(
            <PhoneInput
                onChange={(value) => {
                    test_value = value || '';
                }}
                value={test_value}
                defaultCountry="US"
                international={false} // numero vai conter () e - na formatação
            />
        );

        // busca o input
        const input = screen.getByRole('textbox') as HTMLInputElement;

        // simula a digitação/preenchimento do input com um numero internacional sem formatação
        await userEvent.type(input, '6202134144');

        // verifica se o value agora tem formatação no formato E.164
        expect(test_value).toBe('+16202134144');

        // verifica se em tela é renderizado de fato o numero 100% formatado
        expect(input.value).toBe('(620) 213-4144'); /* 
        após pesquisa verifiquei que números internacionais na lib react-phone-number-input não usam () e nem - ao formatar com a prop international={true} então é necessário neste caso de teste international={false} para poder entrar na formatação do site mesmo sendo internacional. 
        é interessante manter international={false} para a UI/UX (foco maior na UX) seguir o padrão, mesmo em números internacionais.
         */
    });
});
