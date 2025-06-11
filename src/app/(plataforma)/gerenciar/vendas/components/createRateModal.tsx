'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRates } from '@/_api/rate/get-rates';
import { createRate } from '@/_api/rate/create-rate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { AlertError } from '@/_components/alert/alert-error';
import { DeleteRate } from '@/_api/rate/delete-rate';
import { Toast } from '@/_components/ui/toast';
import { PercentageInput } from '@/_components/Inputs/rateAmountInput';

import { formSchemaRate, FormSchemaRate } from '../_types/rateYupType';

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function CreateRateModal({ setIsOpen }: ModalProps) {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [rateToDelete, setRateToDelete] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaRate>({
    resolver: yupResolver(formSchemaRate()),
  });

  const { mutateAsync: createRateMutation } = useMutation({
    mutationFn: createRate,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['rates'] });
    },
  });

  const { mutateAsync: deleteRateMutation } = useMutation({
    mutationFn: DeleteRate,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['rates'] });
    },
  });

  function handleDeleteClick(id: string) {
    setRateToDelete(id);
    setModalOpen(true);
  }

  async function confirmDelete() {
    if (!rateToDelete) return;

    try {
      await deleteRateMutation({ rateId: rateToDelete });
      setErrorMessage(null);
    } catch {
      // Erro já tratado no onError da mutação
    } finally {
      setModalOpen(false);
      setRateToDelete(null);
      toast.success('Taxa excluida com sucesso');
    }
  }

  const {
    data: rates,
    isPending,
    error,
  } = useQuery({
    queryKey: ['rates'],
    queryFn: getRates,
  });

  useEffect(() => {
    if (confirmingId) {
      const timer = setTimeout(() => {
        setConfirmingId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [confirmingId]);

  async function handleCreateRate(data: FormSchemaRate) {
    try {
      await createRateMutation({
        rateName: data.rateName,
        rateAmount: data.rateAmount,
        numberInstallments: data?.numberInstallments ?? 0,
      });
      reset();
      setErrorMessage(null);
    } catch (error: unknown) {
      const err = error as AxiosError;

      if (err.response?.data) {
        const errorData = err.response.data as { errors?: string[] };
        const errorMessage =
          errorData.errors?.[0] || 'Erro desconhecido do servidor';
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
      } else {
        setErrorMessage(err.message || 'Erro inesperado');
      }
    }
  }

  return (
    <DialogContent className="max-h-[90vh] w-full overflow-auto ">
      <DialogHeader>
        <DialogTitle>Criar Taxa</DialogTitle>
        <p className="py-2">
          Crie as taxas das suas vendas para ter um maior controle das finanças
        </p>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateRate)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rateName">Nome</Label>
          <Input
            id="rateName"
            required={!!errors.rateName}
            {...register('rateName')}
          />
          {errors.rateName?.message && (
            <p className="text-sm text-destructive">
              {errors.rateName.message}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-start">
          <div className="space-y-2 w-full">
            <Label htmlFor="rateAmount">Taxa(%)</Label>
            <Controller
              control={control}
              name="rateAmount"
              render={({ field }) => (
                <PercentageInput
                  {...field}
                  id="rateAmount"
                  placeholder="Ex: 4.4%"
                />
              )}
            />

            {errors.rateAmount?.message && (
              <p className="text-sm text-destructive">
                {errors.rateAmount.message}
              </p>
            )}
          </div>
          <div className="space-y-2 min-w-36">
            <Label className="gap-1" htmlFor="numberInstallments">
              Parcelas
              <span className="text-muted-foreground">(Opcional)</span>
            </Label>
            <Input
              id="numberInstallments"
              type="number"
              required={!!errors.numberInstallments}
              {...register('numberInstallments')}
            />
            {errors.numberInstallments?.message && (
              <p className="text-sm text-destructive">
                {errors.numberInstallments.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            {isSubmitting ? 'Criando...' : 'Criar Taxa'}
          </Button>
        </div>
      </form>

      <div className="max-h-[20vh] overflow-auto mt-6">
        <Table>
          <TableHeader className="border-b-2">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Taxa(%)</TableHead>
              <TableHead>Parcelas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rates?.map((rate) => {
              const isConfirming = confirmingId === rate.id;

              return (
                <TableRow key={rate.id}>
                  <TableCell>{rate.rateName}</TableCell>
                  <TableCell>{rate.rateAmount}%</TableCell>
                  <TableCell>{rate.numberInstallments}</TableCell>
                  <TableCell className="text-right">
                    <div className="relative inline-block w-10 h-10">
                      <button
                        onClick={() => {
                          if (confirmingId === rate.id) {
                            setConfirmingId(null);
                            handleDeleteClick(rate.id);
                          } else {
                            setConfirmingId(rate.id);
                          }
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-muted text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {confirmingId === rate.id && (
                        <motion.svg
                          className="absolute top-0 left-0 w-10 h-10 pointer-events-none"
                          viewBox="0 0 36 36"
                        >
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="transparent"
                            stroke="#ef4444"
                            strokeWidth="2"
                            opacity={0.2}
                          />
                          <motion.circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="transparent"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeDasharray="100"
                            strokeDashoffset="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 2, ease: 'linear' }}
                          />
                        </motion.svg>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <DialogFooter>
        {errorMessage && (
          <AlertError
            title="Ops, parece que temos um erro!"
            errorMessage={errorMessage}
          />
        )}
      </DialogFooter>

      {/* Modal de confirmação de exclusão */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação de exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta taxa?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContent>
  );
}
