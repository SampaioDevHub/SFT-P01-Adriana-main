import { Suspense } from 'react';
import RegisterProduct from './products';
import { Loader } from '@/_components/Loader';

export default function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RegisterProduct />
    </Suspense>
  );
}

function PageFallback() {
  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center gap-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader className="w-6 h-6 animate-spin text-primary" />
        <p className="text-sm">Carregando produtos. Por favor, aguarde...</p>
      </div>

      {/* Skeleton do conteúdo */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-muted/30 p-4 space-y-3 shadow-sm"
          >
            <div className="h-4 w-1/2 bg-muted rounded-md" />
            <div className="h-3 w-3/4 bg-muted rounded-md" />
            <div className="h-3 w-full bg-muted rounded-md" />
            <div className="h-3 w-[40%] bg-muted rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
