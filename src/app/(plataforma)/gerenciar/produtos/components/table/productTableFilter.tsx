import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';
import { Search, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategories } from '@/_api/products/get-products-by-categories';
import { toast } from 'sonner';
import { DeleteCategoryModal } from '../deleteCategoryModal';

const formSchemaFilter = yup.object().shape({
  name: yup.string(),
  quantityInStock: yup.string(),
  category: yup.string(),
});

type FormSchemaFilter = yup.InferType<typeof formSchemaFilter>;

export function ProductTableFilter() {
  const [categories, setCategories] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nameFilter = searchParams.get('name') ?? '';
  const quantityInStockFilter = searchParams.get('quantity') ?? '';
  const categoryFilter = searchParams.get('category') ?? '';

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaFilter>({
    resolver: yupResolver(formSchemaFilter),
    defaultValues: {
      category: categoryFilter ?? '',
      quantityInStock: quantityInStockFilter ?? '',
      name: nameFilter ?? '',
    },
  });

  function handleSubmitFilter(data: FormSchemaFilter) {
    const newParams = new URLSearchParams(searchParams);

    if (data.name) {
      newParams.set('name', (data.name ?? '').toString());
    } else {
      newParams.delete('name');
    }

    if (data.quantityInStock) {
      newParams.set('quantity', (data.quantityInStock ?? '').toString());
    } else {
      newParams.delete('quantity');
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
    newParams.delete('quantity');
    newParams.delete('category');
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);

    reset(), setValue('category', '');
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(stored);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitFilter)}
      className="flex w-full items-center gap-2"
    >
      <span className="text-sm">Filtros:</span>
      <Input {...register('name')} placeholder="Nome do produto" />
      <Input
        type="number"
        {...register('quantityInStock')}
        placeholder="Quantidade em stoque"
      />
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <Select
            required={errors.category?.message ? true : false}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className='w-28'>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <>
              <SelectContent>
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="flex items-center justify-between pr-2"
                  >
                    <SelectItem value={cat} className="w-full">
                      {cat}
                    </SelectItem>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-1 text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCategoryToDelete(cat);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </SelectContent>

              <DeleteCategoryModal
                open={deleteModalOpen}
                categoryName={categoryToDelete || ''}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                  if (!categoryToDelete) return;
                  const updated = categories.filter(
                    (c) => c !== categoryToDelete
                  );
                  localStorage.setItem('categories', JSON.stringify(updated));
                  setCategories(updated);

                  // se o valor deletado estiver selecionado, limpa
                  if (field.value === categoryToDelete) {
                    field.onChange('');
                  }

                  setDeleteModalOpen(false);
                  toast.success('Categoria excluída com sucesso');
                }}
              />
            </>
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
