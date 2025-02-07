/* eslint-disable import/no-unresolved */
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { PenLine, Trash, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCustomerById } from '@/api/customers/get-customer-by-id';
import { updatedCustomer } from '@/api/customers/updated-customer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import { CustomerStatus } from '../constants/CustomerStatus';
import { EditCustomerContentSkeleton } from './_skeleton/editCustomerContentSkeleton';

const formSchema = yup.object({
  name: yup.string().required('Informe o nome do cliente'),
  phone: yup.string(),
  address: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  city: yup.string(),
  state: yup.string(),
  cep: yup.string(),
  referencePoint: yup.string(),
  cpf: yup.string().required('Informe o CPF do cliente'),
  dataBirth: yup.string(),
  maritalStatus: yup.string(),
  enterprise: yup.string(),
  businessPhone: yup.string(),
  lengthService: yup.string(),
  businessAddress: yup.string(),
  businessCity: yup.string(),
  businessState: yup.string(),
  businessPosition: yup.string(),
  bank: yup.string(),
  agency: yup.string(),
  father: yup.string(),
  mother: yup.string(),
  referenceName: yup.string(),
  referencePhone: yup.string(),
  referenceCep: yup.string(),
  referenceAddress: yup.string(),
  referenceSector: yup.string(),
  referenceNumber: yup.string(),
  referenceComplement: yup.string(),
  referenceCity: yup.string(),
  referenceState: yup.string()
});

type FormSchema = yup.InferType<typeof formSchema>;

interface ModalProps {
  customerId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditCustomerModalContent({
  customerId,
  setIsOpen,
  open
}: ModalProps) {
  const queryClient = useQueryClient();

  const [isEditReference, setIsEditReference] = useState('');

  const referenceEntity = [
    {
      id: 's',
      name: 'string',
      phone: 'string',
      addressData: {
        zipCode: 'string',
        address: 'string',
        number: 'string',
        complement: 'string',
        referencePoint: 'string',
        city: 'string',
        state: 'string'
      }
    },
    {
      id: 'sd',
      name: 'string',
      phone: 'string',
      addressData: {
        zipCode: 'string',
        address: 'string',
        number: 'string',
        complement: 'string',
        referencePoint: 'string',
        city: 'string',
        state: 'string'
      }
    }
  ];

  const { data: customer, isLoading: isLoadingGetCustomer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById({ customerId }),
    enabled: open,
    staleTime: 0,
    gcTime: 0
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: async () => {
      const customer = await getCustomerById({ customerId });
      return {
        name: customer?.name ?? '',
        phone: customer?.phone ?? '',
        zipCode: customer?.addressData.zipCode ?? '',
        address: customer?.addressData.address ?? '',
        number: customer?.addressData.number ?? '',
        complement: customer?.addressData.complement ?? '',
        referencesPont: customer?.addressData.referencePoint ?? '',
        city: customer?.addressData.city ?? '',
        state: customer?.addressData.state ?? '',
        cpf: customer?.cpf ?? '',
        dataBirth: customer?.dataBirth ?? '',
        maritalStatus: customer?.maritalStatus ?? '',
        enterprise: customer?.enterprise ?? '',
        businessPhone: customer?.businessPhone ?? '',
        lengthService: customer?.lengthService ?? '',
        businessAddress: customer?.businessAddress ?? '',
        businessCity: customer?.businessCity ?? '',
        businessState: customer?.businessState ?? '',
        businessPosition: customer?.businessPosition ?? '',
        bank: customer?.bank ?? '',
        agency: customer?.agency ?? '',
        father: customer?.father ?? '',
        mother: customer?.mother ?? ''
      };
    }
  });

  const { mutateAsync: updatedCustomerFn } = useMutation({
    mutationFn: updatedCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  async function handleUpdatedCustomer(data: FormSchema) {
    try {
      await updatedCustomerFn({
        id: customer?.id ?? '',
        name: data.name,
        phone: data.phone,
        addressData: {
          zipCode: data.cep,
          address: data.address,
          number: data.number,
          complement: data.complement,
          referencePoint: data.referencePoint,
          city: data.city,
          state: data.state
        },
        cpf: data.cpf,
        dataBirth: data.dataBirth,
        maritalStatus: data.maritalStatus,
        enterprise: data.enterprise,
        businessPhone: data.businessPhone,
        lengthService: data.lengthService,
        businessAddress: data.businessAddress,
        businessCity: data.businessCity,
        businessState: data.businessState,
        businessPosition: data.businessPosition,
        bank: data.bank,
        agency: data.agency,
        father: data.father,
        mother: data.mother,
      });
      reset();
      setIsOpen(false);
      toast.success('Cliente atualizado com sucesso');
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro');
    }
  }

  return (
    <DialogContent
      title='noButtonClose'
      className='m-0 w-full border-0 bg-transparent p-0 pt-6'
    >
      <DialogTitle className='flex items-center justify-between'>
        Edite os dados do cliente
        <DialogClose>
          <X className='h-5 w-5 text-muted-foreground' />
        </DialogClose>
      </DialogTitle>
      {isLoadingGetCustomer && <EditCustomerContentSkeleton />}
      {customer && (
        <form onSubmit={handleSubmit(handleUpdatedCustomer)}>
          <Tabs defaultValue='personalInformation' className='w-full'>
            <TabsList className='grid grid-cols-4'>
              <TabsTrigger value='personalInformation'>Pessoais</TabsTrigger>
              <TabsTrigger value='homeAddress'>Endereço</TabsTrigger>
              <TabsTrigger value='documents'>Documentos</TabsTrigger>
              <TabsTrigger value='professionals'>Profissionais</TabsTrigger>
              <TabsTrigger value='banking'>Bancárias</TabsTrigger>
              <TabsTrigger value='affiliation'>Filiação</TabsTrigger>
              <TabsTrigger value='references'>Referências</TabsTrigger>
            </TabsList>
            <TabsContent value='personalInformation'>
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Edite as informações pessoais do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Nome</Label>
                    <Input
                      id='name'
                      placeholder='Nome do cliente'
                      {...register('name')}
                      required
                    />
                    {errors.name?.message && (
                      <p className={`text-sm text-destructive`}>
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Telefone</Label>
                    <Input
                      id='phone'
                      placeholder='Telefone do cliente'
                      {...register('phone')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='homeAddress'>
              <Card>
                <CardHeader>
                  <CardTitle>Endereço Residencial</CardTitle>
                  <CardDescription>
                    Edite o endereço residencial do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='max-h-[40vh] space-y-2 overflow-y-auto overflow-x-hidden'>
                  <div className='space-y-2'>
                    <Label htmlFor='address'>Endereço</Label>
                    <Input
                      id='address'
                      placeholder='Endereço do cliente'
                      {...register('address')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>Cidade</Label>
                    <Input
                      id='city'
                      placeholder='Cidade do cliente'
                      {...register('city')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='state'>Estado</Label>
                    <Input
                      id='state'
                      placeholder='Estado do cliente'
                      {...register('state')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cep'>CEP</Label>
                    <Input
                      id='cep'
                      placeholder='CEP do cliente'
                      {...register('cep')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='referencePoint'>Ponto de referência</Label>
                    <Input
                      id='referencePoint'
                      placeholder='Setor(Bairro) do cliente'
                      {...register('referencePoint')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='number'>Numero da casa</Label>
                    <Input
                      id='number'
                      placeholder='Numero da casa do cliente'
                      {...register('number')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='complement'>Complemento</Label>
                    <Input
                      id='complement'
                      placeholder='Complemento do endereço do cliente'
                      {...register('complement')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='documents'>
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>
                    Edite os documentos do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='cpf'>CPF</Label>
                    <Input
                      id='cpf'
                      placeholder='CPF do cliente'
                      {...register('cpf')}
                      required
                    />
                    {errors.cpf?.message && (
                      <p className={`text-sm text-destructive`}>
                        {errors.cpf?.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='dataBirth'>Data de nascimento</Label>
                    <Input
                      id='dataBirth'
                      placeholder='Data de nascimento do cliente'
                      {...register('dataBirth')}
                    />
                  </div>
                  <div className='flex flex-col space-y-2'>
                    <Label htmlFor='maritalStatus'>Categoria</Label>
                    <select
                      defaultValue='all'
                      className='flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                      {...register('maritalStatus')}
                    >
                      <option value='all' disabled hidden>
                        Selecione um status
                      </option>
                      {CustomerStatus?.map((status, index) => (
                        <option
                          className='w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none'
                          key={index}
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='professionals'>
              <Card>
                <CardHeader>
                  <CardTitle>Informações Profissionais</CardTitle>
                  <CardDescription>
                    Edite as informações profissionais do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='max-h-[40vh] space-y-2 overflow-y-auto overflow-x-hidden'>
                  <div className='space-y-2'>
                    <Label htmlFor='enterprise'>Empresa</Label>
                    <Input
                      id='enterprise'
                      placeholder='Nome da empresa'
                      {...register('enterprise')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessPhone'>Telefone comercial</Label>
                    <Input
                      id='businessPhone'
                      placeholder='Telefone da empresa'
                      {...register('businessPhone')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='lengthService'>Tempo de serviço</Label>
                    <Input
                      id='lengthService'
                      placeholder='Quanto tempo ficou na empresa'
                      {...register('lengthService')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessAddress'>Endereço comercial</Label>
                    <Input
                      id='businessAddress'
                      placeholder='Endereço da empresa'
                      {...register('businessAddress')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessCity'>Cidade</Label>
                    <Input
                      id='businessCity'
                      placeholder='Cidade da empresa'
                      {...register('businessCity')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessState'>Estado</Label>
                    <Input
                      id='businessState'
                      placeholder='Estado da empresa'
                      {...register('businessState')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessPosition'>Cargo</Label>
                    <Input
                      id='businessPosition'
                      placeholder='Com o que o cliente trabalha'
                      {...register('businessPosition')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='banking'>
              <Card>
                <CardHeader>
                  <CardTitle>Informações Bancarias</CardTitle>
                  <CardDescription>
                    Edite as informações bancarias do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='bank'>Banco</Label>
                    <Input
                      id='bank'
                      placeholder='Banco do cliente'
                      {...register('bank')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='agency'>Agência</Label>
                    <Input
                      id='agency'
                      placeholder='Agência do cliente'
                      {...register('agency')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='affiliation'>
              <Card>
                <CardHeader>
                  <CardTitle>Afiliação</CardTitle>
                  <CardDescription>
                    Edite as informações de afiliação do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='father'>Pai</Label>
                    <Input
                      id='father'
                      placeholder='Pai do cliente'
                      {...register('father')}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='mother'>Mãe</Label>
                    <Input
                      id='mother'
                      placeholder='Mãe do cliente'
                      {...register('mother')}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value='references'>
              <Card>
                <CardHeader>
                  <CardTitle>Referências Pessoais</CardTitle>
                  <CardDescription>
                    Edite ou adicione referências pessoais do seu cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-2'>
                  {customer.referenceEntityList?.map((reference) => {
                    return (
                      <div key={reference.id} className='space-y-2'>
                        {isEditReference !== reference.id && (
                          <div className='flex gap-2'>
                            <div className='flex w-full items-center gap-4 rounded-md bg-background px-3 py-2'>
                              <div>
                                <p className='text-lg'>{reference.name}</p>
                                <span className='text-sm text-muted-foreground'>
                                  {reference.phone}
                                </span>
                              </div>
                              <Separator orientation='vertical' />
                              <div>
                                <p className='text-lg'>
                                  {reference.addressData.city}
                                </p>
                                <span className='text-sm text-muted-foreground'>
                                  {reference.addressData.state}
                                </span>
                              </div>
                            </div>
                            <div className='flex items-center gap-2'>
                              <Button
                                onClick={() => setIsEditReference(reference.id)}
                                variant='link'
                                className='h-8 w-8 p-0'
                              >
                                <PenLine className='h-5 w-5 text-foreground' />
                              </Button>
                              <Button variant='link' className='h-8 w-8 p-0'>
                                <Trash className='h-5 w-5 text-destructive' />
                              </Button>
                            </div>
                          </div>
                        )}
                        {isEditReference === reference.id &&
                          <div className='space-y-2'>
                            <div className='space-y-2'>
                              <Label htmlFor='father'>Pai</Label>
                              <Input
                                id='father'
                                placeholder='Pai do cliente'
                                {...register('father')}
                              />
                            </div>
                            <div className='space-y-2'>
                              <Label htmlFor='mother'>Mãe</Label>
                              <Input
                                id='mother'
                                placeholder='Mãe do cliente'
                                {...register('mother')}
                              />
                            </div>
                          </div>
                        }
                      </div>
                    );
                  })}
                  <Button variant='outline'>Adicionar nova Referência</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <DialogFooter className='mt-2'>
            <Button
              disabled={isSubmitting}
              className='disabled:cursor-not-allowed disabled:opacity-70'
              type='submit'
            >
              {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}
