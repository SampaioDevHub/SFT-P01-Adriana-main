/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable import/no-unresolved */

import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider, ClerkLoading } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import { LoadingSpinner } from '@/components/loading';
import ReactQueryProvider from '@/components/providers/react-query-provider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Projeto Adriana ShowRoom Anapolis',
  description: 'Projeto em Desenvolvimento SampaioForce',
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html
        lang="Pt-BR"
        className={`${lato.className}`}
        suppressHydrationWarning
      >
        <body className={'overflow-hidden'}>
          <NuqsAdapter>
            <Toaster richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader showSpinner={false} />
              <ClerkLoading>
                <LoadingSpinner />
              </ClerkLoading>
              <ReactQueryProvider>
                {children}
                <Analytics />
              </ReactQueryProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}
