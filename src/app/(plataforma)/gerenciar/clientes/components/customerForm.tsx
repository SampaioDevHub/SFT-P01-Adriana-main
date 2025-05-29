'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  formSchemaCustomer,
  FormSchemaCustomer,
} from '../_types/customerYupType';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/ui/popover';
import { AxiosError } from 'axios';
import { format, isValid, parse, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer } from '@/_api/customers/create-customer';
import { PhoneInput } from '@/_components/Inputs/phoneInput';
import { CpfInput } from '@/_components/Inputs/cpfInput';
import { CepInput } from '@/_components/Inputs/cepInput';
import { AlertError } from '@/_components/alert/alert-error';
import { Calendar } from '@/_components/ui/calendar';

import { customerProfile, profileLabels } from '../_constants/customerProfile';
import { customerStatus } from '../_constants/customerStatus';
import { DefaultCreateCustomerContent } from '../_constants/deafultCreateCustomerContent';
import { formatDate } from '../_utils/formatDate';
import { sanitizeObject } from '../_utils/sanitizeObject';

export function CustomerForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [exibirReferences, setExibirReferences] = useState(false);
  function handleReference() {
    const criarReferenciaVazia = () => ({
      name: '',
      phone: '',
      addressData: {
        zipCode: '',
        address: '',
        number: '',
        complement: '',
        referencePoint: '',
        city: '',
        state: '',
      },
    });
    setExibirReferences(true);
    append(criarReferenciaVazia());
  }

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaCustomer>({
    resolver: yupResolver(formSchemaCustomer),
    defaultValues: DefaultCreateCustomerContent,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  });

  const zipCode = watch('addressData.zipCode')?.replace(/\D/g, '');

  // Busca os dados do CEP sempre que ele mudar e tiver 8 dígitos
  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue(
              'addressData.address',
              `${data.estado} ${data.localidade} ${data.logradouro} ${data.complemento}`
            );
            setValue(
              'addressData.complement',
              `${data.logradouro} ${data.complemento}`
            );
            setValue('addressData.referencePoint', data.bairro);
            setValue('addressData.city', data.localidade);
            setValue('addressData.state', data.estado);
          }
        })
        .catch((error) => toast.error('Erro ao buscara o CEP'));
    }
  }, [zipCode, setValue]);

  const businessZipCode = watch('businessZipCode')?.replace(/\D/g, '');

  // Busca os dados do CEP sempre que ele mudar e tiver 8 dígitos
  useEffect(() => {
    if (businessZipCode && businessZipCode.length === 8) {
      fetch(`https://viacep.com.br/ws/${businessZipCode}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue(
              'businessAddress',
              `${data.estado} ${data.localidade} ${data.logradouro} ${data.complemento}`
            );
            setValue('businessCity', data.localidade);
            setValue('businessState', data.estado);
          }
        })
        .catch((error) => toast.error('Erro ao buscara o CEP'));
    }
  }, [businessZipCode, setValue]);

  useEffect(() => {
    fields.forEach((_, index) => {
      const zipCode = watch(`references.${index}.addressData.zipCode`);
      const cleanZipCode = zipCode?.replace(/\D/g, '');

      if (cleanZipCode && cleanZipCode.length === 8) {
        fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.erro) {
              setValue(
                `references.${index}.addressData.address`,
                `${data.estado} ${data.localidade} ${data.logradouro} ${data.complemento}`.trim()
              );
              setValue(`references.${index}.addressData.city`, data.localidade);
              setValue(`references.${index}.addressData.state`, data.uf);
            }
          })
          .catch(() => {
            toast.error(`Erro ao buscar o CEP da referência ${index + 1}`);
          });
      }
    });
  }, [
    fields
      .map((_, index) => watch(`references.${index}.addressData.zipCode`))
      .join(','),
  ]);

  const { mutateAsync: createCustomerFn } = useMutation({
    mutationFn: createCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  async function handleCreateCustomer(data: FormSchemaCustomer) {
    console.log(data);
    try {
      await createCustomerFn({
        name: data.name ?? '',
        cpf: data.cpf ?? '',
        maritalStatus: data.maritalStatus === 'all' ? '' : data.maritalStatus,
        email: data.email ?? null,
        profile: data.profile === 'all' ? '' : data.profile,
        phone: data.phone ?? '',
        enterprise: data.enterprise ?? '',
        businessPhone: data.businessPhone ?? '',
        lengthService: data.lengthService ?? '',
        businessZipCode: data.businessZipCode ?? '',
        businessAddress: data.businessAddress ?? '',
        businessSector: data.businessPosition ?? '',
        businessCity: data.businessCity ?? '',
        businessState: data.businessState ?? '',
        businessPosition: data.businessPosition ?? '',
        dateBirth: data.dateBirth ?? null,
        addressData: {
          zipCode: data.addressData?.zipCode ?? '',
          address: data.addressData?.address ?? '',
          number: data.addressData?.number ?? '',
          complement: data.addressData?.complement ?? '',
          referencePoint: data.addressData?.referencePoint ?? '',
          city: data.addressData?.city ?? '',
          state: data.addressData?.state ?? '',
        },
        bank: data.bank ?? '',
        agency: data.agency ?? '',
        father: data.father ?? '',
        mother: data.mother ?? '',
        referenceEntityList:
          data.references?.map((ref) => ({
            name: ref.name ?? '',
            phone: ref.phone ?? '',
            addressData: {
              zipCode: data.addressData?.zipCode ?? '',
              address: data.addressData?.address ?? '',
              number: data.addressData?.number ?? '',
              complement: data.addressData?.complement ?? '',
              referencePoint: data.addressData?.referencePoint ?? '',
              city: data.addressData?.city ?? '',
              state: data.addressData?.state ?? '',
            },
          })) ?? [],
      });
      reset();
      setExibirReferences(false);
      setValue('cpf', '');
      setErrorMessage(null);
      toast.success('Cliente cadastrado com sucesso');
    } catch (error: unknown) {
      const err = error as AxiosError;

      if (err.response?.data) {
        const errorData = err.response.data as { errors?: string[] };
        const errorMessage =
          errorData.errors?.[0] || 'Erro desconhecido do servidor';

        setErrorMessage(errorMessage);
      } else {
        setErrorMessage(err.message || 'Erro inesperado');
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleCreateCustomer)}
          className="space-y-6"
        >
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Pessoais</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="name">
                  Nome{' '}
                  <span className="text-muted-foreground">(Obrigatório)</span>
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  required={errors.name?.message ? true : false}
                />
                {errors.name?.message && (
                  <p className="text-sm text-destructive">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      required={errors.phone?.message ? true : false}
                      {...field}
                    />
                  )}
                />
                {errors.phone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  required={errors.email?.message ? true : false}
                  id="email"
                  {...register('email')}
                />
                {errors.email?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="profile">
                  Perfil{' '}
                  <span className="text-muted-foreground">(Obrigatório)</span>
                </Label>
                <select
                  id="profile"
                  required={errors.profile?.message ? true : false}
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('profile')}
                >
                  {customerProfile?.map((profile, index) => (
                    <option
                      className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
                      key={index}
                      value={profile}
                    >
                      {profileLabels[profile] || profile}
                    </option>
                  ))}
                </select>
                {errors.profile?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.profile?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Endereço Residencial */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <p className="text-end text-lg font-medium">
                Endereço Residencial
              </p>
              <p className="text-sm text-muted-foreground">
                (Digite o CEP Primeiro)
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Controller
                  name="addressData.zipCode"
                  control={control}
                  render={({ field }) => (
                    <CepInput
                      required={
                        errors.addressData?.zipCode?.message ? true : false
                      }
                      {...field}
                    />
                  )}
                />
                {errors.addressData?.zipCode?.message && (
                  <p className="text-sm text-destructive">
                    {errors.addressData.zipCode?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  required={errors.addressData?.address?.message ? true : false}
                  {...register('addressData.address')}
                />
                {errors.addressData?.address?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.address?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  required={errors.addressData?.city?.message ? true : false}
                  {...register('addressData.city')}
                />
                {errors.addressData?.city?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.city?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  required={errors.addressData?.state?.message ? true : false}
                  {...register('addressData.state')}
                />
                {errors.addressData?.state?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.state?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencePoint">Ponto de referência</Label>
                <Input
                  required={
                    errors.addressData?.referencePoint?.message ? true : false
                  }
                  id="referencePoint"
                  {...register('addressData.referencePoint')}
                />
                {errors.addressData?.referencePoint?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.referencePoint?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Numero da casa</Label>
                <Input
                  required={errors.addressData?.number?.message ? true : false}
                  id="number"
                  {...register('addressData.number')}
                />
                {errors.addressData?.number?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.number?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  required={
                    errors.addressData?.complement?.message ? true : false
                  }
                  id="complement"
                  {...register('addressData.complement')}
                />
                {errors.addressData?.complement?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.addressData?.complement?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Documentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documentos</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="name">
                  CPF{' '}
                  <span className="text-muted-foreground">(Obrigatório)</span>
                </Label>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <CpfInput
                      required={errors.cpf?.message ? true : false}
                      {...field}
                    />
                  )}
                />
                {errors.cpf?.message && (
                  <p className="text-sm text-destructive">
                    {errors.cpf?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Controller
                  name="dateBirth"
                  control={control}
                  render={({ field }) => {
                    // Converte o Date para string yyyy-MM-dd para o input type="date"
                    const dateString = field.value
                      ? format(field.value, 'yyyy-MM-dd')
                      : '';

                    // Função para atualizar o field.value com Date a partir do input string
                    const onInputChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const val = e.target.value;
                      const parsedDate = parseISO(val);
                      if (val === '') {
                        field.onChange(undefined); // limpa o valor
                      } else if (isValid(parsedDate)) {
                        field.onChange(parsedDate);
                      }
                    };

                    return (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Data de nascimento
                        </label>
                        <div className="relative flex items-center gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" size="icon">
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={field.value as Date | undefined}
                                onSelect={(date) =>
                                  field.onChange(date ?? undefined)
                                }
                                initialFocus
                                toYear={new Date().getFullYear()}
                                fromYear={1900}
                                locale={ptBR}
                                className="rounded-md"
                                classNames={{
                                  caption_label: 'hidden',
                                  caption_dropdowns:
                                    'flex justify-center items-center gap-1 [&>label]:sr-only',
                                  dropdown_month:
                                    'text-sm px-2 py-1 rounded-md border border-input bg-background shadow-sm focus:outline-none',
                                  dropdown_year:
                                    'text-sm px-2 py-1 rounded-md border border-input bg-background shadow-sm focus:outline-none',
                                }}
                              />
                            </PopoverContent>
                          </Popover>

                          <Input
                            className="no-calendar-button"
                            type="date"
                            value={dateString}
                            onChange={onInputChange}
                          />
                        </div>

                        {errors.dateBirth && (
                          <p className="text-sm text-destructive">
                            {errors.dateBirth.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="maritalStatus">Estado civil</Label>
                <select
                  id="maritalStatus"
                  required={errors.maritalStatus?.message ? true : false}
                  defaultValue="all"
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('maritalStatus')}
                >
                  <option value="all" disabled hidden>
                    Selecione um status
                  </option>
                  {customerStatus?.map((status, index) => (
                    <option
                      className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
                      key={index}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>
                {errors.maritalStatus?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.maritalStatus?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Informações Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Profissionais</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="enterprise">Empresa</Label>
                <Input
                  id="enterprise"
                  required={errors.enterprise?.message ? true : false}
                  {...register('enterprise')}
                />
                {errors.enterprise?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.enterprise?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPhone">Telefone comercial</Label>
                <Controller
                  name="businessPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      required={errors.businessPhone?.message ? true : false}
                      {...field}
                    />
                  )}
                />
                {errors.businessPhone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessPhone?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lengthService">Tempo de serviço</Label>
                <Input
                  id="lengthService"
                  required={errors.lengthService?.message ? true : false}
                  {...register('lengthService')}
                />
                {errors.lengthService?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.lengthService?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCep">CEP</Label>
                <Controller
                  name="businessZipCode"
                  control={control}
                  render={({ field }) => (
                    <CepInput
                      required={errors.businessZipCode?.message ? true : false}
                      {...field}
                    />
                  )}
                />
                {errors.businessZipCode?.message && (
                  <p className="text-sm text-destructive">
                    {errors.businessZipCode?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Endereço comercial</Label>
                <Input
                  id="businessAddress"
                  required={errors.businessAddress?.message ? true : false}
                  {...register('businessAddress')}
                />
                {errors.businessAddress?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessAddress?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCity">Cidade</Label>
                <Input
                  id="businessCity"
                  required={errors.businessCity?.message ? true : false}
                  {...register('businessCity')}
                />
                {errors.businessCity?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessCity?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessState">Estado</Label>
                <Input
                  id="businessState"
                  required={errors.businessState?.message ? true : false}
                  {...register('businessState')}
                />
                {errors.businessState?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessState?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPosition">Cargo</Label>
                <Input
                  id="businessPosition"
                  required={errors.businessPosition?.message ? true : false}
                  {...register('businessPosition')}
                />
                {errors.businessPosition?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessPosition?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Informações Bancárias */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Bancárias</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bank">Banco</Label>
                <Input
                  id="bank"
                  required={errors.bank?.message ? true : false}
                  {...register('bank')}
                />
                {errors.bank?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.bank?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="agency">Agência</Label>
                <Input
                  id="agency"
                  required={errors.agency?.message ? true : false}
                  {...register('agency')}
                />
                {errors.agency?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.agency?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Filiação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Filiação</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="father">Pai</Label>
                <Input
                  id="father"
                  required={errors.father?.message ? true : false}
                  {...register('father')}
                />
                {errors.father?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.father?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mãe</Label>
                <Input
                  id="mother"
                  required={errors.mother?.message ? true : false}
                  {...register('mother')}
                />
                {errors.mother?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.mother?.message}
                  </p>
                )}
              </div>
            </div>
            {!exibirReferences && (
              <Button type="button" variant="outline" onClick={handleReference}>
                Adicionar referência
              </Button>
            )}
          </div>

          {exibirReferences && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Referências</h3>
              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="flex flex-col gap-3 bg-background p-4">
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                      >
                        <div className="space-y-2">
                          <Label
                            className="gap-1"
                            htmlFor={`references.${index}.name`}
                          >
                            Nome{' '}
                            <span className="text-muted-foreground">
                              (Obrigatório)
                            </span>
                          </Label>
                          <Input
                            id={`references.${index}.name`}
                            {...register(`references.${index}.name` as const)}
                            required={
                              errors.references?.[index]?.name?.message
                                ? true
                                : false
                            }
                          />
                          {errors.references?.[index]?.name && (
                            <p className="text-sm text-destructive">
                              {errors.references?.[index]?.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label htmlFor={`references.${index}.phone`}>
                            Telefone
                          </Label>
                          <Controller
                            name={`references.${index}.phone` as const}
                            control={control}
                            render={({ field }) => (
                              <PhoneInput
                                id={`references.${index}.phone`}
                                required={
                                  errors.references?.[index]?.phone?.message
                                    ? true
                                    : false
                                }
                                {...field}
                              />
                            )}
                          />
                          {errors.references?.[index]?.phone && (
                            <p className="text-destructive text-sm">
                              {errors.references?.[index]?.phone?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-end text-sm text-muted-foreground">
                          Endereço Residencial
                        </p>
                        <p className="text-sm text-muted-foreground">
                          (Digite o CEP Primeiro)
                        </p>
                      </div>
                      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.zipCode`}>
                            CEP
                          </Label>
                          <Controller
                            name={
                              `references.${index}.addressData.zipCode` as const
                            }
                            control={control}
                            render={({ field }) => (
                              <CepInput
                                id={`references.${index}.zipCode`}
                                required={
                                  errors.references?.[index]?.addressData
                                    ?.zipCode?.message
                                    ? true
                                    : false
                                }
                                {...field}
                              />
                            )}
                          />
                          {errors.references?.[index]?.addressData?.zipCode
                            ?.message && (
                            <p className="text-sm text-destructive">
                              {
                                errors.references?.[index]?.addressData?.zipCode
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.address`}>
                            Endereço
                          </Label>
                          <Input
                            id={`references.${index}.address`}
                            required={
                              errors.references?.[index]?.addressData?.address
                                ?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.address` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData?.address
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData?.address
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.city`}>
                            Cidade
                          </Label>
                          <Input
                            id="city"
                            required={
                              errors.references?.[index]?.addressData?.city
                                ?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.city` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData?.city
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData?.city
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.state`}>
                            Estado
                          </Label>
                          <Input
                            id={`references.${index}.state`}
                            required={
                              errors.references?.[index]?.addressData?.state
                                ?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.state` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData?.state
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData?.state
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.referencePoint`}>
                            Ponto de referência
                          </Label>
                          <Input
                            id={`references.${index}.referencePoint`}
                            required={
                              errors.references?.[index]?.addressData
                                ?.referencePoint?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.referencePoint` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData
                            ?.referencePoint?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData
                                  ?.referencePoint?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.number`}>
                            Numero da casa
                          </Label>
                          <Input
                            id={`references.${index}.number`}
                            required={
                              errors.references?.[index]?.addressData?.number
                                ?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.number` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData?.number
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData?.number
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`references.${index}.city`}>
                            Complemento
                          </Label>
                          <Input
                            id={`references.${index}.city`}
                            required={
                              errors.references?.[index]?.addressData
                                ?.complement?.message
                                ? true
                                : false
                            }
                            {...register(
                              `references.${index}.addressData.complement` as const
                            )}
                          />
                          {errors.references?.[index]?.addressData?.complement
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.references?.[index]?.addressData
                                  ?.complement?.message
                              }
                            </p>
                          )}
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remover referência
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                type="button"
                variant="secondary"
                onClick={handleReference}
              >
                Adicionar mais uma referência
              </Button>
            </div>
          )}
          {errorMessage && (
            <AlertError
              title="Ops, parece que temos um erro!"
              errorMessage={errorMessage}
            />
          )}
          <Button
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
