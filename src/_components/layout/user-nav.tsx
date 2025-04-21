'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

import { SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export function UserNav() {
  const { theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SignUpButton forceRedirectUrl="/sign-in">
          <UserButton
            showName
            appearance={{ baseTheme: theme === 'dark' ? dark : undefined }}
          />
        </SignUpButton>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
