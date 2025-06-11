import { Skeleton } from '@/_components/ui/skeleton';
import { TableCell, TableRow } from '@/_components/ui/table';

export function SaleTableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
         <TableRow key={index}>
        <TableCell>
          <Skeleton className="h-10 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-10 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-10 w-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-10 w-full" />
        </TableCell>
        <TableCell className='w-4'>
          <Skeleton className="h-10 w-10" />
        </TableCell>
      </TableRow>
      ))}
    </>
  );
}
