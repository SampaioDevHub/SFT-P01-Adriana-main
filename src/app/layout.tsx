/* eslint-disable @next/next/no-sync-scripts */

import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';

// Fonts
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Painel SampaioForce',
  description: 'Plataforma de gerenciamento',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
  },
};


export const viewport: Viewport = {
  themeColor: '#e11d48',
};

// Clerk
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';

// Providers
import { ThemeProvider } from '@/_providers/theme-provider';
import { ReactQueryProvider } from '@/_providers/react-query-provider';

// UI/UX
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/_components/ui/sonner';
import { FloatingChat } from '@/_components/layout/FloatingChat';
import { Analytics } from '@vercel/analytics/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// Styles
import './globals.css';
import { OnlineProvider } from '@/_providers/online-provider';

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
              <ReactQueryProvider>
                <OnlineProvider>{children}</OnlineProvider>
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
