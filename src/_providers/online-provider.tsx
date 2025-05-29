'use client';

import { useOnlineStatus } from '@/_hooks/use-online-status'
import { ReactNode } from 'react';

export function OnlineProvider({ children }: { children: ReactNode }) {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white text-black">
        <p>Você está offline. Verifique sua conexão com a internet.</p>
      </div>
    );
  }

  return <>{children}</>;
}