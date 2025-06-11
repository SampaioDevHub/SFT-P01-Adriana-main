import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from '@/_components/ui/popover';
import { isValid, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { Checkbox } from '@/_components/ui/checkbox';
import { Label } from '@/_components/ui/label';
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { Calendar } from '@/_components/ui/calendar';
import { useSale } from '@/_providers/sale-provider';

import { FormSchemaSaleInformation } from '../../_types/saleInformationDataYupType';

interface FinishLaterProps {
  control: Control<FormSchemaSaleInformation>;
  errors: FieldErrors<FormSchemaSaleInformation>;
  finishLater: boolean;
  setFinishLater: (value: boolean) => void;
  setValue: (field: keyof FormSchemaSaleInformation, value: any) => void;
}

function formatDateToInputValue(date: Date | string) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function FinishLater({
  control,
  errors,
  finishLater,
  setValue,
  setFinishLater,
}: FinishLaterProps) {

  const {informationData} = useSale()

   // Ativa o checkbox automaticamente se já existir uma data final válida
  useEffect(() => {
    if ( informationData.endDate && isValid(new Date(informationData.endDate))) {
      setFinishLater(true);
    }
  }, []); // Só na montagem inicial

  // Limpa os campos se o checkbox for desmarcado
  useEffect(() => {
    if (!finishLater) {
      setValue('startDate', undefined);
      setValue('endDate', undefined);
    }
  }, [finishLater, setValue]);

  return (
    <div className="flex flex-col items-start justify-center space-y-4 w-full">
      <div className="flex items-center justify-start gap-2">
        <Checkbox
          id="complete-later"
          checked={finishLater}
          onCheckedChange={(value) => setFinishLater(value === true)}
          className="border-[0.5px] border-muted-foreground data-[state=checked]:bg-muted-foreground data-[state=checked]:text-card"
        />
        <Label
          htmlFor="complete-later"
          className="cursor-pointer text-[12px] font-normal"
        >
          Gostaria de concluir esta venda depois?
        </Label>
      </div>

      {finishLater && (
        <div className="flex space-x-4 items-start justify-center">
          {/* Data Atual */}
          <div className="text-sm space-y-2">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => {
                const dateString = formatDateToInputValue(field.value ?? '');

                const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  if (val === '') {
                    field.onChange(undefined);
                  } else {
                    const parsedDate = parseISO(val);
                    if (isValid(parsedDate)) {
                      field.onChange(parsedDate);
                    }
                  }
                };

                return (
                  <>
                    <label className="text-sm font-medium">Data Atual</label>
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
                            onSelect={(date) => field.onChange(date ?? undefined)}
                            initialFocus
                            toYear={new Date().getFullYear()}
                            fromYear={1900}
                            locale={ptBR}
                            className="rounded-md"
                            classNames={{
                              caption_label: 'hidden',
                              caption_dropdowns: 'flex justify-center items-center gap-1 [&>label]:sr-only',
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

                    {errors.startDate && (
                      <p className="text-sm text-destructive">{errors.startDate.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>

          {/* Data Final */}
          <div className="text-sm space-y-2">
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => {
                const dateString = formatDateToInputValue(field.value ?? '');

                const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const val = e.target.value;
                  if (val === '') {
                    field.onChange(undefined);
                  } else {
                    const parsedDate = parseISO(val);
                    if (isValid(parsedDate)) {
                      field.onChange(parsedDate);
                    }
                  }
                };

                return (
                  <>
                    <label className="text-sm font-medium">Data Final</label>
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
                            onSelect={(date) => field.onChange(date ?? undefined)}
                            initialFocus
                            toYear={new Date().getFullYear()}
                            fromYear={1900}
                            locale={ptBR}
                            className="rounded-md"
                            classNames={{
                              caption_label: 'hidden',
                              caption_dropdowns: 'flex justify-center items-center gap-1 [&>label]:sr-only',
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

                    {errors.endDate && (
                      <p className="text-sm text-destructive">{errors.endDate.message}</p>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
