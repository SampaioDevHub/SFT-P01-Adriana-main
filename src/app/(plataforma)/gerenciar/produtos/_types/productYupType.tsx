import * as yup from 'yup';

export const formSchemaProduct = () =>
  yup.object({
    code: yup.string().required(),
    name: yup
      .string()
      .max(60, 'Você só pode inserir até 60 caracteres')
      .required('Informe o nome do produto'),
    discountPercentage: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio
      .min(0, 'O campo "Disconto(%)" não pode ser negativo.')
      .max(100, 'O campo "Disconto(%)" não pode exceder 100.')
      .optional(),
    price: yup.number().required('Informe o preço do produto'),
    quantityInStock: yup
      .number()
      .integer()
      .typeError('Informe a quantidade do produto')
      .required('Informe a quantidade do produto'),
    size: yup
      .string()
      .max(60, 'Você só pode inserir até 60 caracteres')
      .optional()
      .nullable(),
    category: yup
      .string()
      .max(20, 'Você só pode inserir até 20 caracteres')
      .required('Informe uma categoria'),
  });

export type FormSchemaProduct = yup.InferType<ReturnType<typeof formSchemaProduct>>;
