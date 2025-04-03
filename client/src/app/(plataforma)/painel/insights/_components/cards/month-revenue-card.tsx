
import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/_components/ui/card'

export function MonthRevenueCard() {
  return (
    <Card className='transition-all duration-300 hover:scale-105 hover:shadow-md'>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-[1rem] w-[1rem] text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">R$ 1248,60</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 dark:text-emerald-400">+2%</span> em
          relação ao mês passado
        </p>
      </CardContent>
    </Card>
  )
}
