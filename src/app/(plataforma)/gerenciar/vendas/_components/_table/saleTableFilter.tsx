import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';

const formSchema = yup.object().shape({
  cpf: yup.string(),
  status: yup.string(),
  price: yup.string(),
});

type FormSchema = yup.InferType<typeof formSchema>;

export function SaleTableFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const cpfFilter = searchParams.get('cpf') ?? '';
  const statusFilter = searchParams.get('status') ?? '';
  const priceFilter = searchParams.get('price') ?? '';

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      cpf: cpfFilter ?? '',
      status: statusFilter ?? '',
      price: priceFilter ?? '',
    },
  });

  function handleSubmitFilter(data: FormSchema) {
    const newParams = new URLSearchParams(searchParams);

    if (data.cpf) {
      newParams.set('cpf', (data.cpf ?? '').toString());
    } else {
      newParams.delete('cpf');
    }

    if (data.status) {
      newParams.set(
        'status',
        (data.status !== 'all' ? data.status : '').toString()
      );
    } else {
      newParams.delete('status');
    }

    if (data.price) {
      newParams.set('price', (data.price ?? '').toString());
    } else {
      newParams.delete('price');
    }

    newParams.set('page', '1');

    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleClearFilters() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('cpf');
    newParams.delete('status');
    newParams.delete('price');
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);

    reset(), setValue('status', '');
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFilter)}
      className="flex w-full items-center gap-2"
    >
      <span className="text-sm">Filtros:</span>
      <Input {...register('cpf')} placeholder="CPF do client" />
      <Input {...register('price')} placeholder="Preço da venda" />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="max-w-[11rem]">
              <SelectValue placeholder="Status da Venda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="FINALIZADO">Finalizado</SelectItem>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button
        disabled={isSubmitting}
        className="text-nowrap whitespace-nowrap  disabled:cursor-not-allowed disabled:opacity-70"
        variant="secondary"
        type="submit"
      >
        <Search className="mr-2 h-[1rem] w-[1rem]" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        variant="outline"
        type="button"
        disabled={isSubmitting}
        className="text-nowrap whitespace-nowrap  disabled:cursor-not-allowed disabled:opacity-70"
      >
        <X className="mr-2 h-[1rem] w-[1rem]" />
        Remover filtros
      </Button>
    </form>
  );
}
