import Image from 'next/image';
import React from 'react';

const DashboardAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex  flex-col">{children}</div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={'/assets/auth.png'}
          alt="Image"
          fill
          className="absolute inset-0 h-[660px] dark:hidden w-full object-cover"
        />
        <Image
          src={'/assets/auth-dark.png'}
          alt="Image"
          fill
          className="absolute inset-0 h-[660px] hidden dark:block w-full object-cover"
        />
      </div>
    </div>
  );
};
export default DashboardAuthLayout;
