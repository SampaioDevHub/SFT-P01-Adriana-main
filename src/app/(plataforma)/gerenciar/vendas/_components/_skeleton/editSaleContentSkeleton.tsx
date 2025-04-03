import { DialogFooter } from '@/_components/ui/dialog';
import { Skeleton } from '@/_components/ui/skeleton';

export function EditSaleContentSkeleton() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
        <Skeleton className="h-[2.2rem] w-full" />
      </div>
      <DialogFooter>
        <Skeleton className="h-[3rem] w-[6rem]" />
      </DialogFooter>
    </form>
  );
}
