'use client'
/* eslint-disable import/no-unresolved */
<<<<<<< HEAD
import PageContainer from '@/components/layout/page-container'
import CustomerForm from './_components/CustomerForm'
=======
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CustomerTable from "./_components/customerTable";
import PageContainer from "@/components/layout/page-container";
import CustomerForm from "./_components/customerForm";
import { useState } from "react";

>>>>>>> 4c2894b1a0f819cde3fccbe830981175496985c0
export default function CustomersPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
<<<<<<< HEAD
          <h1 className="text-3xl font-bold">Cadastrar Novo Cliente</h1>
        </div>
       <CustomerForm/>
=======
          <h1 className="text-3xl font-bold">Lista de Clientes</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Fechar Formulário" : "Cadastrar Novo Cliente"}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Animação com Framer Motion */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <CustomerForm />
            </motion.div>
          )}

          <CustomerTable />
        </div>
>>>>>>> 4c2894b1a0f819cde3fccbe830981175496985c0
      </div>
    </PageContainer>
  );
}
