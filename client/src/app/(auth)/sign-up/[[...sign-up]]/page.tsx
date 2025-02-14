/* eslint-disable import/no-unresolved */

import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme()
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-h-[80%] shadow-xl pr-1 overflow-y-auto overflow-x-hidden rounded-lg">
        <SignUp
          appearance={{
            baseTheme: theme === 'dark'? dark : undefined,
            elements: {
              formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
            },
          }}
        />
      </div>
    </div>
  );
}
