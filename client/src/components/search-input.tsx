'use client';
import { useKBar } from 'kbar';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

export default function SearchInput() {
  const { query } = useKBar();
  return (
    <div className='w-full space-y-2 '>
      <Button
        variant='outline'
        className='relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64'
        onClick={query.toggle}
      >
        <Search className='mr-2 h-4 w-4 '  />
        Procurar...
      </Button>
    </div>
  );
}
