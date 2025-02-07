/* eslint-disable import/no-unresolved */
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = yup.object({
  name: yup.string().required('Informe o nome do produto'),
  price: yup.string().required('Informe o preço do produto'),
  amount: yup
    .number()
    .integer()
    .typeError('Informe a quantidade do produto')
    .required('Informe a quantidade do produto'),
  size: yup.string().when('category', ([category], schema) => {
    if (category === 'Roupas') {
      return schema.required('Selecione um tamanho');
    }
    return schema.notRequired();
  }),
  category: yup.string().required('Informe uma categoria'),
  subcategory: yup.string().required('Informe uma Subcategoria')
});

type FormSchema = yup.InferType<typeof formSchema>;

export default function CustomerForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastrar Novo Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='space-y-6'>
          {/* Informações Pessoais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Pessoais</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nome</Label>
                <Input id='name' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Telefone</Label>
                <Input id='phone' required />
              </div>
            </div>
          </div>
          {/* Endereço Residencial */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Endereço Residencial</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='street'>Endereço</Label>
                <Input id='street' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='city'>Cidade</Label>
                <Input id='city' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='state'>Estado</Label>
                <Input id='state' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='zipCode'>CEP</Label>
                <Input id='zipCode' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='reference'>Ponto de Referência</Label>
                <Input id='reference' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='number'>Numero da casa</Label>
                <Input id='number' type='number'/>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='complement'>Complemento</Label>
                <Input id='complement' />
              </div>
            </div>
          </div>
          {/* Documentos */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Documentos</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='cpf'>CPF</Label>
                <Input id='cpf' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='birthDate'>Data de Nascimento</Label>
                <Input id='birthDate' type='date' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='maritalStatus'>Estado Civil</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione o estado civil' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='solteiro'>Solteiro(a)</SelectItem>
                    <SelectItem value='casado'>Casado(a)</SelectItem>
                    <SelectItem value='divorciado'>Divorciado(a)</SelectItem>
                    <SelectItem value='viuvo'>Viúvo(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Informações Profissionais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Profissionais</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='company'>Empresa</Label>
                <Input id='company' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='workPhone'>Telefone Comercial</Label>
                <Input id='workPhone' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='duration'>Tempo de Serviço</Label>
                <Input id='duration' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='workAddress'>Endereço Comercial</Label>
                <Input id='workAddress' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='workCity'>Cidade</Label>
                <Input id='workCity' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='workState'>Estado</Label>
                <Input id='workState' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='role'>Cargo</Label>
                <Input id='role' />
              </div>
            </div>
          </div>
          {/* Informações Bancárias */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Informações Bancárias</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='bankName'>Banco</Label>
                <Input id='bankName' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='bankBranch'>Agência</Label>
                <Input id='bankBranch' />
              </div>
            </div>
          </div>
          {/* Filiação */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Filiação</h3>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='father'>Pai</Label>
                <Input id='father' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='mother'>Mãe</Label>
                <Input id='mother' />
              </div>
            </div>
          </div>
          {/* Informações Comerciais */}
          {/* Referências Pessoais */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Referências Pessoais</h3>
            {/* {formData.personalReferences.map((reference, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-medium">Referência {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`refName${index}`}>Nome</Label>
                    <Input
                      id={`refName${index}`}
          
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`refPhone${index}`}>Telefone</Label>
                    <Input
                      id={`refPhone${index}`}
                   
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`refAddress${index}`}>Endereço</Label>
                    <Input
                      id={`refAddress${index}`}
               
                      required
                    />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          {/* Observações */}
          <Button type='submit' className='w-56'>
            Cadastrar Cliente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
