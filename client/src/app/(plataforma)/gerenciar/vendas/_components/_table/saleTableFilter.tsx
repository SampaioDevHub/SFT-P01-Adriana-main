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
  name: yup.string(),
  code: yup.string(),
  category: yup.string(),
});

type FormSchema = yup.InferType<typeof formSchema>;

export function SaleTableFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nameFilter = searchParams.get('name') ?? '';
  const codeFilter = searchParams.get('code') ?? '';
  const categoryFilter = searchParams.get('category') ?? '';

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
      category: categoryFilter ?? '',
      code: codeFilter ?? '',
      name: nameFilter ?? '',
    },
  });

  function handleSubmitFilter(data: FormSchema) {
    const newParams = new URLSearchParams(searchParams);

    if (data.name) {
      newParams.set('name', (data.name ?? '').toString());
    } else {
      newParams.delete('name');
    }

    if (data.code) {
      newParams.set('code', (data.code ?? '').toString());
    } else {
      newParams.delete('code');
    }

    if (data.category) {
      newParams.set(
        'category',
        (data.category !== 'all' ? data.category : '').toString()
      );
    } else {
      newParams.delete('category');
    }

    newParams.set('page', '1');

    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleClearFilters() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('name');
    newParams.delete('code');
    newParams.delete('category');
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);

    reset(), setValue('category', '');
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFilter)}
      className="flex w-full items-center gap-2"
    >
      <span className="text-sm">Filtros:</span>
      <Input {...register('name')} placeholder="Nome do produto" />
      <Input
        {...register('code')}
        placeholder="Código do Produto"
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      />
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="max-w-[11rem]">
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Roupas">Roupas</SelectItem>
              <SelectItem value="Acessórios">Acessórios</SelectItem>
              <SelectItem value="Perfumaria">Perfumaria</SelectItem>
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
