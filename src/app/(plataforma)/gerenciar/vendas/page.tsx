'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_components/ui/tabs';
import PageContainer from '@/_components/layout/page-container';

import { SaleTable } from './_components/_table/saleTable';
import { AddProduct } from './_components/addProduct';
import { AddClient } from './_components/client';
import { Overview } from './_components/overview';

export default function RegisterSale(tabsValue: string) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Vendas</h1>
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Fechar Formulário' : 'Nova Venda'}
          </Button>
        </div>
        <div className="w-full space-y-8">
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Tabs defaultValue="product" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="product">Produtos</TabsTrigger>
                  <TabsTrigger value="client">Cliente</TabsTrigger>
                  <TabsTrigger value="overview">Resumo</TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                  <AddProduct />
                </TabsContent>
                <TabsContent value="client">
                  <AddClient />
                </TabsContent>
                <TabsContent value="overview">
                  <Overview />
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
          <SaleTable />
        </div>
      </div>
    </PageContainer>
  );
}
