import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/_components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { Label } from '@/_components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/_components/ui/input';
import { CpfInput } from '@/_components/Inputs/cpfInput';

import { formSchema, FormSchema } from '../../_types/saleYupType';

export function AddClient() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema({ finishLater: false })),
  });

  function handleAddProduct(data: FormSchema) {
    data;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achar Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleAddProduct)} className="space-y-4">
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
                Método de pagamento
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
          </div>
          <Button
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
          >
            Ver Resumo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
