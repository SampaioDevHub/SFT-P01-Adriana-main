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
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SaleInformationData, useSale } from '@/_providers/saleContext';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { CpfInput } from '@/_components/Inputs/cpfInput';
import { getCustomers } from '@/_api/customers/get-customers';
import { useQuery } from '@tanstack/react-query';
import { Command, CommandGroup, CommandItem } from '@/_components/ui/command';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';

import { profileLabels } from '../../../clientes/_constants/customerProfile';
import { paymentLabels, paymentMethod } from '../../_constants/paymentMethod';

export function Information() {
  const [customerProfile, setCustomerProfile] = useState('');
  const { setActiveTab, productData, informationData, setInformationData } =
    useSale();
  const [openCpf, setOpenCpf] = useState(false);
  const [openName, setOpenName] = useState(false);
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

      const infoToSave = {
        customerCpf: selected.cpf,
        customerName: selected.name,
        discountPercentage: data.discountPercentage,
        totalPrice,
        paymentMethod: data.paymentMethod,
        numberInstallments: 0,
        profile: customerProfile
      };

      setInformationData(infoToSave);

      // ✅ Salvar no localStorage
      localStorage.setItem('saleInformation', JSON.stringify(infoToSave));

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
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="cpf">
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
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {customer.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      CPF: {customer.cpf}
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
                                  <div className="flex flex-col">
                                    <span className="font-medium">
                                      {customer.name}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      CPF: {customer.cpf}
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

            <div className="space-y-2">
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
