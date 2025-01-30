import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProducts } from '@/api/get-products';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

const formSchema = yup.object().shape({
  name: yup.string(),
  code: yup.string(),
  category: yup.string()
});

type FormSchema = yup.InferType<typeof formSchema>;

export function ProductTableFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nameFilter = searchParams.get("name") ?? ''
  const codeFilter = searchParams.get("code") ?? ''
  const categoryFilter = searchParams.get("category") ?? ''

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { isSubmitting }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      category: categoryFilter ?? '',
      code: codeFilter ?? '',
      name: nameFilter ?? 'all',
    }
  });

  function handleSubmitFilter(data: FormSchema) {
    const newParams = new URLSearchParams(searchParams);

    if (data.name) {
      newParams.set("name", (data.name ?? '').toString());
    }else {
      newParams.delete("name");
    }

    if (data.code) {
      newParams.set("code", (data.code ?? '').toString());
    }else {
      newParams.delete("code");
    }

    if (data.category) {
      newParams.set("category", (data.category ?? '').toString());
    }else {
      newParams.delete("category");
    }

    newParams.set("page", "1");

    router.push(`${pathname}?${newParams.toString()}`)
  }

  function handleClearFilters() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("name");
    newParams.delete("code");
    newParams.delete("category");
    newParams.set("page", "1");
    router.push(`${pathname}?${newParams.toString()}`)

    reset(),
    setValue('category', '')
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFilter)}
      className='flex w-full items-center gap-2'
    >
      <span className='text-sm font-semibold'>Filtros:</span>
      <Input {...register('name')} placeholder='Nome do produto'/>
      <Input
        {...register('code')}
        placeholder='Código do Produto'
        disabled
        className='overflow-hidden text-ellipsis whitespace-nowrap'
      />
      <Controller
        control={control}
        name='category'
        render={({ field }) => (
          <Select disabled onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className='max-w-[11rem]'>
              <SelectValue placeholder='Categorias' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos</SelectItem>
              <SelectItem value='Roupas'>Roupas</SelectItem>
              <SelectItem value='Acessórios'>Acessórios</SelectItem>
              <SelectItem value='Perfumaria'>Perfumaria</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button
        disabled={isSubmitting}
        className='text-nowrap disabled:cursor-not-allowed disabled:opacity-70'
        variant='secondary'
        type='submit'
      >
        <Search className='mr-2 h-[1rem] w-[1rem]' />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        variant='outline'
        type='button'
        disabled={isSubmitting}
        className='disabled:cursor-not-allowed disabled:opacity-70 text-nowrap'
      >
        <X className='mr-2 h-[1rem] w-[1rem]' />
        Remover filtros
      </Button>
    </form>
  );
}
