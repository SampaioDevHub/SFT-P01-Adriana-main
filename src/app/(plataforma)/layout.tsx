/* eslint-disable @next/next/no-sync-scripts */



import KBar from '@/_components/kbar'
import AppSidebar from '@/_components/layout/sidebar';
import Header from '@/_components/layout/header';

import { SidebarInset, SidebarProvider } from '@/_components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Painel Principal',
  description: 'Algoritimo sendo Desenvolvido',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <NextTopLoader showSpinner={false} />
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page div content */}
          {children}
          {/* page div content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
