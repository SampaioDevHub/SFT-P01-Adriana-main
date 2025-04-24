'use client';

import {
  FileDown,
  FileSpreadsheet,
  ShoppingCart,
  Tags,
  BadgeDollarSign,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import { getSales } from '@/_api/sales/get-sales';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { Separator } from '@/_components/ui/separator';
import { paymentLabels } from '@/app/(plataforma)/gerenciar/vendas/_constants/paymentMethod';
import { statusLabels } from '@/app/(plataforma)/gerenciar/vendas/_constants/saleStatus';
import { GetSaleContent } from '@/_api/sales/_types/type-get-sale';

export function SalesReport() {
  const [search, setSearch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sales, setSales] = useState<GetSaleContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchAllSales() {
      setIsLoading(true);
      setIsError(false);

      try {
        const firstPage = await getSales({});
        const totalElements = firstPage.totalElements;

        if (totalElements > 0) {
          const allSales = await getSales({
            pageIndex: 0,
            pageSize: totalElements,
          });
          setSales(allSales.content);
        } else {
          setSales([]);
        }
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllSales();
  }, []);

  const filteredSales = useMemo(() => {
    return sales.filter(
      (s) =>
        s.customerCpf.toLowerCase().includes(search.toLowerCase()) ||
        s.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [sales, search]);

  const totalRevenue = useMemo(() => {
    return filteredSales.reduce((acc, sale) => acc + sale.totalPrice, 0);
  }, [filteredSales]);

  const totalProductsSold = useMemo(() => {
    return filteredSales.reduce((acc, sale) => {
      const totalInSale = sale.products.reduce((a, p) => a + p.amount, 0);
      return acc + totalInSale;
    }, 0);
  }, [filteredSales]);

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(22);
    doc.text('Relatório de Vendas', 14, 20);
    doc.setFontSize(12);
    doc.text(`Número de Vendas: ${String(filteredSales.length)}`, 14, 30);
    doc.text(`Valor Total: R$ ${totalRevenue.toFixed(2)}`, 14, 38);

    let y = 50;
    doc.setFontSize(10);
    doc.text('CPF', 14, y);
    doc.text('Status', 60, y);
    doc.text('Total (R$)', 105, y);
    doc.text('Qtd. Itens', 150, y);
    doc.text('Método', 180, y);
    doc.line(14, y + 2, 200, y + 2);
    y += 10;

    filteredSales.forEach((sale) => {
      doc.text(String(sale.customerCpf), 14, y);
      doc.text(String(statusLabels[sale.status]), 60, y);
      doc.text(String(sale.totalPrice.toFixed(2)), 105, y);
      doc.text(String(sale.totalItems), 150, y);
      doc.text(String(paymentLabels[sale.paymentMethod]), 180, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Relatorio_Vendas.pdf');
    setIsGenerating(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSales);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Relatorio_Vendas.xlsx');
  };

  return (
    <div className="container space-y-8 py-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total de Vendas</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>{filteredSales.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Valor Total</CardTitle>
            <Tags className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>R$ {totalRevenue.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Produtos Vendidos</CardTitle>
            <BadgeDollarSign className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>{totalProductsSold}</CardContent>
        </Card>
      </div>

      {/* Ações */}
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por CPF ou status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/3"
        />
        <div className="flex flex-wrap gap-2">
          <Button onClick={generatePDF} disabled={isGenerating}>
            <FileDown className="mr-2 h-4 w-4" />
            {isGenerating ? 'Gerando PDF...' : 'Exportar PDF'}
          </Button>
          <Button onClick={exportToExcel} variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <Card className="w-full bg-muted/30">
        <CardHeader className="flex items-center justify-between space-y-2">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Vendas Realizadas
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <ScrollArea className="w-full max-h-[40vh] overflow-auto rounded-md border">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground animate-pulse">
                <ShoppingCart className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Carregando vendas...</p>
                <p className="text-sm">Aguarde um momento enquanto buscamos os dados.</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-red-500">
                <ShoppingCart className="h-16 w-16 mb-4 text-red-300" />
                <p className="text-lg font-medium">Erro ao carregar as vendas</p>
                <p className="text-sm text-red-400">Tente novamente mais tarde.</p>
              </div>
            ) : filteredSales.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CPF do Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Qtd. Itens</TableHead>
                    <TableHead>Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.customerCpf}</TableCell>
                      <TableCell>{statusLabels[sale.status]}</TableCell>
                      <TableCell>R$ {sale.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>{sale.totalItems}</TableCell>
                      <TableCell>{paymentLabels[sale.paymentMethod]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <ShoppingCart className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Nenhuma venda encontrada</p>
                <p className="text-sm">Cadastre uma venda, ou coloque um filtro válido.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
