// RegisterSale.tsx
'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_components/ui/tabs';
import { motion } from 'framer-motion';
import { useSale } from '@/_providers/sale-provider';
import { useState } from 'react';

import { Button } from '@/_components/ui/button';
import { PageContainer } from '@/_components/layout/page-container';

import { SaleTable } from './components/table/saleTable';
import { AddProduct } from './components/addProduct';
import { Information } from './components/information';
import { Overview } from './components/overview';

export default function RegisterSale() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { activeTab, setActiveTab, productData, informationData } = useSale();

  // Verifica se o produto foi adicionado
  const isProductAdded = productData?.products?.length > 0;

  // Verifica se o cliente foi adicionado
  const isClientAdded = !!informationData?.customerCpf;

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
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="product" disabled={false}>
                    Produtos
                  </TabsTrigger>
                  <TabsTrigger value="information" disabled={!isProductAdded}>
                    Informações
                  </TabsTrigger>
                  <TabsTrigger value="overview" disabled={!isClientAdded}>
                    Resumo
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                  <AddProduct />
                </TabsContent>
                <TabsContent value="information">
                  <Information />
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
