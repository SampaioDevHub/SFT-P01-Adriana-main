/* eslint-disable import/no-unresolved */
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Customer } from '../types/Customer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
export default function CustomerForm() {
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
    clientStatus: '',
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
    
    // Get existing customers from localStorage
    const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    
    // Add new customer
    const updatedCustomers = [...existingCustomers, newCustomer]
    
    // Save to localStorage
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
    
    toast({
      title: "Cliente cadastrado",
      description: `${newCustomer.name} foi adicionado com sucesso.`,
    })
    
    // Reset form
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
      clientStatus: '',
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
    
    // Redirect to customer list page
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
                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                    <SelectItem value="casado">Casado(a)</SelectItem>
                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                    <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Informações Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Profissionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.professional.company}
                  onChange={(e) => handleInputChange('professional.company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workPhone">Telefone Comercial</Label>
                <Input
                  id="workPhone"
                  value={formData.professional.phone}
                  onChange={(e) => handleInputChange('professional.phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Tempo de Serviço</Label>
                <Input
                  id="duration"
                  value={formData.professional.duration}
                  onChange={(e) => handleInputChange('professional.duration', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workAddress">Endereço Comercial</Label>
                <Input
                  id="workAddress"
                  value={formData.professional.address}
                  onChange={(e) => handleInputChange('professional.address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workSector">Setor</Label>
                <Input
                  id="workSector"
                  value={formData.professional.sector}
                  onChange={(e) => handleInputChange('professional.sector', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workCity">Cidade</Label>
                <Input
                  id="workCity"
                  value={formData.professional.city}
                  onChange={(e) => handleInputChange('professional.city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workState">Estado</Label>
                <Input
                  id="workState"
                  value={formData.professional.state}
                  onChange={(e) => handleInputChange('professional.state', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Seção</Label>
                <Input
                  id="section"
                  value={formData.professional.section}
                  onChange={(e) => handleInputChange('professional.section', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo</Label>
                <Input
                  id="role"
                  value={formData.professional.role}
                  onChange={(e) => handleInputChange('professional.role', e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Informações Bancárias */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Bancárias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Banco</Label>
                <Input
                  id="bankName"
                  value={formData.bank.name}
                  onChange={(e) => handleInputChange('bank.name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankBranch">Agência</Label>
                <Input
                  id="bankBranch"
                  value={formData.bank.branch}
                  onChange={(e) => handleInputChange('bank.branch', e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Filiação */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Filiação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="father">Pai</Label>
                <Input
                  id="father"
                  value={formData.parents.father}
                  onChange={(e) => handleInputChange('parents.father', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mother">Mãe</Label>
                <Input
                  id="mother"
                  value={formData.parents.mother}
                  onChange={(e) => handleInputChange('parents.mother', e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Informações Comerciais */}
          <div className="space-y-2">
            <Label htmlFor="commercialInfo">Informações Comerciais</Label>
            <Textarea
              id="commercialInfo"
              value={formData.commercialInfo}
              onChange={(e) => handleInputChange('commercialInfo', e.target.value)}
            />
          </div>
          {/* Referências Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Referências Pessoais</h3>
            {formData.personalReferences.map((reference, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Referência {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`refName${index}`}>Nome</Label>
                    <Input
                      id={`refName${index}`}
                      value={reference.name}
                      onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`refPhone${index}`}>Telefone</Label>
                    <Input
                      id={`refPhone${index}`}
                      value={reference.phone}
                      onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`refAddress${index}`}>Endereço</Label>
                    <Input
                      id={`refAddress${index}`}
                      value={reference.address}
                      onChange={(e) => handleReferenceChange(index, 'address', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => handleInputChange('observations', e.target.value)}
            />
          </div>
          <Button type="submit" className="w-56">Cadastrar Cliente</Button>
        </form>
      </CardContent>
    </Card>
  )
}
