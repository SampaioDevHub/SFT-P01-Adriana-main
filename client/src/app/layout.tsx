
// eslint-disable-next-line import/no-unresolved
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'
import { ThemeProvider } from "@/components/kbar/theme-provider"
import './globals.css';

export const metadata: Metadata = {
  title: 'Projeto Adriana ShowRoom Anapolis',
  description: "Projeto em Desenvolvimento SampaioForce"
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
          <body className={'overflow-hidden'}>
            <NextTopLoader showSpinner={false}  color="#e11d48" />
            <NuqsAdapter>
              <Toaster />
              <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
              </ThemeProvider>
            </NuqsAdapter>
          </body>
        </html>
    </ClerkProvider>
  );
}
