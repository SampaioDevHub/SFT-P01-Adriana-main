'use client';

import { LoadingSpinner } from '@/_components/layout/loading';
import { ClerkLoading } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

const DashboardAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 isolate">
      <div className="flex flex-col bg-background">
        <ClerkLoading>
          <LoadingSpinner />
        </ClerkLoading>
        {children}
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* Light Mode Image */}
        <Image
          src="/assets/auth.png"
          alt="Tela de autenticação"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-[660px] dark:hidden w-full object-cover"
        />
        {/* Dark Mode Image */}
        <Image
          src="/assets/auth-dark.png"
          alt="Tela de autenticação modo escuro"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-[660px] hidden dark:block w-full object-cover"
        />
      </div>
    </div>
  );
};

export default DashboardAuthLayout;
