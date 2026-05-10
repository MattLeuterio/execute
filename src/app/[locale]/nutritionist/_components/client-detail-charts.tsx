"use client"

import { useMemo, useState } from "react"

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
  getChartSeriesColor,
} from "@/lib/colors"
import {
  getChartAxisDomainWithOffset,
  getChartGridColor,
  getChartTooltipContentStyle,
} from "@/lib/chart-utils"
import { formatChartTooltipDate } from "@/lib/date-utils"

export interface AdherenceChartPoint {
  label: string
  adherence: number
  rawDate: Date
}

export interface WeightChartPoint {
  label: string
  weight: number
  rawDate: Date
}

export interface MeasurementsChartPoint {
  label: string
  rawDate: Date
  // Torso
  waist?: number
  abdomen?: number
  hips?: number
  chest?: number
  back?: number
  // Upper limbs
  arm?: number
  forearm?: number
  wrist?: number
  // Lower limbs
  thighProximal?: number
  thighMiddle?: number
  thighDistal?: number
  calf?: number
  shin?: number
}

interface ChartLabels {
  adherenceSeries: string
  weightSeries: string
  waist: string
  abdomen: string
  hips: string
  chest: string
  back: string
  arm: string
  forearm: string
  wrist: string
  thighProximal: string
  thighMiddle: string
  thighDistal: string
  calf: string
  shin: string
  thigh: string
  legs: string
}

type MeasurementSeriesKey =
  | "waist"
  | "abdomen"
  | "hips"
  | "chest"
  | "back"
  | "arm"
  | "forearm"
  | "wrist"
  | "thighProximal"
  | "thighMiddle"
  | "thighDistal"
  | "calf"
  | "shin"

// All 13 active measurement types in anatomical display order
const ALL_MEASUREMENT_SERIES: MeasurementSeriesKey[] = [
  "waist",
  "abdomen",
  "hips",
  "chest",
  "back",
  "arm",
  "forearm",
  "wrist",
  "thighProximal",
  "thighMiddle",
  "thighDistal",
  "calf",
  "shin",
]

// The 5 most clinically relevant series, active by default
const DEFAULT_ACTIVE_SERIES: MeasurementSeriesKey[] = [
  "waist",
  "hips",
  "abdomen",
  "chest",
  "thighProximal",
]

const MAX_DEFAULT_ACTIVE = 5

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="h-72 w-full">{children}</div>
}

const tooltipStyle = {
  ...getChartTooltipContentStyle(),
}

const tooltipWrapperStyle = {
  zIndex: 30,
}

const adherenceColor = getChartSeriesColor("adherence")
const weightColor = getChartSeriesColor("weight")
const measurementColors = Object.fromEntries(
  ALL_MEASUREMENT_SERIES.map((key) => [key, getChartSeriesColor(key)])
) as Record<MeasurementSeriesKey, ReturnType<typeof getChartSeriesColor>>
const chartMargin = { top: 16, right: 16, left: 8, bottom: 8 }

function hasMeasurementData(data: MeasurementsChartPoint[], key: MeasurementSeriesKey) {
  return data.some((point) => point[key] !== undefined)
}

export function AdherenceChart({ data, labels }: { data: AdherenceChartPoint[]; labels: ChartLabels }) {
  return (
    <ChartFrame>
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
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            width={44}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={(label) => {
              const point = data.find((p) => p.label === label)
              return point ? formatChartTooltipDate(point.rawDate) : label
            }}
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

export function WeightChart({
  data,
  labels,
  locale,
}: {
  data: WeightChartPoint[]
  labels: ChartLabels
  locale: string
}) {
  return (
    <ChartFrame>
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
            domain={getChartAxisDomainWithOffset(5)}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            width={50}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={(label) => {
              const point = data.find((p) => p.label === label)
              return point ? formatChartTooltipDate(point.rawDate, locale) : label
            }}
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

export function MeasurementsChart({
  data,
  labels,
  locale,
}: {
  data: MeasurementsChartPoint[]
  labels: ChartLabels
  locale: string
}) {
  const availableSeries = useMemo<MeasurementSeriesKey[]>(() => {
    return ALL_MEASUREMENT_SERIES.filter((key) => hasMeasurementData(data, key))
  }, [data])

  const [visibleSeries, setVisibleSeries] = useState<Record<MeasurementSeriesKey, boolean>>(() => {
    const initial = Object.fromEntries(
      ALL_MEASUREMENT_SERIES.map((k) => [k, false])
    ) as Record<MeasurementSeriesKey, boolean>
    let activeCount = 0
    for (const key of DEFAULT_ACTIVE_SERIES) {
      if (availableSeries.includes(key) && activeCount < MAX_DEFAULT_ACTIVE) {
        initial[key] = true
        activeCount++
      }
    }
    return initial
  })

  const legendItems = useMemo(
    () =>
      availableSeries.map((key) => ({
        key,
        label: labels[key],
        color: measurementColors[key].stroke,
      })),
    [availableSeries, labels]
  )

  function toggleSeries(key: MeasurementSeriesKey) {
    setVisibleSeries((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="h-112 w-full sm:h-96 md:h-72">
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
            domain={getChartAxisDomainWithOffset(5)}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickMargin={8}
            width={50}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
            contentStyle={tooltipStyle}
            wrapperStyle={tooltipWrapperStyle}
            labelFormatter={(label) => {
              const point = data.find((p) => p.label === label)
              return point ? formatChartTooltipDate(point.rawDate, locale) : label
            }}
            formatter={(value, _name, entry) => {
              const dataKey = entry?.dataKey as MeasurementSeriesKey | undefined
              const seriesLabel = dataKey ? labels[dataKey] : ""
              return [`${Number(value).toFixed(1)} cm`, seriesLabel]
            }}
          />
          <Legend
            align="left"
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: "12px", marginLeft: "16px", marginTop: "16px" }}
            content={() => (
              <div className="mt-3 ml-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:mt-4 sm:ml-4 sm:gap-x-4 sm:text-sm">
                {legendItems.map((item) => {
                  const isVisible = visibleSeries[item.key]
                  return (
                    <div
                      key={item.key}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleSeries(item.key)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          toggleSeries(item.key)
                        }
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 transition-opacity"
                      style={{ opacity: isVisible ? 1 : 0.4 }}
                      aria-pressed={isVisible}
                    >
                      <span
                        className="inline-block size-3 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            )}
          />
          {ALL_MEASUREMENT_SERIES.map((key) => {
            if (!availableSeries.includes(key) || !visibleSeries[key]) return null
            const color = measurementColors[key]
            return (
              <Line
                key={key}
                name={labels[key]}
                type="monotone"
                dataKey={key}
                stroke={color.stroke}
                strokeOpacity={color.strokeOpacity}
                strokeWidth={1.8}
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            )
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
