/* eslint-disable import/no-unresolved */
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';

// Sample data (replace with actual data from your store)
const storeData = {
  name: 'AdrianaShowRoom',
  sales: 15000,
  products: 100,
  topSeller: 'Vestido Floral'
};

const GenerateStoreReport: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);

    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(22);
    doc.text(`${storeData.name} - Relatório da Loja`, 20, 20);

    doc.setFontSize(16);
    doc.text('Resumo de Vendas', 20, 40);

    doc.setFontSize(12);
    doc.text(`Total de Vendas: R$ ${storeData.sales.toFixed(2)}`, 20, 60);
    doc.text(`Número de Produtos: ${storeData.products}`, 20, 70);
    doc.text(`Produto Mais Vendido: ${storeData.topSeller}`, 20, 80);

    // Save the PDF
    doc.save('AdrianaShowRoom_Relatorio.pdf');

    setIsGenerating(false);
  };

  return (
    <div className='flex flex-col items-center space-y-4 pt-20'>
      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        className='bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
      >
        {isGenerating ? 'Gerando PDF...' : 'Gerar e Baixar Relatório PDF'}
      </Button>
      {isGenerating && (
        <p className='text-sm text-gray-600'>
          O relatório está sendo gerado. O download começará automaticamente.
        </p>
      )}
    </div>
  );
};

export default GenerateStoreReport;
