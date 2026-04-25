"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  getChartGridColor,
  getChartSeriesColor,
  getChartTooltipContentStyle,
} from "@/lib/colors"

export interface AdherenceChartPoint {
  label: string
  adherence: number
}

export interface WeightChartPoint {
  label: string
  weight: number
}

export interface MeasurementsChartPoint {
  label: string
  waist?: number
  hips?: number
  chest?: number
}

interface ChartLabels {
  adherenceSeries: string
  weightSeries: string
  waist: string
  hips: string
  chest: string
}

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="h-64 w-full">{children}</div>
}

const tooltipStyle = {
  ...getChartTooltipContentStyle(),
}

const adherenceColor = getChartSeriesColor("adherence")
const weightColor = getChartSeriesColor("weight")
const waistColor = getChartSeriesColor("waist")
const hipsColor = getChartSeriesColor("hips")
const chestColor = getChartSeriesColor("chest")

export function AdherenceChart({ data, labels }: { data: AdherenceChartPoint[]; labels: ChartLabels }) {
  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid {...getChartGridColor(0.4)} vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={32} />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            formatter={(value) => [`${Number(value)}%`, labels.adherenceSeries]}
          />
          <Line
            type="monotone"
            dataKey="adherence"
            stroke={adherenceColor.stroke}
            strokeOpacity={adherenceColor.strokeOpacity}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export function WeightChart({ data, labels }: { data: WeightChartPoint[]; labels: ChartLabels }) {
  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid {...getChartGridColor(0.4)} vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={40} />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            formatter={(value) => [`${Number(value).toFixed(1)} kg`, labels.weightSeries]}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke={weightColor.stroke}
            strokeOpacity={weightColor.strokeOpacity}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export function MeasurementsChart({ data, labels }: { data: MeasurementsChartPoint[]; labels: ChartLabels }) {
  return (
    <ChartFrame>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid {...getChartGridColor(0.4)} vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={40} />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            formatter={(value, _name, entry) => {
              const dataKey = String(entry?.dataKey ?? "")
              const seriesLabel =
                dataKey === "waist"
                  ? labels.waist
                  : dataKey === "hips"
                    ? labels.hips
                    : labels.chest

              return [`${Number(value).toFixed(1)} cm`, seriesLabel]
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
          <Line
            name={labels.waist}
            type="monotone"
            dataKey="waist"
            stroke={waistColor.stroke}
            strokeOpacity={waistColor.strokeOpacity}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            name={labels.hips}
            type="monotone"
            dataKey="hips"
            stroke={hipsColor.stroke}
            strokeOpacity={hipsColor.strokeOpacity}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            name={labels.chest}
            type="monotone"
            dataKey="chest"
            stroke={chestColor.stroke}
            strokeOpacity={chestColor.strokeOpacity}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}
