'use client';

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <span className="block w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
          <span className="block w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
          <span className="block w-4 h-4 rounded-full bg-primary animate-bounce"></span>
        </div>
        <p className="text-[#5E5E5E] font-medium tracking-wide">Carregando Adriana Showroom</p>
      </div>
    </div>
  );
}
