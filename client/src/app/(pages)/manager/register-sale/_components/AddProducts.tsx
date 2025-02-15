/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useState } from 'react';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';

export default function AddProducts() {
  // Estado para armazenar os valores dos inputs
  const [formData, setFormData] = useState({
    codigo: '',
    produto: '',
    tamanho: '',
    desconto: '',
  });

  // Atualiza os valores do estado conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simula a adição do produto
  const handleSubmit = () => {
    alert('Produto adicionado com sucesso!');

    // Reseta os campos do formulário
    setFormData({
      codigo: '',
      produto: '',
      tamanho: '',
      desconto: '',
    });
  };

  return (
    <div className="inline-flex h-[71px] flex-col items-start justify-start gap-2 pt-6">
      <h2 className="text-xl font-bold text-card-foreground">
        Adicionar Produtos
      </h2>
      <div className="grid w-full grid-cols-2 gap-4 pb-[14px] pt-[14px] text-base font-normal text-card-foreground">
        {/* Código */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-card-foreground">
            Código
          </label>
          <Input
            name="codigo"
            placeholder="Código do produto"
            className="w-full"
            value={formData.codigo}
            onChange={handleChange}
          />
        </div>

        {/* Produto */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-card-foreground">
            Produto
          </label>
          <Input
            name="produto"
            placeholder="Nome do produto"
            className="w-full"
            value={formData.produto}
            onChange={handleChange}
          />
        </div>

        {/* Tamanho */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-card-foreground">
            Quantidade
          </label>
          <Input
            name="quantidade"
            placeholder="Quantidade"
            className="w-full"
            value={formData.tamanho}
            onChange={handleChange}
          />
        </div>

        {/* Desconto */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-normal text-card-foreground">
            Desconto (%)
          </label>
          <Input
            name="desconto"
            placeholder="Desconto"
            className="w-full"
            value={formData.desconto}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botão para adicionar produto */}
      <Button className="">Adicionar Produto</Button>
    </div>
  );
}
