/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import jsPDF from 'jspdf';
import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { getProducts } from '@/_api/products/get-products';
import { useQuery } from '@tanstack/react-query';

export function GenerateStoreReport() {
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts({}),
    staleTime: Infinity,
  });

  if (!products || products.content.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');

    // Cabeçalho
    doc.setFontSize(22);
    doc.text('Relatório de Produtos', 14, 20);

    doc.setFontSize(12);
    doc.text(`Número de Produtos: ${String(products.content.length)}`, 14, 30);

    // Configuração inicial da tabela
    let y = 50;
    doc.setFontSize(10);
    doc.text('Nome', 14, y);
    doc.text('Preço', 60, y);
    doc.text('Categoria', 105, y);
    doc.text('SubCategoria', 130, y);
    doc.text('Tamanho', 160, y);
    doc.text('Qtd.', 185, y);
    doc.line(14, y + 2, 200, y + 2);

    y += 10;

    products.content.forEach((product) => {
      doc.text(String(product.name), 14, y);
      doc.text(`R$ ${String(product.price)}`, 60, y);
      doc.text(String(product.category), 105, y);
      doc.text(String(product.subCategory), 130, y);
      doc.text(String(product.size), 160, y);
      doc.text(String(product.quantityInStock), 185, y);
      y += 7;

      // Verifica se precisa criar uma nova página
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Salvar PDF
    doc.save('Relatorio_Produtos.pdf');

    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 lg:-mb-14">
      <div className="relative flex items-center justify-center">
        <Image
          alt="pdf"
          width={150}
          height={200}
          src="/assets/relatorio-pdf.png"
        />
        <Button
          onClick={generatePDF}
          disabled={isGenerating}
          className="absolute z-10 whitespace-nowrap"
        >
          {isGenerating ? 'Gerando PDF...' : 'Gerar e Baixar Relatório PDF'}
        </Button>
      </div>
      {isGenerating && (
        <p className="text-sm text-gray-600">
          O relatório está sendo gerado. O download começará automaticamente.
        </p>
      )}
    </div>
  );
}
