import { isValidPhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

export const formSchemaCustomer = yup.object({
  name: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .required('Informe o nome do cliente'),
  phone: yup
    .string()
    .max(15, 'Você só pode inserir até 15 caracteres')
    .test(
      'valid-phone',
      'Telefone inválido ou sem DDD',
      (value) => !!value && isValidPhoneNumber(value)
    ),
  email: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres')
    .nullable(),
  profile: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres')
    .required('Informe o perfil do cliente'),
  address: yup.string().max(60, 'Você só pode inserir até 60 caracteres'),
  number: yup.string().max(10, 'Você só pode inserir até 10 caracteres'),
  complement: yup.string().max(50, 'Você só pode inserir até 50 caracteres'),
  city: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  state: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  zipCode: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  referencePoint: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres'),
  cpf: yup
    .string()
    .min(14, 'O minimo é 14 caracteres')
    .max(14, 'Você só pode inserir até 14 caracteres')
    .required('Informe o CPF do cliente'),
  dateBirth: yup.string().nullable(),
  maritalStatus: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  enterprise: yup.string().max(50, 'Você só pode inserir até 50 caracteres'),
  businessPhone: yup.string().max(15, 'Você só pode inserir até 15 caracteres'),
  lengthService: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  businessZipCode: yup
    .string()
    .max(20, 'Você só pode inserir até 20 caracteres'),
  businessAddress: yup
    .string()
    .max(60, 'Você só pode inserir até 60 caracteres'),
  businessCity: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  businessState: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  businessPosition: yup
    .string()
    .max(50, 'Você só pode inserir até 50 caracteres'),
  bank: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
  agency: yup.string().max(15, 'Você só pode inserir até 15 caracteres'),
  father: yup.string().max(60, 'Você só pode inserir até 60 caracteres'),
  mother: yup.string().max(60, 'Você só pode inserir até 60 caracteres'),
  references: yup.array().of(
    yup.object().shape({
      name: yup
        .string()
        .max(60, 'Você só pode inserir até 60 caracteres')
        .required('Informe o nome da referência'),
      phone: yup
        .string()
        .max(15, 'Você só pode inserir até 15 caracteres')
        .test(
          'valid-phone',
          'Telefone inválido ou sem DDD',
          (value) => !!value && isValidPhoneNumber(value)
        ),

      addressData: yup.object().shape({
        address: yup.string().max(60, 'Você só pode inserir até 60 caracteres'),
        number: yup.string().max(10, 'Você só pode inserir até 10 caracteres'),
        complement: yup
          .string()
          .max(20, 'Você só pode inserir até 20 caracteres'),
        city: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
        state: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
        zipCode: yup.string().max(20, 'Você só pode inserir até 20 caracteres'),
        referencePoint: yup
          .string()
          .max(20, 'Você só pode inserir até 20 caracteres'),
      }),
    })
  ),
});

export type FormSchemaCustomer = yup.InferType<typeof formSchemaCustomer>;
