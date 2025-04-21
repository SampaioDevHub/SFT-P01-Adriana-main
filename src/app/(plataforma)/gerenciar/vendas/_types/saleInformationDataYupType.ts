import * as yup from 'yup';

// Esquema de validação para a venda
interface FormSchemaSaleInformationProps {
  finishLater?: boolean;
}

export const formSchemaSaleInformation = ({
  finishLater,
}: FormSchemaSaleInformationProps) => {
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
    customerName: yup
      .string()
      .required('O campo "Nome do cliente" é obrigatório.'),
    discountPercentage: yup
      .number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      ) // Permite campo vazio
      .min(0, 'O campo "Disconto(%)" não pode ser negativo.')
      .max(100, 'O campo "Disconto(%)" não pode exceder 100.')
      .optional(),
    paymentMethod: yup
      .string()
      .required('O campo "Método de Pagamento" é obrigatório.'),
  });
};

export type FormSchemaSaleInformation = yup.InferType<
  ReturnType<typeof formSchemaSaleInformation>
>;
