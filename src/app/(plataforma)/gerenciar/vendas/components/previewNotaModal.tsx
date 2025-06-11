import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/_components/ui/dialog';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Printer, Download, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/_components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getSaleById } from '@/_api/sales/get-sale-by-id';
import { getCustomers } from '@/_api/customers/get-customers';
import { formatForReals } from '@/_utils/formatForReals';
import { formatUTCToBRDate } from '@/_utils/formatUTCToBRDate';

interface ModalProps {
  id: string;
  setIsOpen: (isOpen: boolean) => void;
}

export function PreviewNotaModal({ id, setIsOpen }: ModalProps) {
  const { data: sale, isPending: isSaleLoading } = useQuery({
    queryKey: ['sale', id],
    queryFn: () => getSaleById({ saleId: id }),
  });

  const { data: customerData } = useQuery({
    queryKey: ['customer', sale?.customerCpf],
    queryFn: async () => {
      if (!sale?.customerCpf) return null;
      const response = await getCustomers({ cpfFilter: sale.customerCpf });
      return response.content?.[0] ?? null;
    },
    enabled: !!sale?.customerCpf,
  });

  const formattedPhone = useMemo(() => {
    if (!customerData?.phone) return null;
    const phone = customerData.phone.replace(/[^0-9]/g, '');
    return phone.length >= 10 ? phone : null;
  }, [customerData]);

  const generatePDF = () => {
    const input = document.getElementById('nota-preview');
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`nota-fiscal-${sale?.id}.pdf`);
    });
  };

  const handleSendWhatsApp = () => {
    if (!formattedPhone) return;
    const message = encodeURIComponent(
      'Olá, segue o comprovante da sua compra. Obrigado!'
    );
    window.open(`https://wa.me/${formattedPhone}?text=${message}`);
  };

  if (isSaleLoading || !sale) return null;

  const hasPendingPayment = !!sale.endDate;

  let totalDiscount = 0;
  let priceWithDiscont = 0;
  let totalRate = 0;

  if (sale?.discountPercentage) {
    totalDiscount = (sale.subtotal * sale.discountPercentage) / 100;

    priceWithDiscont =
      sale.subtotal - (sale.subtotal * sale.discountPercentage) / 100;
  }

  if (sale?.rateAmount && sale.discountPercentage) {
    totalRate =
      ((sale.subtotal - (sale.subtotal * sale.discountPercentage) / 100) /
        100) *
      sale.rateAmount;
  }
  if (sale?.rateAmount && sale.discountPercentage === 0) {
    totalRate = (sale.subtotal / 100) * sale.rateAmount;
  }

  return (
      <DialogContent className="max-w-[35rem]">
        <DialogHeader>
          <DialogTitle>Pré-visualização da Nota Não Fiscal</DialogTitle>
        </DialogHeader>

        {hasPendingPayment && (
          <div className="mb-4 rounded border border-red-500 bg-red-50 text-red-700 px-4 py-2 font-semibold text-center">
            ⚠️ Esta venda ainda não foi finalizada. Data limite para pagamento:{' '}
            {formatUTCToBRDate(sale.endDate!)}
          </div>
        )}

        <div
          id="nota-preview"
          className="
            bg-background text-foreground font-mono
            border border-border rounded-md p-6
            shadow-sm
            selection:bg-primary selection:text-primary-foreground
            w-full
          "
          // remove maxWidth para ocupar 100%
        >
          {/* Cabeçalho */}
          <header className="border-b border-border pb-3 mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">NOTA NÃO FISCAL</h2>
            <span className="text-xs text-muted-foreground">
              {sale.startDate ? formatUTCToBRDate(sale.startDate) : ''}
            </span>
          </header>

          {/* Dados do Cliente */}
          <section className="mb-4 text-sm">
            <p>
              <strong>Cliente CPF:</strong> {sale.customerCpf}
            </p>
            <p>
              <strong>Forma de Pagamento:</strong> {sale.paymentMethod}
            </p>
          </section>

          {/* Produtos */}
          <section className="mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-1">Produto</th>
                  <th className="pb-1 text-center">Qtd</th>
                  <th className="pb-1  text-right">Preço Unit.</th>
                  <th className="pb-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {sale.products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-muted' : ''}>
                    <td
                      className="py-1 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
                      title={product.name} // Tooltip com nome completo ao passar o mouse
                    >
                      {product.name}
                    </td>
                    <td className="py-1 text-center whitespace-nowrap">
                      {product.amount}
                    </td>
                    <td className="py-1 text-right whitespace-nowrap">
                      {formatForReals(product.unitPrice)}
                    </td>
                    <td className="py-1 text-right whitespace-nowrap">
                      {formatForReals(product.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Totais */}
          <section className="border-t border-border pt-3 text-sm space-y-1">
            <p>
              <strong>Subtotal:</strong> {formatForReals(sale.subtotal)}
            </p>
            <p>
              <strong>Taxa:</strong> {formatForReals(totalRate)}
            </p>
            <p>
              <strong>Desconto:</strong> {formatForReals(totalDiscount)}
            </p>
            <p className="text-lg font-semibold">
              <strong>Total:</strong>{' '}
              {formatForReals(sale.subtotal - totalDiscount + totalRate)}
            </p>
          </section>

          {/* Se existir endDate, mostrar campo Data limite */}
          {hasPendingPayment && (
            <p className="mt-4 text-sm text-red-600 font-semibold">
              Data limite para pagamento: {formatUTCToBRDate(sale.endDate!)}
            </p>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-wrap justify-between gap-2 pt-4 max-w-full">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex-1 sm:flex-initial min-w-[120px]"
          >
            <Printer className="w-4 h-4 mr-2" /> Imprimir
          </Button>

          <Button
            variant="outline"
            onClick={generatePDF}
            className="flex-1 sm:flex-initial min-w-[120px]"
          >
            <Download className="w-4 h-4 mr-2" /> Baixar PDF
          </Button>

          <Button
            variant="default"
            disabled={!formattedPhone}
            onClick={handleSendWhatsApp}
            className="flex-1 sm:flex-initial min-w-[120px]"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> Enviar via WhatsApp
          </Button>
        </div>
      </DialogContent>
  );
}
