'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '@/_components/layout/page-container';
import { CustomerForm } from './_components/customerForm';
import { CustomerTable } from './_components/customerTable';
import { Button } from '@/_components/ui/button';

export default function CustomersPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <Button onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Fechar Formulário' : 'Novo Cliente'}
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
              <CustomerForm />
            </motion.div>
          )}
          <CustomerTable />
        </div>
      </div>
    </PageContainer>
  );
}

