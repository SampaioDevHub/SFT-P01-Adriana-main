'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
};

export function DeleteCategoryModal({
  open,
  onClose,
  onConfirm,
  categoryName,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir categoria</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Tem certeza que deseja excluir a categoria{' '}
          <strong className="text-foreground">{categoryName}</strong>?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirmar exclusão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
