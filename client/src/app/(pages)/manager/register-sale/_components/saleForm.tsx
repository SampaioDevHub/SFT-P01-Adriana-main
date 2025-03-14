/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { CpfInput } from '@/_components/Inputs/cpfInput';

import { formSchema, FormSchema } from '../_types/saleYupType';
import { FinishLater } from './finishLater';
import { TableOfSelectedProducts } from './tableOfSelectedProducts';
import Overview from './Overview';

export function SaleForm() {
  const [finishLater, setFinishLater] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema({ finishLater })),
  });

  function handleAddProduct(data: FormSchema) {
    data;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Nova Venda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
            <FinishLater
              register={register}
              errors={errors}
              finishLater={finishLater}
              setFinishLater={setFinishLater} // Passando o estado de controle para FinishLater
            />
            <div className="grid w-full grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="customer">
                  CPF do Cliente
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field }) => <CpfInput {...field} />}
                />
                {errors.customer?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.customer?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="gap-1" htmlFor="productDiscountPercentage">
                  Desconto(%)
                  <span className="text-muted-foreground"></span>
                </Label>
                <Input
                  type="number"
                  id="discountPercentage"
                  {...register('discountPercentage')}
                />
                {errors.discountPercentage?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.discountPercentage?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 col-span-2">
                <Label className="gap-1" htmlFor="customer">
                  Código do Produto
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>
                <Input
                  id="code"
                  {...register(`productResponses.${0}.code` as const)}
                />
                {errors.productResponses?.[0]?.code?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.productResponses?.[0]?.code?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="gap-1" htmlFor="name">
                  Nome do Produto
                  <span className="text-muted-foreground">(Pesquise)</span>
                </Label>
                <Input
                  id="name"
                  {...register(`productResponses.${0}.name` as const)}
                />
                {errors.productResponses?.[0]?.name?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.productResponses?.[0]?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="gap-1" htmlFor="amount">
                  Quantidade
                  <span className="text-muted-foreground"></span>
                </Label>
                <Input
                  id="amount"
                  {...register(`productResponses.${0}.amount` as const)}
                />
                {errors.productResponses?.[0]?.amount?.message && (
                  <p className={`text-sm text-destructive`}>
                    {errors.productResponses?.[0]?.amount?.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              variant="secondary"
              className="disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar Produto'}
            </Button>
            <TableOfSelectedProducts />
          </form>
        </CardContent>
      </Card>
      <Overview />
    </div>
  );
}
