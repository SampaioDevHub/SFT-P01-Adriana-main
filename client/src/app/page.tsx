'use client'; // Certifique-se de que este é um componente de cliente

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { isLoaded, userId } = useAuth(); // Use o hook useAuth para acessar o estado de autenticação
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return; // Aguarda até que o estado de autenticação seja carregado
    }

    if (!userId) {
      router.push('/sign-in'); // Redireciona para a página de login se o usuário não estiver autenticado
    } else {
      router.push('/dashboard/overview'); // Redireciona para o dashboard se o usuário estiver autenticado
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) {
    return <div>Loading...</div>; // Aguarda até que o estado de autenticação seja carregado
  }

  return null; // Nada será renderizado, pois o redirecionamento já ocorreu
}
