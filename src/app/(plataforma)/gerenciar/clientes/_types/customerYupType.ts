import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

export const formSchemaCustomer = yup.object({
  name: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .required('Informe o nome do cliente'),
  phone: yup
    .string()
    .max(14, 'Você só pode inserir até 14 caracteres')
    .min(14, 'Ops, esta faltando algum numero')
    .test(
      'valid-phone',
      'Telefone inválido ou sem DDD',
      (value) => !!value && isValidPhoneNumber(value)
    )
    .optional(),
  email: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .optional()
    .nullable(),
  profile: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .required('Informe o perfil do cliente'),
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
  cpf: yup
    .string()
    .min(14, 'O minimo é 14 caracteres')
    .max(14, 'Você só pode inserir até 14 caracteres')
    .required('Informe o CPF do cliente'),
  dateBirth: yup.date().optional().nullable(),
  maritalStatus: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .optional(),
  enterprise: yup
    .string()
    .max(50, 'Você só pode inserir até 50 caracteres')
    .optional(),
  businessPhone: yup
    .string()
    .max(15, 'Você só pode inserir até 15 caracteres')
    .optional(),
  lengthService: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .optional(),
  businessZipCode: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .test('zip-length', 'Insira o CEP completo', (value) => {
      if (!value) return true; // Se não foi preenchido, está ok (opcional)
      return value.length === 9; // Se foi preenchido, precisa ter exatamente 20 caracteres
    })
    .optional(),
  businessAddress: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .optional(),
  businessCity: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .optional(),
  businessState: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .optional(),
  businessPosition: yup
    .string()
    .max(50, 'Você só pode inserir até 50 caracteres')
    .optional(),
  bank: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .optional(),
  agency: yup
    .string()
    .max(15, 'Você só pode inserir até 15 caracteres')
    .optional(),
  father: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .optional(),
  mother: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .optional(),
  references: yup
    .array()
    .optional()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .max(60, 'Você só pode inserir até 60 caracteres')
          .required('Informe o nome da referência'),
        phone: yup
          .string()
          .max(14, 'Você só pode inserir até 14 caracteres')
          .min(14, 'Ops, esta faltando algum numero')
          .test(
            'valid-phone',
            'Telefone inválido ou sem DDD',
            (value) => !!value && isValidPhoneNumber(value)
          )
          .optional(),

        addressData: yup
          .object()
          .optional()
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
              .max(20, 'Você só pode inserir até 20 caracteres')
              .test('zip-length', 'Insira o CEP completo', (value) => {
                if (!value) return true; // Se não foi preenchido, está ok (opcional)
                return value.length === 9; // Se foi preenchido, precisa ter exatamente 20 caracteres
              })
              .optional(),
            referencePoint: yup
              .string()
              .max(20, 'Você só pode inserir até 20 caracteres')
              .optional(),
          }),
      })
    ),
});

export type FormSchemaCustomer = yup.InferType<typeof formSchemaCustomer>;
