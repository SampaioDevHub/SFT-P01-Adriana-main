/* eslint-disable import/no-unresolved */
'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // eslint-disable-next-line import/no-unresolved
} from '@/_components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/_components/ui/chart';
const chartData = [
  { month: 'Janeiro', desktop: 186, mobile: 80 },
  { month: 'Fevereiro', desktop: 305, mobile: 200 },
  { month: 'Março', desktop: 237, mobile: 120 },
  { month: 'Abril', desktop: 73, mobile: 190 },
  { month: 'Maio', desktop: 209, mobile: 130 },
  { month: 'Junho', desktop: 214, mobile: 140 },
  { month: 'julho', desktop: 214, mobile: 140 },
  { month: 'Agosto', desktop: 214, mobile: 140 },
  { month: 'Setembro', desktop: 214, mobile: 140 },
  { month: 'Outubro', desktop: 214, mobile: 140 },
  { month: 'Novembro', desktop: 214, mobile: 140 },
  { month: 'Dezembro', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'String',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'String',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Algoritimo SFP01 Grafico</CardTitle>
        <CardDescription>String Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              String <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              String
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
