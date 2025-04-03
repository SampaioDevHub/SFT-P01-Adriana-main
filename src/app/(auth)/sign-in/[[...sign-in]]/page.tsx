'use client';

import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center w-full h-[100vh] ">
      <SignIn
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          elements: {
            formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
          },
        }}
      />
    </div>
  );
}
