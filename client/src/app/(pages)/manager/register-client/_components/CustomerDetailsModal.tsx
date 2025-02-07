/* eslint-disable import/no-unresolved */
'use customer'

import { GetCustomerContent } from '@/api/customers/types/type-get-custumer'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from 'date-fns'

interface CustomerDetailsModalProps {
  customer: GetCustomerContent
}

export default function CustomerDetailsModal({ customer }: CustomerDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Ver Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Informações Pessoais</h3>
              <p><strong>Nome:</strong> {customer.name}</p>
              <p><strong>Telefone:</strong> {customer.phone}</p>
              <p><strong>CPF:</strong> {customer.cpf}</p>
              <p><strong>RG:</strong> {customer.identityDocument.number}</p>
              <p><strong>Órgão Emissor:</strong> {customer.identityDocument.issuer}</p>
              <p><strong>Data de Nascimento:</strong> {format(new Date(customer.birthDate), 'dd/MM/yyyy')}</p>
              <p><strong>Estado Civil:</strong> {customer.maritalStatus}</p>
            </div>
            <div>
              <h3 className="font-semibold">Endereço Residencial</h3>
              <p>{customer.residentialAddress.street}</p>
              <p>{customer.residentialAddress.sector}</p>
              <p>{`${customer.residentialAddress.city}, ${customer.residentialAddress.state}`}</p>
              <p><strong>CEP:</strong> {customer.residentialAddress.zipCode}</p>
              <p><strong>Referência:</strong> {customer.residentialAddress.reference}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Informações Profissionais</h3>
            <p><strong>Empresa:</strong> {customer.professional.company}</p>
            <p><strong>Telefone:</strong> {customer.professional.phone}</p>
            <p><strong>Tempo de Serviço:</strong> {customer.professional.duration}</p>
            <p><strong>Endereço:</strong> {customer.professional.address}</p>
            <p><strong>Setor:</strong> {customer.professional.sector}</p>
            <p><strong>Cidade:</strong> {customer.professional.city}</p>
            <p><strong>Estado:</strong> {customer.professional.state}</p>
            <p><strong>Seção:</strong> {customer.professional.section}</p>
            <p><strong>Cargo:</strong> {customer.professional.role}</p>
          </div>
          <div>
            <h3 className="font-semibold">Informações Bancárias</h3>
            <p><strong>Banco:</strong> {customer.bank.name}</p>
            <p><strong>Agência:</strong> {customer.bank.branch}</p>
          </div>
          <div>
            <h3 className="font-semibold">Filiação</h3>
            <p><strong>Pai:</strong> {customer.parents.father}</p>
            <p><strong>Mãe:</strong> {customer.parents.mother}</p>
          </div>
          <div>
            <h3 className="font-semibold">Informações Comerciais</h3>
            <p>{customer.commercialInfo}</p>
          </div>
          <div>
            <h3 className="font-semibold">Referências Pessoais</h3>
            {customer.personalReferences.map((ref, index) => (
              <div key={index} className="mb-2">
                <p><strong>Nome:</strong> {ref.name}</p>
                <p><strong>Telefone:</strong> {ref.phone}</p>
                <p><strong>Endereço:</strong> {ref.address}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold">Observações</h3>
            <p>{customer.observations}</p>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  )
}

