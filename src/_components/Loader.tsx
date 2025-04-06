// @/_components/ui/loader.tsx
import { Loader2 } from 'lucide-react';
import { cn } from '@/_lib/utils';

export function Loader({ className }: { className?: string }) {
  return <Loader2 className={cn('animate-spin', className)} />;
}
