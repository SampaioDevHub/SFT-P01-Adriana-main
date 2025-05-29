import * as yup from 'yup';


export const formSchemaSupplier = () =>
  yup.object({
  name: yup.string().required('O nome é obrigatório'),
  cnpj: yup
    .string()
    .required('O CNPJ é obrigatório')
    .matches(/^\d{14}$/, 'CNPJ deve conter 14 dígitos numéricos'),
  email: yup.string().email('E-mail inválido').optional(),
  phone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\d+$/, 'Telefone deve conter apenas números'),
  productCost: yup
    .number()
    .required('O valor gasto em produtos é obrigatório')
    .typeError('O valor deve ser numérico'),
  addressData: yup
    .object()
    .shape({
      address: yup
        .string()
        .max(60, 'Você só pode inserir até 60 caracteres')
        .optional(),
      number: yup
        .string()
        .max(10, 'Você só pode inserir até 10 caracteres')
        .optional(),
      complement: yup
        .string()
        .max(20, 'Você só pode inserir até 20 caracteres')
        .optional(),
      city: yup
        .string()
        .max(20, 'Você só pode inserir até 20 caracteres')
        .optional(),
      state: yup
        .string()
        .max(20, 'Você só pode inserir até 20 caracteres')
        .optional(),
      zipCode: yup
        .string()
        .max(9, 'Você só pode inserir até 9 caracteres')
        .test('zip-length', 'Insira o CEP completo', (value) => {
          if (!value) return true; // Se não foi preenchido, está ok (opcional)
          return value.length === 9; // Se foi preenchido, precisa ter exatamente 20 caracteres
        })
        .optional(),
      referencePoint: yup
        .string()
        .max(20, 'Você só pode inserir até 20 caracteres')
        .optional(),
    })
    .optional(),
  products: yup
    .array()
    .of(
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
          .optional(),
        category: yup
          .string()
          .max(20, 'Você só pode inserir até 20 caracteres')
          .required('Informe uma categoria'),
        subCategory: yup
          .string()
          .max(20, 'Você só pode inserir até 20 caracteres')
          .required('Informe uma SubCategoria'),
      })
    )
    .required('É necessário incluir pelo menos um produto')
    .min(1, 'Inclua ao menos um produto'),
});

export type FormSchemaSupplier = yup.InferType<ReturnType<typeof formSchemaSupplier>>;
