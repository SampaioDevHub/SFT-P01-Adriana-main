import { format } from 'date-fns';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Checkbox } from '@/_components/ui/checkbox';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';

import { FormSchemaSaleInformation } from '../../_types/saleInformationDataYupType';


interface FinishLaterProps {
  register: UseFormRegister<FormSchemaSaleInformation>;
  errors: FieldErrors<FormSchemaSaleInformation>;
  finishLater: boolean;
  setFinishLater: (value: boolean) => void; // Nova prop para atualizar o estado no SaleForm
}

export function FinishLater({
  register,
  errors,
  finishLater,
  setFinishLater,
}: FinishLaterProps) {
  const savedData = JSON.parse(localStorage.getItem('saleInformation') || 'null');
  return (
    <div className="flex flex-col items-start justify-center space-y-4 w-full">
      <div className="flex items-center justify-start gap-2 space-x-2 rounded">
        <Checkbox
          id="complete-later"
          checked={savedData?.endDate ? true : finishLater}
          onCheckedChange={(value) => setFinishLater(value === true)}
          className="border-[0.5px] border-muted-foreground data-[state=checked]:bg-muted-foreground data-[state=checked]:text-card"
        />
        <Label
          htmlFor="complete-later"
          className="cursor-pointer text-[12px] font-normal caret-card-foreground"
        >
          Gostaria de concluir esta venda depois?
        </Label>
      </div>
      {(savedData?.endDate || finishLater) && (
        <div className=" flex space-x-4 items-start justify-center">
          <div className="text-sm">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Atual</Label>
              <Input
                defaultValue={format(new Date(), 'yyyy-MM-dd')}
                id="startDate"
                type="date"
                {...register('startDate')}
              />
              {errors.startDate?.message && (
                <p className={`text-sm text-destructive`}>
                  {errors.startDate?.message}
                </p>
              )}
            </div>
          </div>
          <div className="text-sm">
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Entrega</Label>
              <Input id="endDate" type="date" {...register('endDate')} />
              {errors.endDate?.message && (
                <p className={`text-sm text-destructive`}>
                  {errors.endDate?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
