/* eslint-disable import/no-unresolved */
'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignUpButton, UserButton } from '@clerk/nextjs';

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SignUpButton forceRedirectUrl="/sign-in">
          <UserButton/>
        </SignUpButton>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
