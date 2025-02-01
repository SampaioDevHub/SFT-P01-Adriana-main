/* eslint-disable import/no-unresolved */
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Painel Principal',
  description: 'Algoritimo sendo Desenvolvido'
};

export default async function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
    <div>
        {children}
    </div>
}
