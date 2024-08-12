"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Monday", hanoi: 186, tphcm: 80 },
  { day: "Tuesday", hanoi: 305, tphcm: 200 },
  { day: "Wednesday", hanoi: 237, tphcm: 120 },
  { day: "Thursday", hanoi: 73, tphcm: 190 },
  { day: "Friday", hanoi: 209, tphcm: 130 },
  { day: "Saturday", hanoi: 214, tphcm: 140 },
  { day: "Sunday", hanoi: 100, tphcm: 180 },
];

const chartConfig = {
  hanoi: {
    label: "Hà Nội",
    color: "#2563eb",
  },
  tphcm: {
    label: "TP. HCM",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function InvoiceChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[380px] w-full bg-white"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="hanoi" fill="var(--color-hanoi)" radius={4} />
        <Bar dataKey="tphcm" fill="var(--color-tphcm)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
