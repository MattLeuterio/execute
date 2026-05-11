"use client"

import { useId } from "react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartFrame } from "@/components/charts/chart-frame"
import {
  getChartGradientStops,
  getChartSeriesColor,
  type ChartSeriesKey,
} from "@/lib/colors"
import { getChartGridColor, getChartTooltipContentStyle } from "@/lib/chart-utils"

export type ChartAreaPoint = {
  label: string
  rawDate?: Date
}

export type AreaSeriesConfig = {
  dataKey: string
  seriesColor: ChartSeriesKey
  strokeWidth?: number
  strokeOpacity?: number
  fillOpacity?: number
}

type AreaChartPanelProps<TPoint extends ChartAreaPoint> = {
  data: TPoint[]
  series: Array<AreaSeriesConfig>
  labelFormatter: (label: string | number, point?: TPoint) => string
  tooltipFormatter: (value: number, entry?: { dataKey?: string }) => [string, string]
  yDomain?: [number, number] | [string, string]
  hideYAxis?: boolean
  heightClassName?: string
  chartMargin?: { top: number; right: number; left: number; bottom: number }
}

const tooltipStyle = {
  ...getChartTooltipContentStyle(),
}

const tooltipWrapperStyle = {
  zIndex: 30,
}

const defaultChartMargin = { top: 4, right: 4, left: -16, bottom: 0 }

export function AreaChartPanel<TPoint extends ChartAreaPoint>({
  data,
  series,
  labelFormatter,
  tooltipFormatter,
  yDomain,
  hideYAxis = true,
  heightClassName = "h-44 w-full",
  chartMargin = defaultChartMargin,
}: AreaChartPanelProps<TPoint>) {
  const uniqueId = useId().replace(/:/g, "")

  return (
    <ChartFrame className={heightClassName}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={chartMargin}>
          <defs>
            {series.map((item) => {
              const gradientId = `${uniqueId}-${item.dataKey}-fill`
              const stops = getChartGradientStops(
                item.seriesColor,
                item.fillOpacity,
              )

              return (
                <linearGradient key={item.dataKey} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={stops.start.color}
                    stopOpacity={stops.start.opacity}
                  />
                  <stop
                    offset="100%"
                    stopColor={stops.end.color}
                    stopOpacity={stops.end.opacity}
                  />
                </linearGradient>
              )
            })}
          </defs>
          <CartesianGrid {...getChartGridColor(0.28)} vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            dy={8}
          />
          <YAxis hide={hideYAxis} domain={yDomain} />
          <Tooltip
            cursor={false}
            separator=": "
            wrapperStyle={tooltipWrapperStyle}
            contentStyle={tooltipStyle}
            labelStyle={{ color: "var(--foreground)", fontSize: 12 }}
            itemStyle={{ color: "var(--foreground)", fontSize: 12 }}
            labelFormatter={(label) => {
              const point = data.find((item) => item.label === label)
              return labelFormatter(label, point)
            }}
            formatter={(value, _name, entry) => tooltipFormatter(Number(value ?? 0), {
              dataKey: String(entry?.dataKey ?? ""),
            })}
          />
          {series.map((item) => {
            const color = getChartSeriesColor(item.seriesColor)
            const gradientId = `${uniqueId}-${item.dataKey}-fill`

            return (
              <Area
                key={item.dataKey}
                type="monotone"
                dataKey={item.dataKey}
                stroke={color.stroke}
                strokeOpacity={item.strokeOpacity ?? color.strokeOpacity}
                strokeWidth={item.strokeWidth ?? 1.8}
                fill={`url(#${gradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            )
          })}
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
