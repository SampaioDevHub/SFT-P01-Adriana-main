/* eslint-disable import/no-unresolved */
'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';
import { SignUpButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export function UserNav() {
  const { theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SignUpButton forceRedirectUrl="/sign-in">
          <UserButton
            appearance={{ baseTheme: theme === 'dark' ? dark : undefined }}
          />
        </SignUpButton>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
