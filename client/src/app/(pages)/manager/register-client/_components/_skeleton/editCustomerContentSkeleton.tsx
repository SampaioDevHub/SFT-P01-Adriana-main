import { Skeleton } from '@/components/ui/skeleton';

export function EditCustomerContentSkeleton() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-[4rem] w-full'/>
      <div className='space-y-2'>
        <Skeleton className='h-[2.2rem] w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-[2.2rem] w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-[2.2rem] w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-[2.2rem] w-full' />
      </div>
      <div>
        <Skeleton className='h-[3rem] w-[6rem]' />
      </div>
    </div>
  );
}
