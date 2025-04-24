// layout.tsx
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

import { SidebarInset, SidebarProvider } from '@/_components/ui/sidebar';
import { AppSidebar } from '@/_components/layout/sidebar';
import { Header } from '@/_components/layout/header';
import { KBar } from '@/_components/kbar';

export const metadata: Metadata = {
  title: 'Painel Principal',
  description: 'Algoritmo sendo desenvolvido',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let defaultOpen = false;

  try {
    const cookieStore = await cookies();
    const sidebarState = cookieStore.get('sidebar:state')?.value;
    const isValid = sidebarState === 'true' || sidebarState === 'false';
    defaultOpen = isValid && sidebarState === 'true';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao recuperar estado do sidebar:', error);
  }

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <NextTopLoader showSpinner={false} />
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex flex-col flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
