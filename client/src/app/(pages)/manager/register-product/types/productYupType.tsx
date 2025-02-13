import * as yup from 'yup';

export const formSchema = yup.object({
  code: yup.string().max(50, 'Você só pode inserir até 50 caracteres'),
  name: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .required('Informe o nome do produto'),
  discountPercentage: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres'),
  price: yup.string().required('Informe o preço do produto'),
  amount: yup
    .number()
    .integer()
    .typeError('Informe a quantidade do produto')
    .required('Informe a quantidade do produto'),
  size: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .when('category', ([category], schema) => {
      if (category === 'Roupas') {
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
    .required('Informe uma Subcategoria')
});

export type FormSchema = yup.InferType<typeof formSchema>;
