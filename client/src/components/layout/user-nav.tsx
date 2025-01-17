/* eslint-disable import/no-unresolved */
'use client';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserButton } from '@clerk/nextjs';

export function UserNav() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    return null;
  }

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
