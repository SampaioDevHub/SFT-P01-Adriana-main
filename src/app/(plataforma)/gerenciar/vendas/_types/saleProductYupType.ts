import * as yup from 'yup';

export const formSchemaSaleProduct = () => {
  return yup.object({
    code: yup.string(),
    name: yup.string().required('O campo "Nome do Produto" é obrigatório.'),
    amount: yup
      .number()
      .transform((value, originalValue) => {
        return isNaN(value) || originalValue === '' ? undefined : value;
      })
      .required('O campo "Quantidade" é obrigatório.')
      .integer('O campo "Quantidade" deve ser um número inteiro.')
      .min(1, 'O campo "Quantidade" deve ser pelo menos 1.'),
  });
};

export type FormSchemaSaleProduct = yup.InferType<
  ReturnType<typeof formSchemaSaleProduct>
>;
