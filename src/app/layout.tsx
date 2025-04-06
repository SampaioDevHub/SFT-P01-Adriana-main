/* eslint-disable @next/next/no-sync-scripts */

import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

// Fonts
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

// Metadata
export const metadata: Metadata = {
  title: 'Painel SampaioForce',
  description: 'Plataforma de gerenciamento',
  manifest: '/manifest.json',
  themeColor: '#e11d48',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};

// Clerk
import { ClerkProvider, ClerkLoading } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

// Providers
import { ThemeProvider } from '@/_components/providers/theme-provider';
import ReactQueryProvider from '@/_components/providers/react-query-provider';

// UI/UX
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/_components/ui/sonner';
import { LoadingSpinner } from '@/_components/loading';
import { FloatingChat } from '@/_components/FloatingChat';
import { Analytics } from '@vercel/analytics/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Styles
import './globals.css';




// Root Layout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={lato.className} suppressHydrationWarning>
        <body className="overflow-hidden">
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
                <FloatingChat />
              </ReactQueryProvider>
            </ThemeProvider>
          </NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}
