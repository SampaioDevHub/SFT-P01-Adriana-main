'use client';

import PageContainer from '@/_components/layout/page-container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import { useUser } from '@clerk/nextjs';
import { Package, Users, BarChart, Code, Mail, Phone, MessageSquare, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_components/ui/dialog'; 

export default function Presentation() {
  const { user } = useUser();

  return (
    <div className="min-h-screen rounded-sm shadow-md flex flex-col items-center justify-center bg-white text-zinc-900 p-4">
      <PageContainer>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Olá, tudo bem {user?.firstName || 'Usuário'}? 👋
          </h1>
          <p className="text-lg md:text-2xl mb-8 animate-fade-in-delay">
            Bem-vindo ao sistema da
            <span className="text-pink-600 font-semibold">Adriana Showroom</span>! 
            Explore um mundo de estilo e exclusividade, gerencie sua loja com 
            facilidade e rapidez para encantar seus clientes.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-white backdrop-blur-md text-zinc-900 border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BarChart className="w-6 h-6 text-pink-600" /> Gestão Simplificada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Controle estoque, vendas e clientes em poucos cliques.</p>
            </CardContent>
          </Card>
          <Card className="bg-white backdrop-blur-md text-zinc-900 border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up delay-100">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Package className="w-6 h-6 text-pink-600" /> Coleções Exclusivas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Adicione e exiba produtos únicos com facilidade.</p>
            </CardContent>
          </Card>
          <Card className="bg-white backdrop-blur-md text-zinc-900 border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up delay-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="w-6 h-6 text-pink-600" /> Experiência do Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ofereça um atendimento personalizado e memorável.</p>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-sm opacity-80 justify-self-center text-center">
          <p>© 2025 Adriana Showroom. Todos os direitos reservados.</p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-4">
            Desenvolvido por{' '}
            <a
              href="https://sampaioforce.site"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-pink-600 flex items-center gap-1"
            >
              <Code className="w-4 h-4" /> SampaioForce
            </a>
            <span className="mx-2">•</span>

            {/* Termos de Uso */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="underline hover:text-pink-600 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Termos de Uso
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Termos de Uso</DialogTitle>
                  <DialogDescription>
                    Aqui você encontra os Termos de Uso do sistema Adriana Showroom...
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Política de Privacidade */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="underline hover:text-pink-600 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> Política de Privacidade
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Política de Privacidade</DialogTitle>
                  <DialogDescription>
                    Nossa política de privacidade garante a segurança dos seus dados...
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* LGPD */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="underline hover:text-pink-600 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> LGPD
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Lei Geral de Proteção de Dados (LGPD)</DialogTitle>
                  <DialogDescription>
                    Saiba como tratamos e protegemos seus dados conforme a LGPD...
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </p>
        </footer>
      </PageContainer>
    </div>
  );
}
