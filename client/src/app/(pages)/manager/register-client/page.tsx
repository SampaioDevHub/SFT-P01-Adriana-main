'use client'
/* eslint-disable import/no-unresolved */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CustomerTable from "./_components/CustomerTable";
import PageContainer from "@/components/layout/page-container";
import CustomerForm from "./_components/CustomerForm";
import { useState } from "react";

export default function CustomersPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cadastrar Novo Cliente</h1>
        </div>
       <CustomerForm/>
      </div>
    </PageContainer>
  );
}
