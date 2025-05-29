'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/ui/popover';
import { AxiosError } from 'axios';
import { format, isValid, parseISO, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, Pencil, User, X } from 'lucide-react';
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
import { GetCustomerContent } from '@/_api/customers/_types/type-get-custumer';
import { Calendar } from '@/_components/ui/calendar';

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

  const queryClient = useQueryClient();

  const { data: customer, isLoading: isLoadingGetCustomer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById({ customerId }),
    enabled: open,
    staleTime: 0,
    gcTime: 0,
  });

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
      ...customer,
      name: customer?.name ?? '',
      profile: customer?.profile ?? '',
      cpf: customer?.cpf ?? '',
      dateBirth: customer?.dateBirth,
      references: customer?.referenceEntityList,
    },
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

  const { mutateAsync: updatedCustomerFn } = useMutation({
    mutationFn: updatedCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const errorFields = Object.keys(errors);

  const [activeTab, setActiveTab] = useState({
    key: 'personalinformation',
    error: '',
  });

  useEffect(() => {
    if (errors.name || errors.phone || errors.email) {
      setActiveTab({
        key: 'personalinformation',
        error: 'personalinformation',
      });
    } else if (
      errors.addressData?.zipCode ||
      errors.addressData?.address ||
      errors.addressData?.city ||
      errors.addressData?.state ||
      errors.addressData?.referencePoint ||
      errors.addressData?.number ||
      errors.addressData?.complement
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
      const errorIndex = errors.references.findIndex(
        (ref) =>
          ref &&
          typeof ref === 'object' &&
          (('name' in ref && ref.name?.message) ||
            ('phone' in ref && ref.phone?.message))
      );

      if (errorIndex !== -1) {
        setActiveTab({
          key: 'references',
          error: 'references',
        });

        setIndexEdit([errorIndex]);
      }
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

  const [indexEdit, setIndexEdit] = useState<number[]>([]);

  console.log(indexEdit);

  function handleIsOpenEditReference(index: number) {
    if (indexEdit.includes(index)) {
      setIndexEdit((state) => state.filter((i) => i !== index));
    } else {
      setIndexEdit((state) => [...state, index]);
    }
  }

  const handleDelete = (index: number) => {
    remove(index);
  };

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

  async function handleUpdatedCustomer(data: FormSchemaCustomer) {
    console.log(data);
    try {
      await updatedCustomerFn({
        id: customer?.id!,
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
      setIsOpen(false);
      setActiveTab({
        key: 'personalinformation',
        error: '',
      });
      setIndexEdit([]);
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
            className="w-full max-h-[70vh] overflow-y-auto overflow-x-hidden"
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
                <CardContent className="max-h-[50vh] space-y-2 overflow-y-auto overflow-x-hidden">
                  <div className="space-y-2">
                    <Label className="gap-1" htmlFor="name">
                      Nome
                      <span className="text-muted-foreground">
                        (Obrigatório)
                      </span>
                    </Label>
                    <Input
                      id="name"
                      required={errors.name?.message ? true : false}
                      {...register('name')}
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
                      <p className="text-sm text-destructive">
                        {errors.phone?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      required={errors.email?.message ? true : false}
                      {...register('email')}
                    />
                    {errors.email?.message && (
                      <p className="text-sm text-destructive">
                        {errors.email?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile">Perfil</Label>
                    <select
                      id="profile"
                      required={errors.profile?.message ? true : false}
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
                <CardContent className="max-h-[40vh] space-y-2 overflow-y-auto overflow-x-hidden">
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
                        {errors.addressData?.zipCode?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      required={
                        errors.addressData?.address?.message ? true : false
                      }
                      {...register('addressData.address')}
                    />
                    {errors.addressData?.address?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.address?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      required={
                        errors.addressData?.city?.message ? true : false
                      }
                      {...register('addressData.city')}
                    />
                    {errors.addressData?.city?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.city?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      required={
                        errors.addressData?.state?.message ? true : false
                      }
                      {...register('addressData.state')}
                    />
                    {errors.addressData?.state?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.state?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referencePoint">Ponto de referência</Label>
                    <Input
                      id="referencePoint"
                      required={
                        errors.addressData?.referencePoint?.message
                          ? true
                          : false
                      }
                      {...register('addressData.referencePoint')}
                    />
                    {errors.addressData?.referencePoint?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.referencePoint?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Numero da casa</Label>
                    <Input
                      id="number"
                      required={
                        errors.addressData?.number?.message ? true : false
                      }
                      {...register('addressData.number')}
                    />
                    {errors.addressData?.number?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.number?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      required={
                        errors.addressData?.complement?.message ? true : false
                      }
                      {...register('addressData.complement')}
                    />
                    {errors.addressData?.complement?.message && (
                      <p className="text-sm text-destructive">
                        {errors.addressData?.complement?.message}
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
                <CardContent className="max-h-[50vh] space-y-2 overflow-y-auto overflow-x-hidden">
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
                        // Função para formatar a data em yyyy-MM-dd usando UTC, para evitar o problema de timezone
                        function formatDateToInputValue(date: Date) {
                          if (!date) return '';
                          const d =
                            date instanceof Date ? date : new Date(date);
                          if (isNaN(d.getTime())) return ''; // não é data válida
                          const year = d.getUTCFullYear();
                          const month = String(d.getUTCMonth() + 1).padStart(
                            2,
                            '0'
                          );
                          const day = String(d.getUTCDate()).padStart(2, '0');
                          return `${year}-${month}-${day}`;
                        }

                        // Converte o Date para string yyyy-MM-dd para o input type="date"
                        const dateString = field.value ? formatDateToInputValue(field.value) : '';

                        // Função para atualizar o field.value com Date a partir do input string
                        const onInputChange = (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const val = e.target.value;
                          if (val === '') {
                            field.onChange(undefined); // limpa o valor
                          } else {
                            const parsedDate = parseISO(val);
                            if (isValid(parsedDate)) {
                              field.onChange(parsedDate);
                            }
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
                    <Input
                      id="enterprise"
                      required={errors.enterprise?.message ? true : false}
                      {...register('enterprise')}
                    />
                    {errors.enterprise?.message && (
                      <p className="text-sm text-destructive">
                        {errors.enterprise?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Telefone comercial</Label>
                    <Input
                      id="businessPhone"
                      required={errors.businessPhone?.message ? true : false}
                      {...register('businessPhone')}
                    />
                    {errors.businessPhone?.message && (
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
                        {errors.lengthService?.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessZipCode">CEP</Label>
                    <Controller
                      name="businessZipCode"
                      control={control}
                      render={({ field }) => (
                        <CepInput
                          required={
                            errors.businessZipCode?.message ? true : false
                          }
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
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
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
                <CardContent className="max-h-[40vh] space-y-2 overflow-y-auto overflow-x-hidden">
                  <div className="space-y-2">
                    <Label htmlFor="bank">Banco</Label>
                    <Input
                      id="bank"
                      required={errors.bank?.message ? true : false}
                      {...register('bank')}
                    />
                    {errors.bank?.message && (
                      <p className="text-sm text-destructive">
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
                <CardContent className="max-h-[50vh] space-y-2 overflow-y-auto overflow-x-hidden">
                  <div className="space-y-2">
                    <Label htmlFor="father">Pai</Label>
                    <Input
                      id="father"
                      required={errors.father?.message ? true : false}
                      {...register('father')}
                    />
                    {errors.father?.message && (
                      <p className="text-sm text-destructive">
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
                      <p className="text-sm text-destructive">
                        {errors.mother?.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              className="max-h-[70vh] overflow-auto"
              value="references"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Referências</CardTitle>
                  <CardDescription>
                    Edite as referências pessoais do cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[50vh] space-y-2 overflow-y-auto overflow-x-hidden">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-4">
                      <Card className="space-y-4">
                        <CardHeader
                          className={`p-0 flex-row ${indexEdit.includes(index) && 'border-b'} items-center justify-between w-full gap-2`}
                        >
                          <div
                            className={`bg-background border-r ${indexEdit.includes(index) && 'rounded-bl-none'} px-6 py-4 rounded-lg flex items-center gap-2 w-full justify-start`}
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
                              onClick={() => {
                                handleIsOpenEditReference(index);
                              }}
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
                        <AnimatePresence initial={false}>
                          {indexEdit.includes(index) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="px-6 py-4 max-h-[25vh] overflow-auto">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.name`}
                                      >
                                        Nome
                                      </Label>
                                      <Input
                                        id={`references.${index}.name`}
                                        required={
                                          errors.references?.[index]?.name
                                            ?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.name`
                                        )}
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
                                      <Label
                                        htmlFor={`references.${index}.phone`}
                                      >
                                        Telefone
                                      </Label>
                                      <Controller
                                        control={control}
                                        name={`references.${index}.phone`}
                                        render={({ field }) => (
                                          <PhoneInput
                                            required={
                                              errors.references?.[index]?.phone
                                                ?.message
                                                ? true
                                                : false
                                            }
                                            id={`references.${index}.phone`}
                                            {...field}
                                          />
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
                                          <CepInput
                                            required={
                                              errors.references?.[index]
                                                ?.addressData?.zipCode?.message
                                                ? true
                                                : false
                                            }
                                            id={`references.${index}.zipCode`}
                                            {...field}
                                          />
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.zipCode?.message && (
                                        <p className="text-sm text-destructive">
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.zipCode?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.address`}
                                      >
                                        Endereço
                                      </Label>
                                      <Input
                                        id={`references.${index}.address`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.address?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.address` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.address?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.address?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.city`}
                                      >
                                        Cidade
                                      </Label>
                                      <Input
                                        id={`references.${index}.city`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.city?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.city` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.city?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.city?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.state`}
                                      >
                                        Estado
                                      </Label>
                                      <Input
                                        id={`references.${index}.state`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.state?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.state` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.state?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.state?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.referencePoint`}
                                      >
                                        Ponto de referência
                                      </Label>
                                      <Input
                                        id={`references.${index}.referencePoint`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.referencePoint
                                            ?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.referencePoint` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.referencePoint?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.referencePoint
                                              ?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.number`}
                                      >
                                        Numero da casa
                                      </Label>
                                      <Input
                                        id={`references.${index}.number`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.number?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.number` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.number?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.number?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`references.${index}.complement`}
                                      >
                                        Complemento
                                      </Label>
                                      <Input
                                        id={`references.${index}.complement`}
                                        required={
                                          errors.references?.[index]
                                            ?.addressData?.complement?.message
                                            ? true
                                            : false
                                        }
                                        {...register(
                                          `references.${index}.addressData.complement` as const
                                        )}
                                      />
                                      {errors.references?.[index]?.addressData
                                        ?.complement?.message && (
                                        <p
                                          className={`text-sm text-destructive`}
                                        >
                                          {
                                            errors.references?.[index]
                                              ?.addressData?.complement?.message
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        name: 'Insira um nome',
                        phone: '+5562999999999',
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
