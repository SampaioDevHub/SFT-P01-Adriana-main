'use client'
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';
import { useUser } from '@clerk/nextjs';
export default function OverViewPage() {
  const { user } = useUser(); 
  return (
    <PageContainer scrollable>
      <div className='space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Seja bem-vindo {user?.firstName || 'Usuário'} 👋
          </h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card className="transition-all duration-300 hover:shadow-md hover:scale-105">
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Algoritmo SFP01
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>$Number</div>
                  <p className='text-xs text-muted-foreground'>
                    Algoritimo String
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:shadow-md hover:scale-105'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Algoritmo SFP01
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+$Number</div>
                  <p className='text-xs text-muted-foreground'>
                    Algoritimo String
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:shadow-md hover:scale-105'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Algoritmo SFP01</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+Number</div>
                  <p className='text-xs text-muted-foreground'>
                    Algoritimo String
                  </p>
                </CardContent>
              </Card>
              <Card className='transition-all duration-300 hover:shadow-md hover:scale-105'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Algoritmo SFP01
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+Number</div>
                  <p className='text-xs text-muted-foreground'>
                    Algoritimo String
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 '>
              <div className='col-span-4'>
                <BarGraph />
              </div>
              <Card className='col-span-4 md:col-span-3'>
                <CardHeader>
                  <CardTitle>Algoritomo Clientes</CardTitle>
                  <CardDescription>
                    Algoritimo String
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className='col-span-4'>
                <AreaGraph />
              </div>
              <div className='col-span-4 md:col-span-3'>
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
