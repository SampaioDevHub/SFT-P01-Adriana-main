import { Button } from '@/_components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/_components/ui/dialog';

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteSelectedProductModal({setIsOpen}: ModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Remover Produto</DialogTitle>
      </DialogHeader>
      <p className="py-4">
        Tem certeza que deseja Remover esse produto da lista?
      </p>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
        <Button
          className="disabled:cursor-not-allowed disabled:opacity-70"
          variant="destructive"
        >
          Remover
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
