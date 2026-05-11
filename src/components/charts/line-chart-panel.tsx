"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartFrame } from "@/components/charts/chart-frame"
import { getChartSeriesColor, type ChartSeriesKey } from "@/lib/colors"
import {
  getChartAxisDomainWithOffset,
  getChartGridColor,
  getChartTooltipContentStyle,
} from "@/lib/chart-utils"

export type ChartLinePoint = {
  label: string
  rawDate: Date
}

type LineChartPanelProps<TPoint extends ChartLinePoint> = {
  data: TPoint[]
  seriesKey: keyof TPoint & string
  seriesColor: ChartSeriesKey
  seriesLabel: string
  valueFormatter: (value: number) => string
  labelFormatter: (point: TPoint) => string
  yDomain?: [number, number] | [string, string]
  yAxisWidth?: number
  chartMargin?: { top: number; right: number; left: number; bottom: number }
  heightClassName?: string
}

const tooltipStyle = {
  ...getChartTooltipContentStyle(),
}

const tooltipWrapperStyle = {
  zIndex: 30,
}

const defaultChartMargin = { top: 16, right: 16, left: 8, bottom: 8 }

export function LineChartPanel<TPoint extends ChartLinePoint>({
  data,
  seriesKey,
  seriesColor,
  seriesLabel,
  valueFormatter,
  labelFormatter,
  yDomain,
  yAxisWidth = 50,
  chartMargin = defaultChartMargin,
  heightClassName = "h-72 w-full",
}: LineChartPanelProps<TPoint>) {
  const color = getChartSeriesColor(seriesColor)

  return (
    <ChartFrame className={heightClassName}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={chartMargin}>
          <CartesianGrid {...getChartGridColor(0.4)} vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            interval="preserveStartEnd"
            minTickGap={24}
          />
          <YAxis
            domain={yDomain ?? getChartAxisDomainWithOffset(5)}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            width={yAxisWidth}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={(label) => {
              const point = data.find((item) => item.label === label)
              return point ? labelFormatter(point) : label
            }}
            formatter={(value) => [valueFormatter(Number(value)), seriesLabel]}
          />
          <Line
            type="monotone"
            dataKey={seriesKey}
            stroke={color.stroke}
            strokeOpacity={color.strokeOpacity}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
