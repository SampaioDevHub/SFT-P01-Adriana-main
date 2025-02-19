'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '@/_components/layout/page-container';
import { ProductForm } from './_components/productForm';
import { ProductTable } from './_components/productTable';
import { Button } from '@/_components/ui/button';

export default function RegisterProduct() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cadastro de Produtos</h1>
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Fechar Formulário' : 'Novo Produto'}
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
              <ProductForm />
            </motion.div>
          )}
          <ProductTable />
        </div>
      </div>
    </PageContainer>
  );
}
