/* eslint-disable import/no-unresolved */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Customer } from '../types/Customer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'

// Tipagem das propriedades do componente
interface CustomerFormProps {
  onAddCustomer: (newCustomer: Omit<Customer, 'id'>) => void
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onAddCustomer }) => {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    phone: '',
    residentialAddress: {
      street: '',
      sector: '',
      city: '',
      state: '',
      zipCode: '',
      reference: ''
    },
    cpf: '',
    identityDocument: {
      number: '',
      issuer: ''
    },
    birthDate: '',
    maritalStatus: '',
    professional: {
      company: '',
      phone: '',
      duration: '',
      address: '',
      sector: '',
      city: '',
      state: '',
      section: '',
      role: ''
    },
    bank: {
      name: '',
      branch: ''
    },
    parents: {
      father: '',
      mother: ''
    },
    commercialInfo: '',
    personalReferences: [
      { name: '', phone: '', address: '' },
      { name: '', phone: '', address: '' }
    ],
    observations: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCustomer = { ...formData, id: Date.now() }

    // Chama a função onAddCustomer para enviar os dados para o componente pai
    onAddCustomer(newCustomer)

    toast({
      title: "Cliente cadastrado",
      description: `${newCustomer.name} foi adicionado com sucesso.`,
    })

    // Reset do formulário
    setFormData({
      name: '',
      phone: '',
      residentialAddress: {
        street: '',
        sector: '',
        city: '',
        state: '',
        zipCode: '',
        reference: ''
      },
      cpf: '',
      identityDocument: {
        number: '',
        issuer: ''
      },
      birthDate: '',
      maritalStatus: '',
      professional: {
        company: '',
        phone: '',
        duration: '',
        address: '',
        sector: '',
        city: '',
        state: '',
        section: '',
        role: ''
      },
      bank: {
        name: '',
        branch: ''
      },
      parents: {
        father: '',
        mother: ''
      },
      commercialInfo: '',
      personalReferences: [
        { name: '', phone: '', address: '' },
        { name: '', phone: '', address: '' }
      ],
      observations: ''
    })

    // Redireciona para a página de clientes
    router.push('/dashboard/client')
  }

  const handleInputChange = (path: string, value: string) => {
    const pathArray = path.split('.')
    setFormData(prev => {
      const newData = { ...prev }
      let current: any = newData
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]]
      }
      current[pathArray[pathArray.length - 1]] = value
      return newData
    })
  }

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalReferences: prev.personalReferences.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Endereço Residencial */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Endereço Residencial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="street">Endereço</Label>
                <Input
                  id="street"
                  value={formData.residentialAddress.street}
                  onChange={(e) => handleInputChange('residentialAddress.street', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">Setor</Label>
                <Input
                  id="sector"
                  value={formData.residentialAddress.sector}
                  onChange={(e) => handleInputChange('residentialAddress.sector', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.residentialAddress.city}
                  onChange={(e) => handleInputChange('residentialAddress.city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={formData.residentialAddress.state}
                  onChange={(e) => handleInputChange('residentialAddress.state', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={formData.residentialAddress.zipCode}
                  onChange={(e) => handleInputChange('residentialAddress.zipCode', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Ponto de Referência</Label>
                <Input
                  id="reference"
                  value={formData.residentialAddress.reference}
                  onChange={(e) => handleInputChange('residentialAddress.reference', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documentos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identityNumber">Documento de Identidade</Label>
                <Input
                  id="identityNumber"
                  value={formData.identityDocument.number}
                  onChange={(e) => handleInputChange('identityDocument.number', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="identityIssuer">Órgão Emissor</Label>
                <Input
                  id="identityIssuer"
                  value={formData.identityDocument.issuer}
                  onChange={(e) => handleInputChange('identityDocument.issuer', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Estado Civil</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange('maritalStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solteiro">Solteiro</SelectItem>
                    <SelectItem value="casado">Casado</SelectItem>
                    <SelectItem value="divorciado">Divorciado</SelectItem>
                    <SelectItem value="viuvo">Viúvo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Botão de Enviar */}
          <Button type="submit">Cadastrar Cliente</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomerForm
