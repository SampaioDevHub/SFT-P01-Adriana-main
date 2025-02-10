/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable import/no-unresolved */

import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider, ClerkLoading } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import { ThemeProvider } from '@/components/providers/theme-provider';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import { Analytics } from '@vercel/analytics/next';
import { LoadingSpinner } from '@/components/loading';

export const metadata: Metadata = {
  title: 'Projeto Adriana ShowRoom Anapolis',
  description: 'Projeto em Desenvolvimento SampaioForce'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang='Pt-BR' className={`${lato.className}`} suppressHydrationWarning>
        <head>
          <script src="https://app.secureprivacy.ai/script/679f9c1c060b2f3e7323a7e2.js"></script>
        </head>
        <body className={'overflow-hidden'}>
          <NextTopLoader showSpinner={false} color="#e11d48" />
          <NuqsAdapter >
            <Toaster richColors />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
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
