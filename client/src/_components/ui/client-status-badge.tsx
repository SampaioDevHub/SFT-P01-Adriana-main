import { cn } from '@/_lib/utils';

interface ClientStatusBadgeProps {
  status: 'bom' | 'regular' | 'ruim' | '';
  className?: string;
}

export function ClientStatusBadge({
  status,
  className,
}: ClientStatusBadgeProps) {
  const baseClasses =
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';

  const statusClasses = {
    bom: 'bg-green-100 text-green-800',
    regular: 'bg-yellow-100 text-yellow-800',
    ruim: 'bg-red-100 text-red-800',
    '': 'bg-gray-100 text-gray-800',
  };

  const displayStatus = status || 'Não definido';

  return (
    <span className={cn(baseClasses, statusClasses[status], className)}>
      {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
    </span>
  );
}
