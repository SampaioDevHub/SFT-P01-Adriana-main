import { Button } from '@/_components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog';

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
  productId: string | null;
  onConfirmDelete: (id: string) => void;
}

export function DeleteSelectedProductModal({
  setIsOpen,
  productId,
  onConfirmDelete,
}: ModalProps) {
  function handleDelete() {
    if (productId) {
      onConfirmDelete(productId);
      setIsOpen(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remover Produto</DialogTitle>
      </DialogHeader>
      <p className="py-4">
        Tem certeza que deseja remover esse produto da lista?
      </p>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          className="disabled:cursor-not-allowed disabled:opacity-70"
          variant="destructive"
        >
          Remover
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
