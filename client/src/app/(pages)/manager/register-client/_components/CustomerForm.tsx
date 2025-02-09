/* eslint-disable import/no-unresolved */
'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer } from '@/api/customers/create-customer';
import { PhoneInput } from '@/components/Inputs/phoneInput';
import { CpfInput } from '@/components/Inputs/cpfInput';
import { CepInput } from '@/components/Inputs/cepInput';

import { CustomerStatus } from '../constants/CustomerStatus';
import { formSchema, FormSchema } from '../types/customerYupType';

export default function CustomerForm() {
  const queryClient = useQueryClient();

<<<<<<< HEAD
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer = { ...formData, id: Date.now() }
    
    // Get existing customers from localStorage
    const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    
    // Add new customer
    const updatedCustomers = [...existingCustomers, newCustomer]
    
    // Save to localStorage
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
    
    toast({
      title: "Cliente cadastrado",
      description: `${newCustomer.name} foi adicionado com sucesso.`,
    })
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      residentialAddress: {
        street: '',
        sector: '',
        city: '',
        state: '',
        zipCode: '',
        reference: ''
      },
      cpf: '',
      identityDocument: {
        number: '',
        issuer: ''
      },
      birthDate: '',
      maritalStatus: '',
      clientStatus: '',
      professional: {
        company: '',
        phone: '',
        duration: '',
        address: '',
        sector: '',
        city: '',
        state: '',
        section: '',
        role: ''
      },
      bank: {
        name: '',
        branch: ''
      },
      parents: {
        father: '',
        mother: ''
      },
      commercialInfo: '',
      personalReferences: [
        { name: '', phone: '', address: '' },
        { name: '', phone: '', address: '' }
      ],
      observations: ''
    })
    
    // Redirect to customer list page
    router.push('/manager/register-client')
  }

  const handleInputChange = (path: string, value: string) => {
    const pathArray = path.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current: any = newData
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]]
      }
      current[pathArray[pathArray.length - 1]] = value
      return newData
    })
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalReferences: prev.personalReferences.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }

=======
  const {
    handleSubmit,
    register,
    reset,
    setValue,

    watch,
    control,
    formState: { isSubmitting, errors }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema)
  });

  const cep = watch('cep')?.replace(/\D/g, '');

  // Busca os dados do CEP sempre que ele mudar e tiver 8 dígitos
  useEffect(() => {
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
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
  }, [cep, setValue]);

  const businessCep = watch('businessCep')?.replace(/\D/g, '');

  // Busca os dados do CEP sempre que ele mudar e tiver 8 dígitos
  useEffect(() => {
    if (businessCep && businessCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${businessCep}/json/`)
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
  }, [businessCep, setValue]);

  const { mutateAsync: createCustomerFn } = useMutation({
    mutationFn: createCustomer,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });

  async function handleCreateCustomer(data: FormSchema) {
    try {
      await createCustomerFn({
        name: data.name,
        phone: data.phone,
        email: data.email,
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
        dateBirth: data.dateBirth,
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
        mother: data.mother
      });
      reset();
      toast.success('Cliente cadastrado com sucesso');
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro');
    }
  }

>>>>>>> 4c2894b1a0f819cde3fccbe830981175496985c0
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleCreateCustomer)}
          className='space-y-6'
        >
          {/* Informações Pessoais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Pessoais</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label className='gap-1' htmlFor='name'>
                  Nome <span className='text-muted-foreground'>(Obrigatório)</span>
                </Label>
                <Input id='name' {...register('name')} required />
                {errors.name?.message && (
                  <p className='text-sm text-destructive'>
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Telefone</Label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => <PhoneInput {...field} />}
                />
                {errors.phone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>E-mail</Label>
                <Input id='email' {...register('email')} />
                {errors.email?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Endereço Residencial */}
          <div className='space-y-4'>
            <div className='flex items-center gap-1'>
              <p className='text-end text-lg font-medium'>
                Endereço Residencial
              </p>
              <p className='text-sm text-muted-foreground'>
                (Digite o CEP Primeiro)
              </p>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='cep'>CEP</Label>
                <Controller
                  name='cep'
                  control={control}
                  render={({ field }) => <CepInput {...field} />}
                />
                {errors.cep?.message && (
                  <p className='text-sm text-destructive'>
                    {errors.cep?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Endereço</Label>
                <Input id='address' {...register('address')} />
                {errors.address?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.address?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='city'>Cidade</Label>
                <Input id='city' {...register('city')} />
                {errors.city?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.city?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='state'>Estado</Label>
                <Input id='state' {...register('state')} />
                {errors.state?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.state?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='referencePoint'>Ponto de referência</Label>
                <Input id='referencePoint' {...register('referencePoint')} />
                {errors.referencePoint?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.referencePoint?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='number'>Numero da casa</Label>
                <Input id='number' {...register('number')} />
                {errors.number?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='complement'>Complemento</Label>
                <Input id='complement' {...register('complement')} />
                {errors.complement?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.name?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Documentos */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Documentos</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label className='gap-1' htmlFor='name'>
                  CPF <span className='text-muted-foreground'>(Obrigatório)</span>
                </Label>
                <Controller
                  name='cpf'
                  control={control}
                  render={({ field }) => <CpfInput {...field} />}
                />
                {errors.cpf?.message && (
                  <p className='text-sm text-destructive'>
                    {errors.cpf?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='dataBirth'>Data de nascimento</Label>
                <Input id='dataBirth' type='date' {...register('dateBirth')} />
                {errors.dateBirth?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className='flex flex-col space-y-2'>
                <Label htmlFor='maritalStatus'>Estado civil</Label>
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
                {errors.maritalStatus?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.name?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Informações Profissionais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Profissionais</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='enterprise'>Empresa</Label>
                <Input id='enterprise' {...register('enterprise')} />
                {errors.enterprise?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.enterprise?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessPhone'>Telefone comercial</Label>
                <Controller
                  name='businessPhone'
                  control={control}
                  render={({ field }) => <PhoneInput {...field} />}
                />
                {errors.businessPhone?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessPhone?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lengthService'>Tempo de serviço</Label>
                <Input id='lengthService' {...register('lengthService')} />
                {errors.lengthService?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.lengthService?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessCep'>CEP</Label>
                <Controller
                  name='businessCep'
                  control={control}
                  render={({ field }) => <CepInput {...field} />}
                />
                {errors.businessCep?.message && (
                  <p className='text-sm text-destructive'>
                    {errors.businessCep?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessAddress'>Endereço comercial</Label>
                <Input id='businessAddress' {...register('businessAddress')} />
                {errors.businessAddress?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessAddress?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessCity'>Cidade</Label>
                <Input id='businessCity' {...register('businessCity')} />
                {errors.businessCity?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessCity?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessState'>Estado</Label>
                <Input id='businessState' {...register('businessState')} />
                {errors.businessState?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.businessState?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='businessPosition'>Cargo</Label>
                <Input
                  id='businessPosition'
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
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Bancárias</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='bank'>Banco</Label>
                <Input id='bank' {...register('bank')} />
                {errors.bank?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.bank?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='agency'>Agência</Label>
                <Input id='agency' {...register('agency')} />
                {errors.agency?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.agency?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Filiação */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Filiação</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='father'>Pai</Label>
                <Input id='father' {...register('father')} />
                {errors.father?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.father?.message}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='mother'>Mãe</Label>
                <Input id='mother' {...register('mother')} />
                {errors.mother?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.mother?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            className='disabled:cursor-not-allowed disabled:opacity-70'
            type='submit'
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
