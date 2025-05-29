// components/OfflineOverlay.tsx
export function OfflineOverlay() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center p-4">
      <h2 className="text-2xl font-semibold mb-2">Sem conexão com a internet</h2>
      <p className="text-gray-600">Verifique sua conexão. A página será atualizada automaticamente quando a conexão voltar.</p>
      <div className="mt-6 animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
