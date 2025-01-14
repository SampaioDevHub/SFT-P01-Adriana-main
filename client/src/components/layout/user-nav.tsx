'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserButton } from '@clerk/nextjs';
export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
        <UserButton afterSignOutUrl="/sign-in" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

