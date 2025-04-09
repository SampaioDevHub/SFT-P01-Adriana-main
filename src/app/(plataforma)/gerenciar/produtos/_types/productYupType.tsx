import * as yup from 'yup';

export const formSchema = (isSizeNotRequired: boolean) =>
  yup.object({
    code: yup.string().max(50, 'Você só pode inserir até 50 caracteres'),
    name: yup
      .string()
      .max(60, 'Você só pode inserir até 60 caracteres')
      .required('Informe o nome do produto'),
    discountPercentage: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio
      .min(0, 'O campo "Disconto(%)" não pode ser negativo.')
      .max(100, 'O campo "Disconto(%)" não pode exceder 100.')
      .optional(),
    price: yup.string().required('Informe o preço do produto'),
    quantityInStock: yup
      .number()
      .integer()
      .typeError('Informe a quantidade do produto')
      .required('Informe a quantidade do produto'),
    size: yup
      .string()
      .max(60, 'Você só pode inserir até 60 caracteres')
      .when('category', ([category], schema) => {
        if (!isSizeNotRequired && category === 'Roupas') {
          return schema.required('Selecione um tamanho');
        }
        return schema.notRequired();
      }),
    category: yup
      .string()
      .max(20, 'Você só pode inserir até 20 caracteres')
      .required('Informe uma categoria'),
    subCategory: yup
      .string()
      .max(20, 'Você só pode inserir até 20 caracteres')
      .required('Informe uma SubCategoria'),
  });

export type FormSchema = yup.InferType<ReturnType<typeof formSchema>>;
