import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  formSchemaSaleInformation,
  FormSchemaSaleInformation,
} from '../../_types/saleInformationDataYupType';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSale } from '@/_providers/sale-provider';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { CpfInput } from '@/_components/Inputs/cpfInput';
import { getCustomers } from '@/_api/customers/get-customers';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandGroup, CommandItem } from '@/_components/ui/command';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { getRates } from '@/_api/rate/get-rates';

import { profileLabels } from '../../../clientes/_constants/customerProfile';
import { paymentLabels, paymentMethod } from '../../_constants/paymentMethod';
import { FinishLater } from './finishLater';

export function Information() {
  const [finishLater, setFinishLater] = useState(false);
  const [customerProfile, setCustomerProfile] = useState('');
  const { setActiveTab, productData, informationData, setInformationData } =
    useSale();
  const [openCpf, setOpenCpf] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openRate, setOpenRate] = useState(false);
  const {
    handleSubmit,
    register,
    watch,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaSaleInformation>({
    resolver: yupResolver(formSchemaSaleInformation({ finishLater: false })),
    defaultValues: {
      customerName: '',
      customerCpf: informationData.customerCpf ?? '',
      discountPercentage: informationData.discountPercentage ?? 0,
      paymentMethod: informationData.paymentMethod ?? '',
      startDate: new Date(),
    },
  });

  // 🔁 Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedData = localStorage.getItem('saleInformation');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.customerCpf) setValue('customerCpf', parsed.customerCpf);
      if (parsed.customerName) setValue('customerName', parsed.customerName);
      if (parsed.discountPercentage)
        setValue('discountPercentage', parsed.discountPercentage);
      if (parsed.paymentMethod) setValue('paymentMethod', parsed.paymentMethod);
      if (parsed.profile) setCustomerProfile(parsed.profile);
      if (parsed.startDate) setValue('startDate', new Date(parsed.startDate));
      if (parsed.endDate) setValue('endDate', new Date(parsed.endDate));
      if (parsed.rateName) setValue('rateName', parsed.rateName);
      if (parsed.rateAmount) setValue('rateAmount', parsed.rateAmount);
      if (parsed.numberInstallments)
        setValue('numberInstallments', parsed.numberInstallments);
    }
  }, [setValue]);

  const cpf = watch('customerCpf');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(cpf || '');
    }, 300);
    return () => clearTimeout(handler);
  }, [cpf]);

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers', debouncedSearch],
    queryFn: () => getCustomers({ cpfFilter: debouncedSearch }),
    enabled: debouncedSearch.length >= 2,
  });

  const { data: rates } = useQuery({
    queryKey: ['rates'],
    queryFn: () => getRates(),
  });

  const nameSearch = watch('customerName');
  const [debouncedName, setDebouncedName] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(nameSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [nameSearch]);

  const { data: customersByName, isLoading: loadingByName } = useQuery({
    queryKey: ['customersByName', debouncedName],
    queryFn: () => getCustomers({ nameFilter: debouncedName }),
    enabled: debouncedName.length >= 2,
  });

  // ✅ Atualizado com salvamento no localStorage
  async function handleAddInformations(data: FormSchemaSaleInformation) {
    try {
      const customerData = await getCustomers({ cpfFilter: data.customerCpf });

      if (!customerData?.content?.length) {
        setError('customerCpf', {
          type: 'manual',
          message: 'Cliente não encontrado.',
        });
        return;
      }

      const selected = customerData.content[0];
      const discount = data.discountPercentage ?? 0;
      const discountAmount = (productData.subtotal * discount) / 100;
      const totalPrice = productData.subtotal - discountAmount;

      setInformationData({
        customerCpf: selected.cpf,
        discountPercentage: data.discountPercentage,
        totalPrice,
        paymentMethod: data.paymentMethod,
        numberInstallments: data.numberInstallments ?? 0,
        endDate: data.endDate,
        startDate: data.startDate,
        rateName: data.rateName,
        rateAmount: data.rateAmount,
      });

      // ✅ Salvar no localStorage
      localStorage.setItem(
        'saleInformation',
        JSON.stringify({
          customerCpf: selected.cpf,
          customerName: selected.name,
          discountPercentage: data.discountPercentage,
          totalPrice,
          paymentMethod: data.paymentMethod,
          numberInstallments: data.numberInstallments ?? 0,
          profile: customerProfile,
          endDate: data.endDate ? data.endDate.toISOString() : null,
          startDate: data.startDate ? data.startDate.toISOString() : null,
          rateName: data.rateName,
          rateAmount: data.rateAmount,
        })
      );

      setActiveTab('overview');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Erro ao buscar cliente. Tente novamente.',
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações</CardTitle>
        <CardDescription>Adicione as informações necessárias</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleAddInformations)}
          className="space-y-4"
        >
          <FinishLater
            errors={errors}
            finishLater={finishLater}
            setFinishLater={setFinishLater}
            control={control}
            setValue={setValue}
          />
          <div className="grid w-full grid-cols-2 gap-4 items-start">
            <div className="space-y-2 relative">
              <Label htmlFor="cpf" className="flex items-center gap-1 w-full">
                CPF do cliente{' '}
                <span className="text-muted-foreground">(Pesquise)</span>
              </Label>

              <Controller
                name="customerCpf"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <CpfInput
                      {...field}
                      id="cpf"
                      autoComplete="off"
                      onFocus={() => setOpenCpf(true)}
                      onBlur={() => setTimeout(() => setOpenCpf(false), 200)}
                    />
                    {openCpf && (
                      <div className="absolute z-50 w-full border rounded-md shadow-md mt-1">
                        <Command>
                          <CommandGroup
                            className="max-h-[30vh] overflow-auto"
                            heading="Resultados"
                          >
                            {customers?.content?.length ? (
                              customers.content.map((customer) => (
                                <CommandItem
                                  key={customer.id}
                                  value={customer.name}
                                  onSelect={() => {
                                    setValue('customerCpf', customer.cpf);
                                    setValue('customerName', customer.name);
                                    setCustomerProfile(customer.profile);
                                    setOpenCpf(false);
                                  }}
                                >
                                  <div className="flex items-start w-full justify-between">
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {customer.name}
                                      </span>
                                      <div className="flex items-center gap-4 justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          CPF: {customer.cpf}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                          Tel: {customer.phone}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      className={`${customerProfile === 'BOM' ? 'text-green-500' : customerProfile === 'MEDIO' ? 'text-yellow-500' : 'text-destructive'}`}
                                    >
                                      {profileLabels[customerProfile]}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))
                            ) : (
                              <div className="text-muted-foreground p-2">
                                Nenhum cliente encontrado
                              </div>
                            )}
                          </CommandGroup>
                        </Command>
                      </div>
                    )}
                  </div>
                )}
              />

              {errors.customerCpf?.message && (
                <p className="text-sm text-destructive">
                  {errors.customerCpf?.message}
                </p>
              )}
            </div>

            <div className="space-y-2 relative">
              <Label
                htmlFor="search-name"
                className="flex items-center justify-between w-full"
              >
                <div>
                  Nome do cliente{' '}
                  <span className="text-muted-foreground">(Pesquise)</span>
                </div>
                <span
                  className={`${customerProfile === 'BOM' ? 'text-green-500' : customerProfile === 'MEDIO' ? 'text-yellow-500' : 'text-destructive'}`}
                >
                  {profileLabels[customerProfile]}
                </span>
              </Label>
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => (
                  <div className="relative">
                    <Input
                      {...field}
                      id="search-name"
                      autoComplete="off"
                      onFocus={() => setOpenName(true)}
                      onBlur={() => setTimeout(() => setOpenName(false), 200)}
                    />
                    {openName && (
                      <div className="absolute z-50 w-full border rounded-md shadow-md mt-1">
                        <Command>
                          <CommandGroup
                            className="max-h-[30vh] overflow-auto"
                            heading="Resultados"
                          >
                            {customersByName?.content?.length ? (
                              customersByName.content.map((customer) => (
                                <CommandItem
                                  key={customer.id}
                                  value={customer.name}
                                  onSelect={() => {
                                    setValue('customerCpf', customer.cpf);
                                    setValue('customerName', customer.name);
                                    setCustomerProfile(customer.profile);
                                    setOpenName(false);
                                  }}
                                >
                                  <div className="flex items-start w-full justify-between">
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {customer.name}
                                      </span>
                                      <div className="flex items-center gap-4 justify-between">
                                        <span className="text-sm text-muted-foreground">
                                          CPF: {customer.cpf}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                          Tel: {customer.phone}
                                        </span>
                                      </div>
                                    </div>
                                    <span
                                      className={`${customerProfile === 'BOM' ? 'text-green-500' : customerProfile === 'MEDIO' ? 'text-yellow-500' : 'text-destructive'}`}
                                    >
                                      {profileLabels[customerProfile]}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))
                            ) : (
                              <div className="text-muted-foreground p-2">
                                Nenhum cliente encontrado
                              </div>
                            )}
                          </CommandGroup>
                        </Command>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex items-start gap-2">
              <div className="space-y-2 w-full">
                <Label htmlFor="edit-category">Método de Pagamento</Label>
                <select
                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('paymentMethod')}
                >
                  <option value="" disabled hidden>
                    Selecione um método de pagamento
                  </option>
                  {paymentMethod?.map((method, index) => (
                    <option
                      className="w-full rounded-sm bg-popover py-1.5 pl-2 pr-8 text-sm outline-none"
                      key={index}
                      value={method}
                    >
                      {paymentLabels[method] || method}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.paymentMethod?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 relative w-full">
                <Label htmlFor="cpf">Taxa</Label>

                <Controller
                  name="rateName"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        id="cpf"
                        autoComplete="off"
                        onFocus={() => setOpenRate(true)}
                        onBlur={() => setTimeout(() => setOpenRate(false), 200)}
                      />
                      {openRate && (
                        <div className="absolute z-50 w-full border rounded-md shadow-md mt-1">
                          <Command>
                            <CommandGroup
                              className="max-h-[30vh] overflow-auto"
                              heading="Resultados"
                            >
                              {rates?.length ? (
                                rates.map((rate) => (
                                  <CommandItem
                                    key={rate.id}
                                    value={rate.rateName}
                                    onSelect={() => {
                                      setValue('rateAmount', rate.rateAmount);
                                      setValue('rateName', rate.rateName);
                                      setValue(
                                        'numberInstallments',
                                        rate.numberInstallments
                                      );
                                      setOpenRate(false);
                                    }}
                                  >
                                    <div className="flex items-start w-full justify-between">
                                      <div className="flex flex-col">
                                        <span className="font-medium">
                                          {rate.rateName}
                                        </span>
                                        <div className="flex items-center gap-4 justify-between">
                                          <span className="text-sm text-muted-foreground">
                                            Taxa: {rate.rateAmount}%
                                          </span>
                                          <span className="text-sm text-muted-foreground">
                                            Parcelas: {rate.numberInstallments}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </CommandItem>
                                ))
                              ) : (
                                <div className="text-muted-foreground p-2">
                                  Nenhuma taxa encontrado
                                </div>
                              )}
                            </CommandGroup>
                          </Command>
                        </div>
                      )}
                    </div>
                  )}
                />

                {errors.rateName?.message && (
                  <p className="text-sm text-destructive">
                    {errors.rateName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Desconto (%)</Label>
              <Input
                type="number"
                id="discountPercentage"
                {...register('discountPercentage')}
              />
              {errors.discountPercentage?.message && (
                <p className="text-sm text-destructive">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>
          </div>
          <TabsList asChild>
            <TabsTrigger value="product" asChild>
              <Button
                variant="outline"
                className="disabled:cursor-not-allowed disabled:opacity-70 mr-2"
              >
                Voltar
              </Button>
            </TabsTrigger>
          </TabsList>
          <Button
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70 bg-green-500 text-background col-span-1 font-bold hover:bg-green-600"
            type="submit"
          >
            Ver Resumo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
