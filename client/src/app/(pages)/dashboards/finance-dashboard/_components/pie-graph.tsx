'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/_components/ui/chart';
const chartData = [
  { browser: 'string', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'string', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'string', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'string', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'string', visitors: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
  visitors: {
    label: 'String',
  },
  chrome: {
    label: 'String',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'String',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'String',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'String',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'String',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function PieGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>String</CardTitle>
        <CardDescription>String</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          String
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Algoritimo <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Algoritimo</div>
      </CardFooter>
    </Card>
  );
}
