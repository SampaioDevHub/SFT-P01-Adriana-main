import * as yup from 'yup';

export const formSchemaRate = () => {
  return yup.object({
    rateName: yup.string().required('O campo "Nome" é obrigatório.'),
    rateAmount: yup
      .number()
      .typeError('Digite um número válido')
      .positive('Precisa ser maior que zero')
      .required('Campo obrigatório'),
    numberInstallments: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio (por exemplo, quando o usuário apaga o conteúdo)
      .integer('O campo "Parcelas" deve ser um número inteiro.')
      .min(1, 'O campo "Parcelas" deve ser pelo menos 1.'),
  });
};

export type FormSchemaRate = yup.InferType<ReturnType<typeof formSchemaRate>>;
