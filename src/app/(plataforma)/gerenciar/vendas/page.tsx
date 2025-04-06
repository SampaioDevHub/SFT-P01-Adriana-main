import { Suspense } from 'react';
import RegisterSale from './vendas';
import { Loader } from '@/_components/Loader';

export default function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RegisterSale />
    </Suspense>
  );
}

// Fallback estiloso para vendas
function PageFallback() {
  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm">Carregando vendas. Por favor, aguarde...</p>
      </div>

      {/* Skeleton de tabela de vendas */}
      <div className="w-full max-w-6xl mx-auto border border-border rounded-lg overflow-hidden shadow-sm animate-pulse">
        <div className="grid grid-cols-5 gap-4 p-4 bg-muted/40 font-semibold text-muted-foreground">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>

        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-5 gap-4 p-4 border-t border-border bg-muted/10"
          >
            <div className="h-3 w-20 bg-muted rounded" />
            <div className="h-3 w-28 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
            <div className="h-3 w-10 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
