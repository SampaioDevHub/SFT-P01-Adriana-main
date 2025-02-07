import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = yup.object().shape({
  name: yup.string(),
  cpf: yup.string(),
  phone: yup.string()
});

type FormSchema = yup.InferType<typeof formSchema>;

export function CustomerTableFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nameFilter = searchParams.get('name') ?? '';
  const cpfFilter = searchParams.get('cpf') ?? '';
  const phoneFilter = searchParams.get('phone') ?? '';

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitting }
  } = useForm<FormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      phone: phoneFilter ?? '',
      cpf: cpfFilter ?? '',
      name: nameFilter ?? 'all'
    }
  });

  function handleSubmitFilter(data: FormSchema) {
    const newParams = new URLSearchParams(searchParams);

    if (data.name) {
      newParams.set('name', (data.name ?? '').toString());
    } else {
      newParams.delete('name');
    }

    if (data.cpf) {
      newParams.set('cpf', (data.cpf ?? '').toString());
    } else {
      newParams.delete('cpf');
    }

    if (data.phone) {
      newParams.set('phone', (data.phone ?? '').toString());
    } else {
      newParams.delete('phone');
    }

    newParams.set('page', '1');

    router.push(`${pathname}?${newParams.toString()}`);
  }

  function handleClearFilters() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('name');
    newParams.delete('cpf');
    newParams.delete('phone');
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);

    setValue('name', '')
    setValue('cpf', '')
    setValue('phone', '')
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFilter)}
      className='flex w-full items-center gap-2'
    >
      <span className='text-sm'>Filtros:</span>
      <Input {...register('name')} placeholder='Nome do cliente' />
      <Input
        {...register('cpf')}
        placeholder='CPF do cliente'
        className='overflow-hidden text-ellipsis whitespace-nowrap'
      />
      <Input
        {...register('phone')}
        placeholder='Telefone do cliente'
        className='overflow-hidden text-ellipsis whitespace-nowrap'
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
        className='text-nowrap disabled:cursor-not-allowed disabled:opacity-70'
      >
        <X className='mr-2 h-[1rem] w-[1rem]' />
        Remover filtros
      </Button>
    </form>
  );
}
