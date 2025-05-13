import { Skeleton } from '@/_components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container h-screen mx-auto px-4 py-8 animate-pulse space-y-6">
      <div className="flex gap-4 w-full justify-between items-center">
        <Skeleton className="h-32 w-full bg-muted rounded-md" />
        <Skeleton className="h-32 w-full bg-muted rounded-md" />
        <Skeleton className="h-32 w-full bg-muted rounded-md" />
      </div>

      <div className="flex w-full justify-between items-center">
        <Skeleton className="h-8 w-1/5 bg-muted rounded-md" />
        <Skeleton className="h-8 w-1/5 bg-muted rounded-md" />
      </div>

      <Skeleton className="w-full h-56 rounded-md bg-muted"></Skeleton>
    </div>
  );
}
