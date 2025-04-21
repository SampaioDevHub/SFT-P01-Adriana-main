import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { User, Tags, Calendar } from 'lucide-react';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/_api/customers/get-customers'; // Supondo que tenha essa API
import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ScrollArea } from '@/_components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_components/ui/table';
import { profileLabels } from '@/app/(plataforma)/gerenciar/clientes/_constants/customerProfile';
import { GetCustomersBody } from '@/_api/customers/_types/type-get-custumer';

export function CustomerReport() {
  const [search, setSearch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [customersData, setCustomersData] = useState<GetCustomersBody | null>(null);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        // 1. Primeira chamada só pra pegar o total de elementos
        const firstResponse = await getCustomers({ pageSize: 1, pageIndex: 0 });
        const total = firstResponse.totalElements;

        // 2. Segunda chamada com pageSize = total
        const fullData = await getCustomers({ pageSize: total, pageIndex: 0 });

        setCustomersData(fullData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchAllCustomers();
  }, []);

  const customers = useMemo(() => {
    if (!customersData) return [];
    return customersData.content.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.profile?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customersData, search]);

  // Calcular a média de idade dos clientes
  const averageAge = useMemo(() => {
    const totalAge = customers.reduce((acc, customer) => {
      if (customer.dateBirth) {
        const age =
          new Date().getFullYear() - new Date(customer.dateBirth).getFullYear();
        return acc + age;
      }
      return acc;
    }, 0);
    return customers.length > 0 ? (totalAge / customers.length).toFixed(1) : 0;
  }, [customers]);

  // Contagem de clientes por perfil
  const profileCount = useMemo(() => {
    return customers.reduce(
      (acc, customer) => {
        const profile = customer.profile || 'BOM';
        acc[profile] = (acc[profile] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [customers]);

  const generatePDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(22);
    doc.text('Relatório de Clientes', 14, 20);
    doc.setFontSize(12);
    doc.text(`Número de Clientes: ${String(customers.length)}`, 14, 30);

    let y = 50;
    doc.setFontSize(10);
    doc.text('Nome', 14, y);
    doc.text('CPF', 60, y);
    doc.text('Telefone', 105, y);
    doc.text('Email', 150, y);
    doc.text('Perfil', 180, y);
    doc.line(14, y + 2, 200, y + 2);
    y += 10;

    customers.forEach((customer) => {
      doc.text(String(customer.name), 14, y);
      doc.text(String(customer.cpf), 60, y);
      doc.text(String(customer.phone), 105, y);
      doc.text(String(customer.email || '-'), 150, y);
      doc.text(String(profileLabels[customer.profile]), 180, y);
      y += 7;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('Relatorio_Clientes.pdf');
    setIsGenerating(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Relatorio_Clientes.xlsx');
  };

  return (
    <div className="container space-y-8 py-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total de Clientes</CardTitle>
            <User className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>{customers.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Média de Idade</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>{averageAge} anos</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Clientes por Perfil</CardTitle>
            <Tags className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            {Object.entries(profileCount).map(([profile, count]) => (
              <div key={profile}>
                <span>{profileLabels[profile ?? 'BOM']}: </span>
                <span>{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Buscar por nome ou perfil..."
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
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              Clientes Cadastrados
            </CardTitle>
          </div>
        </CardHeader>

        <Separator />
        <CardContent>
          <ScrollArea className="w-full max-h-[40vh] overflow-auto rounded-md border">
            {customers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Perfil</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.cpf}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{profileLabels[customer.profile]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <User className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Nenhum cliente encontrado</p>
                <p className="text-sm">
                  Cadastre um cliente, ou coloque um filtro válido.
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
