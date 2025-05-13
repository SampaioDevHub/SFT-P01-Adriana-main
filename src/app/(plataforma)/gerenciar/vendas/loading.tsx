import { Skeleton } from "@/_components/ui/skeleton";

export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse space-y-6">
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-6 w-1/5 bg-muted rounded-md" />
          <Skeleton className="h-6 w-1/5 bg-muted rounded-md" />
        </div>
  
        <div className="h-8 w-full bg-muted rounded-md"></div>
  
        <Skeleton className="h-8 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
        <Skeleton className="h-6 w-full bg-muted rounded-md"></Skeleton>
  
        <div className="flex w-full justify-between items-center">
          <Skeleton className="h-6 w-1/5 bg-muted rounded-md" />
          <Skeleton className="h-6 w-1/5 bg-muted rounded-md" />
        </div>
      </div>
    );
  }