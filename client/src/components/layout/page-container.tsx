/* eslint-disable import/no-unresolved */
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[90vh]'>
          <div className='px-6 md:py-4'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='h-full p-4 md:px-6'>{children}</div>
      )}
    </>
  );
}
