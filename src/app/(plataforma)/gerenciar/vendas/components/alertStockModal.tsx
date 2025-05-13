// components/UpdateStockModal.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/_components/ui/dialog';
import { Button } from '@/_components/ui/button';

interface AlertStockModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  currentStock: number;
}

export function AlertStockModal({ open, onClose, productName, currentStock }: AlertStockModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Estoque insuficiente</DialogTitle>
        </DialogHeader>
        <p>O produto <strong>{productName}</strong> tem apenas <strong>{currentStock}</strong> unidades no estoque.</p>
        <p>Por favor, atualize o estoque antes de prosseguir.</p>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Entendi</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
