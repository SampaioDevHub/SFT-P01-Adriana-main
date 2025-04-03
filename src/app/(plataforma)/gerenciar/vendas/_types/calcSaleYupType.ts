import * as yup from 'yup';

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
    customerCpf: yup.string().required('CPF do Cliente'),
    productCode: yup.string(),
    productName: yup.string().required('Informe o nome do produto'),
    productAmount: yup.string().required('Informe a quantidade de produto'),
    productDiscountPercentage: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio
      .nullable()
      .max(99, 'O número deve ter no máximo 2 dígitos'),
  });
};

export type FormSchema = yup.InferType<ReturnType<typeof formSchema>>;
