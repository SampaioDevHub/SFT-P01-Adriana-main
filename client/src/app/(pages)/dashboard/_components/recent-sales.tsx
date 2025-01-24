import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className='space-y-8'>
        <div className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src=''
              alt='Avatar'
            />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>$Nome</p>
            <p className='text-sm text-muted-foreground'>
              $Email
            </p>
            <p className='text-sm text-muted-foreground'>
              $Telefone
            </p>
          </div>
          <div className='ml-auto font-medium'>+$Number</div>
        </div>
        <div className='flex items-center'>
          <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
            <AvatarImage
              src=''
              alt='Avatar'
            />
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>$Nome</p>
            <p className='text-sm text-muted-foreground'>$Email</p>
            <p className='text-sm text-muted-foreground'>
              $Telefone
            </p>
          </div>
          <div className='ml-auto font-medium'>+$Number</div>
        </div>
        <div className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src=''
              alt='Avatar'
            />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>String</p>
            <p className='text-sm text-muted-foreground'>
              String
            </p>
            <p className='text-sm text-muted-foreground'>
              $Telefone
            </p>
          </div>
          <div className='ml-auto font-medium'>+$Number</div>
        </div>
        <div className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src=''
              alt='Avatar'
            />
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>String</p>
            <p className='text-sm text-muted-foreground'>String</p>
          </div>
          <div className='ml-auto font-medium'>+$Number</div>
        </div>
        <div className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage
              src=''
              alt='Avatar'
            />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>String</p>
            <p className='text-sm text-muted-foreground'>String</p>
          </div>
          <div className='ml-auto font-medium'>+$Number</div>
        </div>
    </div>
  );
}
