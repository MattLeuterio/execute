"use client"

import type { ReactNode } from "react"

import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartFrame } from "@/components/charts/chart-frame"
import { getChartGridColor, getChartTooltipContentStyle } from "@/lib/chart-utils"

type BarChartPanelProps = {
  data: unknown[]
  children: ReactNode
  xDataKey?: string
  yDomain?: [number, number] | [string, string]
  yAxisWidth?: number
  chartMargin?: { top: number; right: number; left: number; bottom: number }
  heightClassName?: string
  tooltipCursor?: object | boolean
  tooltipContent?: ReactNode | ((props: Record<string, unknown>) => ReactNode)
}

const tooltipStyle = {
  ...getChartTooltipContentStyle(),
}

const tooltipWrapperStyle = {
  zIndex: 30,
}

const defaultChartMargin = { top: 28, right: 12, left: 6, bottom: 8 }

export function BarChartPanel({
  data,
  children,
  xDataKey = "label",
  yDomain = [0, 100],
  yAxisWidth = 40,
  chartMargin = defaultChartMargin,
  heightClassName = "relative h-72 w-full",
  tooltipCursor = { fill: "var(--muted)", fillOpacity: 0.22 },
  tooltipContent,
}: BarChartPanelProps) {
  return (
    <ChartFrame className={heightClassName}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={chartMargin}>
          <CartesianGrid {...getChartGridColor(0.35)} vertical={false} />
          <XAxis
            dataKey={xDataKey}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={20}
          />
          <YAxis
            domain={yDomain}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11 }}
            tickMargin={8}
            width={yAxisWidth}
          />
          <Tooltip
            cursor={tooltipCursor}
            contentStyle={tooltipStyle}
            wrapperStyle={tooltipWrapperStyle}
            content={tooltipContent as never}
          />
          {children}
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
