/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable import/no-unresolved */
import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'Painel Principal',
  description: 'Algoritimo sendo Desenvolvido'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
<<<<<<< HEAD
      <KBar>
        <SidebarProvider defaultOpen={defaultOpen} >
          <AppSidebar />
          <SidebarInset>
            <Header />
            {/* page main content */}
            {children}
            {/* page main content ends */}
          </SidebarInset>
        </SidebarProvider>
      </KBar>
=======
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen} >
        <NextTopLoader showSpinner={false} />
        <AppSidebar  />  
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
>>>>>>> 7d121b8c863480ca1f46417340761f37442c2ec8
  );
}
