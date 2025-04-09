import * as yup from 'yup';

// Esquema de validação para os produtos
export const productResponseSchema = yup.object({
  code: yup.string().optional(),
  name: yup.string().required('O campo "Nome do Produto" é obrigatório.'),
  quantityInStock: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value
    ) // Permite campo vazio
    .required('O campo "Quantidade" é obrigatório.')
    .integer('O campo "Quantidade" deve ser um número inteiro.')
    .min(1, 'O campo "Quantidade" deve ser pelo menos 1.'),
});

// Esquema de validação para a venda
interface formSchemaProps {
  finishLater?: boolean;
}

export const formSchema = ({ finishLater }: formSchemaProps) => {
  return yup.object({
    startDate: yup
      .date()
      .typeError('Coloque uma data válida')
      .when([], (__, schema) => {
        return !finishLater
          ? schema.notRequired()
          : schema.required('Coloque a Data Atual');
      }),
    endDate: yup
      .date()
      .typeError('Coloque uma data válida')
      .min(yup.ref('startDate'), 'A data final deve ser posterior à inicial')
      .when([], (__, schema) => {
        return !finishLater
          ? schema.notRequired()
          : schema.required('Coloque a Data Final');
      }),
    customerCpf: yup
      .string()
      .required('O campo "CPF do cliente" é obrigatório.')
      .min(14, 'O minimo é 14 caracteres')
      .max(14, 'Você só pode inserir até 14 caracteres'),
    discountPercentage: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio
      .min(0, 'O campo "Disconto(%)" não pode ser negativo.')
      .max(100, 'O campo "Disconto(%)" não pode exceder 100.')
      .optional(),
    productResponses: yup
      .array()
      .of(productResponseSchema)
      .min(1, 'Você deve adicionar pelo menos 1 produto para concluir a venda.')
      .required(),
  });
};

export type FormSchema = yup.InferType<ReturnType<typeof formSchema>>;
