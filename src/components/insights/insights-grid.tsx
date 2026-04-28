"use client"

import { useId } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { getRevealInViewProps } from "@/components/marketing/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getChartGradientStops,
  getChartSeriesColor,
} from "@/lib/colors"
import {
  getChartAxisDomainWithOffset,
  getChartGridColor,
  getChartTooltipContentStyle,
} from "@/lib/chart-utils"
import {
  adherenceData,
  formatTooltipWeekLabel,
  localizeWeekLabels,
  measurementsData,
  weightData,
} from "@/lib/insights"
import type { Language } from "@/lib/i18n"
import { insightsContent, translations } from "@/lib/i18n"

type InsightsGridProps = {
  language: Language
  withReveal?: boolean
}

function InsightsCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="border border-border/70 bg-card/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md hover:ring-1 hover:ring-primary/15 motion-reduce:transform-none motion-reduce:transition-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
          {title}
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="chart-focus-clean h-44 w-full">{children}</div>
      </CardContent>
    </Card>
  )
}

export function InsightsGrid({ language, withReveal = false }: InsightsGridProps) {
  const reducedMotion = useReducedMotion() ?? false
  const uniqueId = useId().replace(/:/g, "")
  const t = translations[language]
  const { weekPointPrefix, tooltipLabelPrefix, adherenceLabel, weightLabel, waistLabel, hipsLabel, chestLabel } =
    insightsContent[language]

  const localizedAdherenceData = localizeWeekLabels(adherenceData, weekPointPrefix)
  const localizedWeightData = localizeWeekLabels(weightData, weekPointPrefix)
  const localizedMeasurementsData = localizeWeekLabels(measurementsData, weekPointPrefix)

  const adherenceGradientId = `${uniqueId}-adherence-fill`
  const weightGradientId = `${uniqueId}-weight-fill`
  const waistGradientId = `${uniqueId}-waist-fill`
  const hipsGradientId = `${uniqueId}-hips-fill`
  const chestGradientId = `${uniqueId}-chest-fill`

  const adherenceColor = getChartSeriesColor("adherence")
  const weightColor = getChartSeriesColor("weight")
  const waistColor = getChartSeriesColor("waist")
  const hipsColor = getChartSeriesColor("hips")
  const chestColor = getChartSeriesColor("chest")

  const adherenceStops = getChartGradientStops("adherence")
  const weightStops = getChartGradientStops("weight")
  const waistStops = getChartGradientStops("waist")
  const hipsStops = getChartGradientStops("hips")
  const chestStops = getChartGradientStops("chest")

  const tooltipSharedProps = {
    cursor: false,
    separator: ": ",
    wrapperStyle: { zIndex: 30 },
    contentStyle: {
      ...getChartTooltipContentStyle(),
    },
    labelStyle: { color: "var(--foreground)", fontSize: 12 },
    itemStyle: { color: "var(--foreground)", fontSize: 12 },
  }

  const Wrapper = withReveal ? motion.div : "div"

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Wrapper
        {...(withReveal ? getRevealInViewProps({ delay: 0, reducedMotion }) : {})}
      >
        <InsightsCard
          title={t.adherenceOverTimeTitle}
          description={t.adherenceOverTimeDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={localizedAdherenceData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id={adherenceGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={adherenceStops.start.color} stopOpacity={adherenceStops.start.opacity} />
                  <stop offset="100%" stopColor={adherenceStops.end.color} stopOpacity={adherenceStops.end.opacity} />
                </linearGradient>
              </defs>
              <CartesianGrid {...getChartGridColor(0.28)} vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                dy={8}
              />
              <YAxis hide domain={[55, 85]} />
              <Tooltip
                {...tooltipSharedProps}
                labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
                formatter={(value) => [`${Number(value ?? 0)}%`, adherenceLabel]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={adherenceColor.stroke}
                strokeOpacity={adherenceColor.strokeOpacity}
                strokeWidth={1.8}
                fill={`url(#${adherenceGradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </InsightsCard>
      </Wrapper>

      <Wrapper
        {...(withReveal ? getRevealInViewProps({ delay: 0.08, reducedMotion }) : {})}
      >
        <InsightsCard title={t.weightTrendTitle} description={t.weightTrendDesc}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={localizedWeightData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id={weightGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={weightStops.start.color} stopOpacity={weightStops.start.opacity} />
                  <stop offset="100%" stopColor={weightStops.end.color} stopOpacity={weightStops.end.opacity} />
                </linearGradient>
              </defs>
              <CartesianGrid {...getChartGridColor(0.22)} vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                dy={8}
              />
              <YAxis hide domain={[76, 79.2]} />
              <Tooltip
                {...tooltipSharedProps}
                labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
                formatter={(value) => [`${Number(value ?? 0).toFixed(1)} kg`, weightLabel]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={weightColor.stroke}
                strokeOpacity={0.55}
                strokeWidth={1.6}
                fill={`url(#${weightGradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </InsightsCard>
      </Wrapper>

      <Wrapper
        {...(withReveal ? getRevealInViewProps({ delay: 0.16, reducedMotion }) : {})}
      >
        <InsightsCard
          title={t.bodyMeasurementsTitle}
          description={t.bodyMeasurementsDesc}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={localizedMeasurementsData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id={waistGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={waistStops.start.color} stopOpacity={waistStops.start.opacity} />
                  <stop offset="100%" stopColor={waistStops.end.color} stopOpacity={waistStops.end.opacity} />
                </linearGradient>
                <linearGradient id={hipsGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={hipsStops.start.color} stopOpacity={hipsStops.start.opacity} />
                  <stop offset="100%" stopColor={hipsStops.end.color} stopOpacity={hipsStops.end.opacity} />
                </linearGradient>
                <linearGradient id={chestGradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chestStops.start.color} stopOpacity={chestStops.start.opacity} />
                  <stop offset="100%" stopColor={chestStops.end.color} stopOpacity={chestStops.end.opacity} />
                </linearGradient>
              </defs>
              <CartesianGrid {...getChartGridColor(0.2)} vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                dy={8}
              />
              <YAxis hide domain={getChartAxisDomainWithOffset(5)} />
              <Tooltip
                {...tooltipSharedProps}
                labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
                formatter={(value, _name, entry) => {
                  const dataKey = String(entry?.dataKey ?? "")
                  const metric =
                    dataKey === "waist"
                      ? waistLabel
                      : dataKey === "hips"
                        ? hipsLabel
                        : chestLabel

                  return [`${Number(value ?? 0).toFixed(1)} cm`, metric]
                }}
              />
              <Area
                type="monotone"
                dataKey="waist"
                stroke={waistColor.stroke}
                strokeOpacity={waistColor.strokeOpacity}
                strokeWidth={1.7}
                fill={`url(#${waistGradientId})`}
                dot={false}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="hips"
                stroke={hipsColor.stroke}
                strokeOpacity={hipsColor.strokeOpacity}
                strokeWidth={1.4}
                fill={`url(#${hipsGradientId})`}
                dot={false}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="chest"
                stroke={chestColor.stroke}
                strokeOpacity={chestColor.strokeOpacity}
                strokeWidth={1.3}
                fill={`url(#${chestGradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${waistColor.legendDotClass}`} />
              {waistLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${hipsColor.legendDotClass}`} />
              {hipsLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className={`size-2 rounded-full ${chestColor.legendDotClass}`} />
              {chestLabel}
            </span>
          </div>
        </InsightsCard>
      </Wrapper>
    </div>
  )
}