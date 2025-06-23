'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/_components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';

type Props = {
  onAddCategory?: () => void;
};

export function CategoryModal({ onAddCategory }: Props) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSave() {
    const trimmed = categoryName.trim();

    if (!trimmed) {
      setError('Informe um nome.');
      toast.error('Informe um nome válido para a categoria.');
      return;
    }

    if (trimmed.length > 20) {
      setError('Máximo de 20 caracteres.');
      toast.error('O nome da categoria deve ter no máximo 20 caracteres.');
      return;
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem('categories') || '[]'
      ) as string[];

      if (existing.includes(trimmed)) {
        setError('Categoria já existe.');
        toast.error('Essa categoria já foi cadastrada.');
        return;
      }

      const updated = [...existing, trimmed];
      localStorage.setItem('categories', JSON.stringify(updated));

      setCategoryName('');
      setError(null);
      setOpen(false);
      toast.success('Categoria criada com sucesso!');
      onAddCategory?.();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      toast.error('Erro ao salvar categoria. Tente novamente.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          +
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              setError(null); // limpa erro ao digitar
            }}
            maxLength={20}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
