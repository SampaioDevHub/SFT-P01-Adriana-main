'use client';

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
import {
  MoreVertical,
  FileDown,
  FileSpreadsheet,
  Package,
  Layers,
  AlertTriangle,
  Tags,
  Box,
} from 'lucide-react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import React, { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/_api/products/get-products';
import { GetProductsBody } from '@/_api/products/_types/type-get-product';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import { ScrollArea } from '@/_components/ui/scroll-area';
import { formatForReals } from '@/_utils/formatForReals';

export function ProductReport() {
  const [search, setSearch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    data: productsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // 1. Pega o total de elementos com uma requisição simples
      const firstResponse = await getProducts({ pageSize: 1 });
      const total = firstResponse.totalElements;

      // 2. Se não tiver nenhum produto, retorna uma estrutura vazia
      if (total === 0) {
        return {
          content: [],
          totalElements: 0,
        };
      }

      // 3. Caso contrário, busca todos
      return await getProducts({ pageSize: total });
    },
  });

  const products = useMemo(() => {
    if (!productsData) return [];
    return productsData.content.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [productsData, search]);

  const totalValue = useMemo(() => {
    const total = products.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
    return total;
  }, [products]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.quantityInStock < 5).length;
  }, [products]);

  const chartData = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    products.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));
  }, [products]);

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(22);
    doc.text('Relatório de Produtos', 14, 20);
    doc.setFontSize(12);
    doc.text(`Número de Produtos: ${String(products.length)}`, 14, 30);

    let y = 50;
    doc.setFontSize(10);
    doc.text('Nome', 14, y);
    doc.text('Preço', 65, y);
    doc.text('Categoria', 90, y);
    doc.text('SubCategoria', 110, y);
    doc.text('Tamanho', 135, y);
    doc.text('Qtd.', 180, y);
    doc.line(14, y + 2, 200, y + 2);
    y += 10;

    products.forEach((product) => {
      doc.text(String(product.name), 14, y);
      doc.text(formatForReals(product.price), 65, y);
      doc.text(String(product.category), 90, y);
      doc.text(String(product.subCategory), 110, y);
      doc.text(String(product.size || '-'), 135, y);
      doc.text(String(product.quantityInStock), 180, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Relatorio_Produtos.pdf');
    setIsGenerating(false);
  };

  const exportToExcel = () => {
    const formattedData = products.map((product) => ({
      Código: product.code || '-',
      'Nome do Produto': product.name || '-',
      'Desconto (%)':
        product.discountPercentage !== undefined
          ? `${product.discountPercentage}%`
          : '-',
      'Preço com Desconto':
        product.priceWithDiscount !== undefined
          ? `${formatForReals(product.priceWithDiscount)}`
          : '-',
      Preço: `${formatForReals(product.price)}`,
      'Quantidade em Estoque': product.quantityInStock,
      Tamanho: product.size || '-',
      Categoria: product.category || '-',
      Subcategoria: product.subCategory || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    worksheet['!cols'] = [
      { wch: 35 },
      { wch: 25 },
      { wch: 12 },
      { wch: 18 },
      { wch: 12 },
      { wch: 22 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
    ];

    // Alinhar à direita a coluna "Quantidade em Estoque"
    const header = Object.keys(formattedData[0]);
    const estoqueColIndex = header.indexOf('Quantidade em Estoque');

    for (let i = 0; i < formattedData.length; i++) {
      const cellAddress = XLSX.utils.encode_cell({
        r: i + 1,
        c: estoqueColIndex,
      });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          alignment: { horizontal: 'right' },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Relatorio_Produtos.xlsx');
  };

  return (
    <div className="container space-y-8 py-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total de Produtos</CardTitle>
            <Package className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>{products.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Valor Total</CardTitle>
            <Tags className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>{formatForReals(totalValue)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Estoque Baixo</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>{lowStockCount}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Categorias</CardTitle>
            <Layers className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>{chartData.length}</CardContent>
        </Card>
      </div>

      {/* Ações */}
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por nome ou categoria..."
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
            <Package className="h-6 w-6 text-primary" />
            Produtos Cadastrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full max-h-[40vh] overflow-auto rounded-md border">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground animate-pulse">
                <Package className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Carregando clientes...</p>
                <p className="text-sm">
                  Aguarde um momento enquanto buscamos os dados.
                </p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-center text-red-500">
                <Package className="h-16 w-16 mb-4 text-red-300" />
                <p className="text-lg font-medium">Erro ao carregar os dados</p>
                <p className="text-sm text-red-400">
                  Tente novamente mais tarde.
                </p>
              </div>
            ) : products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>SubCategoria</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Qtd.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {product.discountPercentage &&
                        product.priceWithDiscount ? (
                          <div className="space-x-1 flex flex-wrap">
                            <span
                              style={{ textDecoration: 'line-through' }}
                              className="text-xs text-muted-foreground whitespace-nowrap"
                            >
                              R$ {product.price.toString().replace('.', ',')}
                            </span>
                            <span className="whitespace-nowrap">
                              R${' '}
                              {product.priceWithDiscount
                                .toString()
                                .replace('.', ',')}
                            </span>
                          </div>
                        ) : (
                          <p>R$ {product.price.toString().replace('.', ',')}</p>
                        )}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.subCategory}</TableCell>
                      <TableCell>{product.size || '-'}</TableCell>
                      <TableCell>{product.quantityInStock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <Package className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Nenhum produto encontrado</p>
                <p className="text-sm">
                  Cadastre um produto ou aplique um filtro válido.
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
