'use client';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserButton } from '@clerk/nextjs';

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <UserButton />
        </div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

