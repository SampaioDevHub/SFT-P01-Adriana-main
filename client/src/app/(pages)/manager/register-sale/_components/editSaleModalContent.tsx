'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/_components/ui/dialog';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSalesById } from '@/_api/sales/get-sale-by-id';
import { updatedSale } from '@/_api/sales/updated-sale';
import { AlertError } from '@/_components/alert/alert-error';
import { CpfInput } from '@/_components/Inputs/cpfInput';

import { formSchema, FormSchema } from '../_types/saleYupType';
import { EditSaleContentSkeleton } from './_skeleton/editSaleContentSkeleton';
import { FinishLater } from './finishLater';

interface ModalProps {
  saleId: string;
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EditSaleModalContent({ saleId, setIsOpen, open }: ModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [finishLater, setFinishLater] = useState(false);

  const queryClient = useQueryClient();

  const { data: sale, isLoading: isLoadingGetSale } = useQuery({
    queryKey: ['sale'],
    queryFn: () => getSalesById({ saleId }),
    enabled: open,
    staleTime: 0, // Sempre buscar novos dados
    gcTime: 0, // Remove do cache imediatamente
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema({})),
  });

  const {  } = useMutation({
    mutationFn: updatedSale,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sale'] });
    },
  });

  async function handleUpdatedSale(data: FormSchema) {
    try {
      reset();
      setIsOpen(false);
      setErrorMessage(null);
      toast.success('Venda atualizada com sucesso');
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
      </DialogHeader>
      {isLoadingGetSale && <EditSaleContentSkeleton />}
      {sale && (
        <form onSubmit={handleSubmit(handleUpdatedSale)} className="space-y-4">
          <FinishLater
            register={register}
            errors={errors}
            finishLater={finishLater}
            setFinishLater={setFinishLater} // Passando o estado de controle para FinishLater
          />
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
        </form>
      )}
      {errorMessage && (
        <AlertError
          title="Ops, parece que temos um erro!"
          errorMessage={errorMessage}
        />
      )}
      <DialogFooter>
        <Button
          form="myForm"
          disabled={isSubmitting}
          className="disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
