'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
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

import { customerProfile, profileLabels } from '../_constants/customerProfile';
import { customerStatus } from '../_constants/customerStatus';
import {
  formSchemaCustomer,
  FormSchemaCustomer,
} from '../_types/customerYupType';

export function CustomerForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [exibirReferencias, setExibirReferencias] = useState(false);

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
    setExibirReferencias(true);
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
    defaultValues: {
      referencias: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'referencias',
  });

  const zipCode = watch('zipCode')?.replace(/\D/g, '');

  // Busca os dados do CEP sempre que ele mudar e tiver 8 dígitos
  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue(
              'address',
              `${data.estado} ${data.localidade} ${data.logradouro} ${data.complemento}`
            );
            setValue('complement', `${data.logradouro} ${data.complemento}`);
            setValue('referencePoint', data.bairro);
            setValue('city', data.localidade);
            setValue('state', data.estado);
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
      const zipCode = watch(`referencias.${index}.addressData.zipCode`);
      const cleanZipCode = zipCode?.replace(/\D/g, '');

      if (cleanZipCode && cleanZipCode.length === 8) {
        fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.erro) {
              setValue(
                `referencias.${index}.addressData.address`,
                `${data.estado} ${data.localidade} ${data.logradouro} ${data.complemento}`.trim()
              );
              setValue(
                `referencias.${index}.addressData.city`,
                data.localidade
              );
              setValue(`referencias.${index}.addressData.state`, data.uf);
            }
          })
          .catch(() => {
            toast.error(`Erro ao buscar o CEP da referência ${index + 1}`);
          });
      }
    });
  }, [
    fields
      .map((_, index) => watch(`referencias.${index}.addressData.zipCode`))
      .join(','),
  ]);

  const { mutateAsync: createCustomerFn } = useMutation({
    mutationFn: createCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  async function handleCreateCustomer(data: FormSchemaCustomer) {
    console.log(data.profile)
    try {
      await createCustomerFn({
        name: data.name,
        phone: data.phone === undefined ? '' : data.phone,
        email: data.email === '' ? null : data.email,
        profile: data.profile === 'all' ? '' : data.profile,
        addressData: {
          zipCode: data.zipCode === undefined ? '' : data.zipCode,
          address: data.address,
          number: data.number,
          complement: data.complement,
          referencePoint: data.referencePoint,
          city: data.city,
          state: data.state,
        },
        cpf: data.cpf,
        dateBirth: data.dateBirth,
        maritalStatus: data.maritalStatus === 'all' ? '' : data.maritalStatus,
        enterprise: data.enterprise,
        businessPhone:
          data.businessPhone === undefined ? '' : data.businessPhone,
        lengthService: data.lengthService,
        businessZipCode: data.businessZipCode,
        businessAddress: data.businessAddress,
        businessCity: data.businessCity,
        businessState: data.businessState,
        businessPosition: data.businessPosition,
        bank: data.bank,
        agency: data.agency,
        father: data.father,
        mother: data.mother,
        referenceEntityList: data.referencias,
      });
      reset();
      setExibirReferencias(false);
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
                <Input id="name" {...register('name')} required />
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
                  render={({ field }) => <PhoneInput {...field} />}
                />
                {errors.phone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" {...register('email')} />
                {errors.email?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="name">
                  Perfil{' '}
                  <span className="text-muted-foreground">(Obrigatório)</span>
                </Label>
                <select
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
                  name="zipCode"
                  control={control}
                  render={({ field }) => <CepInput {...field} />}
                />
                {errors.zipCode?.message && (
                  <p className="text-sm text-destructive">
                    {errors.zipCode?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register('address')} />
                {errors.address?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.address?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" {...register('city')} />
                {errors.city?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.city?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" {...register('state')} />
                {errors.state?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.state?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="referencePoint">Ponto de referência</Label>
                <Input id="referencePoint" {...register('referencePoint')} />
                {errors.referencePoint?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.referencePoint?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Numero da casa</Label>
                <Input id="number" {...register('number')} />
                {errors.number?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.number?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" {...register('complement')} />
                {errors.complement?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.complement?.message}
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
                  render={({ field }) => <CpfInput {...field} />}
                />
                {errors.cpf?.message && (
                  <p className="text-sm text-destructive">
                    {errors.cpf?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataBirth">Data de nascimento</Label>
                <Input id="dataBirth" type="date" {...register('dateBirth')} />
                {errors.dateBirth?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.dateBirth?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="maritalStatus">Estado civil</Label>
                <select
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
                <Input id="enterprise" {...register('enterprise')} />
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
                  render={({ field }) => <PhoneInput {...field} />}
                />
                {errors.businessPhone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessPhone?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lengthService">Tempo de serviço</Label>
                <Input id="lengthService" {...register('lengthService')} />
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
                  render={({ field }) => <CepInput {...field} />}
                />
                {errors.businessZipCode?.message && (
                  <p className="text-sm text-destructive">
                    {errors.businessZipCode?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">Endereço comercial</Label>
                <Input id="businessAddress" {...register('businessAddress')} />
                {errors.businessAddress?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessAddress?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCity">Cidade</Label>
                <Input id="businessCity" {...register('businessCity')} />
                {errors.businessCity?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessCity?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessState">Estado</Label>
                <Input id="businessState" {...register('businessState')} />
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
                <Input id="bank" {...register('bank')} />
                {errors.bank?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.bank?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="agency">Agência</Label>
                <Input id="agency" {...register('agency')} />
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
                <Input id="father" {...register('father')} />
                {errors.father?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.father?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mãe</Label>
                <Input id="mother" {...register('mother')} />
                {errors.mother?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.mother?.message}
                  </p>
                )}
              </div>
            </div>
            {!exibirReferencias && (
              <Button type="button" variant="outline" onClick={handleReference}>
                Adicionar referência
              </Button>
            )}
          </div>

          {exibirReferencias && (
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
                          <Label className="gap-1" htmlFor="name">
                            Nome{' '}
                            <span className="text-muted-foreground">
                              (Obrigatório)
                            </span>
                          </Label>
                          <Input
                            id="name"
                            {...register(`referencias.${index}.name` as const)}
                            required
                          />
                          {errors.referencias?.[index]?.name && (
                            <p className="text-sm text-destructive">
                              {errors.referencias?.[index]?.name?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 flex-1">
                          <Label htmlFor="phone">Telefone</Label>
                          <Controller
                            name={`referencias.${index}.phone` as const}
                            control={control}
                            render={({ field }) => <PhoneInput {...field} />}
                          />
                          {errors.referencias?.[index]?.phone && (
                            <p className="text-destructive text-sm">
                              {errors.referencias?.[index]?.phone?.message}
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
                          <Label htmlFor="cep">CEP</Label>
                          <Controller
                            name={
                              `referencias.${index}.addressData.zipCode` as const
                            }
                            control={control}
                            render={({ field }) => <CepInput {...field} />}
                          />
                          {errors.referencias?.[index]?.addressData?.zipCode
                            ?.message && (
                            <p className="text-sm text-destructive">
                              {
                                errors.referencias?.[index]?.addressData
                                  ?.zipCode?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input
                            id="address"
                            {...register(
                              `referencias.${index}.addressData.address` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData?.address
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData
                                  ?.address?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            {...register(
                              `referencias.${index}.addressData.city` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData?.city
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData?.city
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            {...register(
                              `referencias.${index}.addressData.state` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData?.state
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData?.state
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="referencePoint">
                            Ponto de referência
                          </Label>
                          <Input
                            id="referencePoint"
                            {...register(
                              `referencias.${index}.addressData.referencePoint` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData
                            ?.referencePoint?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData
                                  ?.referencePoint?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="number">Numero da casa</Label>
                          <Input
                            id="number"
                            {...register(
                              `referencias.${index}.addressData.number` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData?.number
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData?.number
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complement">Complemento</Label>
                          <Input
                            id="complement"
                            {...register(
                              `referencias.${index}.addressData.complement` as const
                            )}
                          />
                          {errors.referencias?.[index]?.addressData?.complement
                            ?.message && (
                            <p className={`text-sm text-destructive`}>
                              {
                                errors.referencias?.[index]?.addressData
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
