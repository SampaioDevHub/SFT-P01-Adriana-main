'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/_components/ui/card';
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/_components/ui/tabs';
import {
  FormSchemaCustomer,
  formSchemaCustomer,
} from '../_types/customerYupType';
import { AxiosError } from 'axios';
import { format, parseISO, set } from 'date-fns';
import { Pencil, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCustomerById } from '@/_api/customers/get-customer-by-id';
import { updatedCustomer } from '@/_api/customers/updated-customer';
import { CpfInput } from '@/_components/Inputs/cpfInput';
import { PhoneInput } from '@/_components/Inputs/phoneInput';
import { CepInput } from '@/_components/Inputs/cepInput';
import { AlertError } from '@/_components/alert/alert-error';

import { customerProfile, profileLabels } from '../_constants/customerProfile';
import { customerStatus } from '../_constants/customerStatus';
import { EditCustomerContentSkeleton } from './skeleton/editCustomerContentSkeleton';

interface ModalProps {
  customerId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditCustomerModalContent({
  customerId,
  setIsOpen,
  open,
}: ModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState({
    key: 'personalinformation',
    error: '',
  });

  const queryClient = useQueryClient();

  const { data: customer, isLoading: isLoadingGetCustomer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById({ customerId }),
    enabled: open,
    staleTime: 0,
    gcTime: 0,
  });

  const dataFormatada =
    customer?.dateBirth &&
    format(parseISO(customer.dateBirth.split(' ')[0]), 'yyyy-MM-dd');

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
    values: {
      name: customer?.name ?? '',
      phone: customer?.phone ?? '',
      email: customer?.email ?? null,
      profile: customer?.profile ?? '',
      zipCode: customer?.addressData.zipCode ?? '',
      address: customer?.addressData.address ?? '',
      number: customer?.addressData.number ?? '',
      complement: customer?.addressData.complement ?? '',
      referencePoint: customer?.addressData.referencePoint ?? '',
      city: customer?.addressData.city ?? '',
      state: customer?.addressData.state ?? '',
      cpf: customer?.cpf ?? '',
      dateBirth: dataFormatada ?? '',
      maritalStatus: customer?.maritalStatus ?? '',
      enterprise: customer?.enterprise ?? '',
      businessPhone: customer?.businessPhone ?? '',
      lengthService: customer?.lengthService ?? '',
      businessZipCode: customer?.businessZipCode ?? '',
      businessAddress: customer?.businessAddress ?? '',
      businessCity: customer?.businessCity ?? '',
      businessState: customer?.businessState ?? '',
      businessPosition: customer?.businessPosition ?? '',
      bank: customer?.bank ?? '',
      agency: customer?.agency ?? '',
      father: customer?.father ?? '',
      mother: customer?.mother ?? '',
      references: customer?.referenceEntityList || [],
    },
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

  const { mutateAsync: updatedCustomerFn } = useMutation({
    mutationFn: updatedCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const errorFields = Object.keys(errors);

  useEffect(() => {
    if (errors.name || errors.phone || errors.email) {
      setActiveTab({
        key: 'personalinformation',
        error: 'personalinformation',
      });
    } else if (
      errors.zipCode ||
      errors.address ||
      errors.city ||
      errors.state ||
      errors.referencePoint ||
      errors.number ||
      errors.complement
    ) {
      setActiveTab({
        key: 'homeAddress',
        error: 'homeAddress',
      });
    } else if (errors.cpf || errors.dateBirth || errors.maritalStatus) {
      setActiveTab({
        key: 'documents',
        error: 'documents',
      });
    } else if (
      errors.enterprise ||
      errors.businessPhone ||
      errors.lengthService ||
      errors.businessZipCode ||
      errors.businessAddress ||
      errors.businessCity ||
      errors.businessState ||
      errors.businessPosition
    ) {
      setActiveTab({
        key: 'professionals',
        error: 'professionals',
      });
    } else if (errors.bank || errors.agency) {
      setActiveTab({
        key: 'banking',
        error: 'banking',
      });
    } else if (errors.father || errors.mother) {
      setActiveTab({
        key: 'affiliation',
        error: 'affiliation',
      });
    } else if (Array.isArray(errors.references)) {
      const indexComErro = errors.references.findIndex(
        (ref) => ref?.nome || ref?.telefone
      );
    
      setActiveTab({
        key: 'references',
        error: 'references',
      });
    
        setIndexEdit(indexComErro + 1);
    }
  }, [errorFields.length, errors]);

  useEffect(() => {
    if (customer?.referenceEntityList?.length) {
      setValue('references', customer.referenceEntityList);
    }
  }, [customer, setValue]);

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'references',
  });

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState<number | null>(null);

  console.log(indexEdit)

  function handleIsOpenEditReference (index: number) {
    if(indexEdit === null) {
      setIndexEdit(index)
    }else {
      setIndexEdit(null)
    }
  }

  const handleDelete = (index: number) => {
    remove(index);
  };

  async function handleUpdatedCustomer(data: FormSchemaCustomer) {
    try {
      await updatedCustomerFn({
        id: customer!.id,
        name: data.name,
        phone: data.phone === undefined ? '' : data.phone,
        email: data.email === '' ? null : data.email,
        profile: data.profile,
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
        referenceEntityList: data.references,
      });
      reset();
      setIsOpen(false);
      setErrorMessage(null);
      toast.success('Cliente atualizado com sucesso');
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
    <DialogContent
      title="noButtonClose"
      className="m-0 w-full border-0 bg-transparent p-0 pt-6"
    >
      <DialogTitle className="flex items-center justify-between text-muted dark:text-foreground">
        Edite os dados do cliente
        <DialogClose>
          <X className="h-5 w-5 text-muted-foreground" />
        </DialogClose>
      </DialogTitle>
      {isLoadingGetCustomer && <EditCustomerContentSkeleton />}
      {customer && (
        <form onSubmit={handleSubmit(handleUpdatedCustomer)}>
          <Tabs
            value={activeTab.key}
            onValueChange={(value) => {
              setActiveTab({ key: value, error: '' });
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="personalinformation">
                <span
                  className={
                    activeTab.error === 'personalinformation'
                      ? 'text-destructive'
                      : ''
                  }
                >
                  Pessoal
                </span>
              </TabsTrigger>
              <TabsTrigger value="homeAddress">
                <span
                  className={
                    activeTab.error === 'homeAddress' ? 'text-destructive' : ''
                  }
                >
                  Endereço
                </span>
              </TabsTrigger>
              <TabsTrigger value="documents">
                <span
                  className={
                    activeTab.error === 'documents' ? 'text-destructive' : ''
                  }
                >
                  Documentos
                </span>
              </TabsTrigger>
              <TabsTrigger value="professionals">
                <span
                  className={
                    activeTab.error === 'professionals'
                      ? 'text-destructive'
                      : ''
                  }
                >
                  Profissionais
                </span>
              </TabsTrigger>
              <TabsTrigger value="banking">
                <span
                  className={
                    activeTab.error === 'banking' ? 'text-destructive' : ''
                  }
                >
                  Bancários
                </span>
              </TabsTrigger>
              <TabsTrigger value="affiliation">
                <span
                  className={
                    activeTab.error === 'affiliation' ? 'text-destructive' : ''
                  }
                >
                  Afiliação
                </span>
              </TabsTrigger>
              <TabsTrigger value="references">
                <span
                  className={
                    activeTab.error === 'references' ? 'text-destructive' : ''
                  }
                >
                  Referências
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personalinformation">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Edite as informações pessoais do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Label className="gap-1" htmlFor="name">
                      Nome
                      <span className="text-muted-foreground">
                        (Obrigatório)
                      </span>
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
                      <p className="text-sm text-destructive">
                        {errors.phone?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" {...register('email')} />
                    {errors.email?.message && (
                      <p className="text-sm text-destructive">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile">Perfil</Label>
                    <select
                      defaultValue="all"
                      className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...register('profile')}
                    >
                      <option value="all" disabled hidden>
                        Como é seu cliente?
                      </option>
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homeAddress">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço Residencial</CardTitle>
                  <CardDescription>
                    Edite o endereço residencial do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[50vh] space-y-2 overflow-y-auto overflow-x-hidden">
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
                      <p className="text-sm text-destructive">
                        {errors.address?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input id="city" {...register('city')} />
                    {errors.city?.message && (
                      <p className="text-sm text-destructive">
                        {errors.city?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input id="state" {...register('state')} />
                    {errors.state?.message && (
                      <p className="text-sm text-destructive">
                        {errors.state?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referencePoint">Ponto de referência</Label>
                    <Input
                      id="referencePoint"
                      {...register('referencePoint')}
                    />
                    {errors.referencePoint?.message && (
                      <p className="text-sm text-destructive">
                        {errors.referencePoint?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Numero da casa</Label>
                    <Input id="number" {...register('number')} />
                    {errors.number?.message && (
                      <p className="text-sm text-destructive">
                        {errors.number?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" {...register('complement')} />
                    {errors.complement?.message && (
                      <p className="text-sm text-destructive">
                        {errors.complement?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>
                    Edite os documentos do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Label className="gap-1" htmlFor="name">
                      CPF{' '}
                      <span className="text-muted-foreground">
                        (Obrigatório)
                      </span>
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
                    <Input
                      id="dataBirth"
                      type="date"
                      {...register('dateBirth')}
                    />
                    {errors.dateBirth?.message && (
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
                        {errors.maritalStatus?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professionals">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Profissionais</CardTitle>
                  <CardDescription>
                    Edite as informações profissionais do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[40vh] space-y-2 overflow-y-auto overflow-x-hidden">
                  <div className="space-y-2">
                    <Label htmlFor="enterprise">Empresa</Label>
                    <Input id="enterprise" {...register('enterprise')} />
                    {errors.enterprise?.message && (
                      <p className="text-sm text-destructive">
                        {errors.enterprise?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Telefone comercial</Label>
                    <Input id="businessPhone" {...register('businessPhone')} />
                    {errors.businessPhone?.message && (
                      <p className="text-sm text-destructive">
                        {errors.businessPhone?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lengthService">Tempo de serviço</Label>
                    <Input id="lengthService" {...register('lengthService')} />
                    {errors.lengthService?.message && (
                      <p className="text-sm text-destructive">
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
                    <Input
                      id="businessAddress"
                      {...register('businessAddress')}
                    />
                    {errors.businessAddress?.message && (
                      <p className="text-sm text-destructive">
                        {errors.businessAddress?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessCity">Cidade</Label>
                    <Input id="businessCity" {...register('businessCity')} />
                    {errors.businessCity?.message && (
                      <p className="text-sm text-destructive">
                        {errors.businessCity?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessState">Estado</Label>
                    <Input id="businessState" {...register('businessState')} />
                    {errors.businessState?.message && (
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
                        {errors.businessPosition?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="banking">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Bancarias</CardTitle>
                  <CardDescription>
                    Edite as informações bancarias do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Banco</Label>
                    <Input id="bank" {...register('bank')} />
                    {errors.bank?.message && (
                      <p className="text-sm text-destructive">
                        {errors.bank?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency">Agência</Label>
                    <Input id="agency" {...register('agency')} />
                    {errors.agency?.message && (
                      <p className="text-sm text-destructive">
                        {errors.agency?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="affiliation">
              <Card>
                <CardHeader>
                  <CardTitle>Afiliação</CardTitle>
                  <CardDescription>
                    Edite as informações de afiliação do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="father">Pai</Label>
                    <Input id="father" {...register('father')} />
                    {errors.father?.message && (
                      <p className="text-sm text-destructive">
                        {errors.father?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother">Mãe</Label>
                    <Input id="mother" {...register('mother')} />
                    {errors.mother?.message && (
                      <p className="text-sm text-destructive">
                        {errors.mother?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent className='max-h-[70vh] overflow-auto' value="references">
              <Card>
                <CardHeader>
                  <CardTitle>Referências</CardTitle>
                  <CardDescription>
                    Edite as referências pessoais do cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <Card className="space-y-4">
                        <CardHeader
                          className={`p-0 flex-row ${indexEdit === index && 'border-b'} items-center justify-between w-full gap-2`}
                        >
                          <div
                            className={`bg-background border-r ${indexEdit === index && 'rounded-bl-none'} px-6 py-4 rounded-lg flex items-center gap-2 w-full justify-start`}
                          >
                            <User className="h-12 w-12 text-muted-foreground" />
                            <div className="flex flex-col gap-1">
                              <h1 className="text-base">{field.name}</h1>
                              <span className="text-muted-foreground">
                                {field.phone}
                              </span>
                            </div>
                          </div>
                          <div className="flex p-4 items-center justify-between gap-2">
                            <Button
                              onClick={() => {handleIsOpenEditReference(index)}}
                              size="icon"
                              variant="outline"
                              type="button"
                            >
                              <Pencil className="text-muted-foreground" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(index)}
                            >
                              <X className="text-muted-foreground" />
                            </Button>
                          </div>
                        </CardHeader>
                        {/* Se estiver editando a referência, exibe os inputs */}
                        {indexEdit === index && (
                          <CardContent className="px-6 py-4 max-h-[25vh] overflow-auto">
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`references.${index}.name`}>
                                    Nome
                                  </Label>
                                  <Input
                                    {...register(`references.${index}.name`)}
                                    defaultValue={field.name}
                                  />
                                  {errors.references?.[index]?.name
                                    ?.message && (
                                    <p className="text-sm text-destructive">
                                      {
                                        errors.references?.[index]?.name
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`references.${index}.phone`}>
                                    Telefone
                                  </Label>
                                  <Controller
                                    control={control}
                                    name={`references.${index}.phone`}
                                    render={({ field }) => (
                                      <PhoneInput {...field} />
                                    )}
                                    defaultValue={field.phone}
                                  />
                                  {errors.references?.[index]?.phone
                                    ?.message && (
                                    <p className="text-sm text-destructive">
                                      {
                                        errors.references?.[index]?.phone
                                          ?.message
                                      }
                                    </p>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor="cep">CEP</Label>
                                  <Controller
                                    name={
                                      `references.${index}.addressData.zipCode` as const
                                    }
                                    control={control}
                                    render={({ field }) => (
                                      <CepInput {...field} />
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData
                                    ?.zipCode?.message && (
                                    <p className="text-sm text-destructive">
                                      {
                                        errors.references?.[index]?.addressData
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
                                      `references.${index}.addressData.address` as const
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData
                                    ?.address?.message && (
                                    <p className={`text-sm text-destructive`}>
                                      {
                                        errors.references?.[index]?.addressData
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
                                      `references.${index}.addressData.city` as const
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData?.city
                                    ?.message && (
                                    <p className={`text-sm text-destructive`}>
                                      {
                                        errors.references?.[index]?.addressData
                                          ?.city?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="state">Estado</Label>
                                  <Input
                                    id="state"
                                    {...register(
                                      `references.${index}.addressData.state` as const
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData
                                    ?.state?.message && (
                                    <p className={`text-sm text-destructive`}>
                                      {
                                        errors.references?.[index]?.addressData
                                          ?.state?.message
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
                                  <Label htmlFor="number">Numero da casa</Label>
                                  <Input
                                    id="number"
                                    {...register(
                                      `references.${index}.addressData.number` as const
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData
                                    ?.number?.message && (
                                    <p className={`text-sm text-destructive`}>
                                      {
                                        errors.references?.[index]?.addressData
                                          ?.number?.message
                                      }
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="complement">
                                    Complemento
                                  </Label>
                                  <Input
                                    id="complement"
                                    {...register(
                                      `references.${index}.addressData.complement` as const
                                    )}
                                  />
                                  {errors.references?.[index]?.addressData
                                    ?.complement?.message && (
                                    <p className={`text-sm text-destructive`}>
                                      {
                                        errors.references?.[index]?.addressData
                                          ?.complement?.message
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        name: '',
                        phone: '',
                        addressData: {
                          address: '',
                          zipCode: '',
                          city: '',
                          state: '',
                          referencePoint: '',
                          number: '',
                          complement: '',
                        },
                      })
                    }
                  >
                    Adicionar nova referência
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {errorMessage && (
            <AlertError
              title="Ops, parece que temos um erro!"
              errorMessage={errorMessage}
            />
          )}
          <DialogFooter className="mt-2">
            <Button
              disabled={isSubmitting}
              className="disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}
