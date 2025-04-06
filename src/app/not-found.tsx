'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/_components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4"
      role="alert"
      aria-label="Página não encontrada"
    >
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-6xl md:text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>

      <h2 className="mt-4 text-2xl font-bold">Página não encontrada</h2>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-2">
        <Button onClick={() => router.back()} size="lg">
          Voltar
        </Button>
        <Button
          onClick={() => router.push('/painel/financeiro')}
          variant="ghost"
          size="lg"
        >
          Ir para o Painel Financeiro
        </Button>
      </div>
    </div>
  );
}
