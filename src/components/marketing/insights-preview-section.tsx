"use client"

import { motion, useReducedMotion } from "framer-motion"

import { getRevealInViewProps } from "@/components/marketing/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LandingSection } from "@/components/marketing/landing-section"
import type { Language } from "@/lib/i18n"
import { insightsContent, translations } from "@/lib/i18n"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type InsightsPreviewSectionProps = {
  language: Language
}

const adherenceData = [
  { label: "W1", value: 62 },
  { label: "W2", value: 66 },
  { label: "W3", value: 71 },
  { label: "W4", value: 69 },
  { label: "W5", value: 74 },
  { label: "W6", value: 78 },
]

const weightData = [
  { label: "W1", value: 78.6 },
  { label: "W2", value: 78.1 },
  { label: "W3", value: 77.9 },
  { label: "W4", value: 77.4 },
  { label: "W5", value: 77.1 },
  { label: "W6", value: 76.8 },
]

const measurementsData = [
  { label: "W1", waist: 86, hips: 98, chest: 94 },
  { label: "W2", waist: 85.6, hips: 97.8, chest: 93.8 },
  { label: "W3", waist: 85.2, hips: 97.4, chest: 93.5 },
  { label: "W4", waist: 84.7, hips: 97.1, chest: 93.2 },
  { label: "W5", waist: 84.3, hips: 96.9, chest: 93 },
  { label: "W6", waist: 84, hips: 96.5, chest: 92.8 },
]

function localizeWeekLabels<T extends { label: string }>(data: T[], weekPointPrefix: string): T[] {
  return data.map((item) => ({
    ...item,
    label: `${weekPointPrefix}${item.label.replace(/^\D+/, "")}`,
  }))
}

function formatTooltipWeekLabel(label: string | number, tooltipLabelPrefix: string) {
  const value = String(label)
  const weekNumber = value.replace(/^\D+/, "")

  return weekNumber ? `${tooltipLabelPrefix} ${weekNumber}` : `${tooltipLabelPrefix} ${value}`
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
        <div className="h-44 w-full">{children}</div>
      </CardContent>
    </Card>
  )
}

export function InsightsPreviewSection({ language }: InsightsPreviewSectionProps) {
  const reducedMotion = useReducedMotion() ?? false
  const t = translations[language]
  const { weekPointPrefix, tooltipLabelPrefix, adherenceLabel, weightLabel, waistLabel, hipsLabel, chestLabel } =
    insightsContent[language]

  const localizedAdherenceData = localizeWeekLabels(adherenceData, weekPointPrefix)
  const localizedWeightData = localizeWeekLabels(weightData, weekPointPrefix)
  const localizedMeasurementsData = localizeWeekLabels(measurementsData, weekPointPrefix)

  const tooltipSharedProps = {
    cursor: { stroke: "var(--border)", strokeOpacity: 0.5, strokeWidth: 1 },
    separator: ": ",
    contentStyle: {
      backgroundColor: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 10,
    },
    labelStyle: { color: "var(--foreground)", fontSize: 12 },
    itemStyle: { color: "var(--foreground)", fontSize: 12 },
  }

  return (
    <LandingSection
      id="insights"
      eyebrow={t.insightsLabel}
      title={t.insightsTitle}
      description={t.insightsDesc}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div {...getRevealInViewProps({ delay: 0, reducedMotion })}>
          <InsightsCard
            title={t.adherenceOverTimeTitle}
            description={t.adherenceOverTimeDesc}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={localizedAdherenceData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="insights-adherence-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.28} vertical={false} />
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
                  formatter={(value) => [
                    `${Number(value ?? 0)}%`,
                    adherenceLabel,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--primary)"
                  strokeWidth={1.8}
                  fill="url(#insights-adherence-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </InsightsCard>
        </motion.div>

        <motion.div {...getRevealInViewProps({ delay: 0.08, reducedMotion })}>
          <InsightsCard title={t.weightTrendTitle} description={t.weightTrendDesc}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={localizedWeightData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="insights-weight-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.22} vertical={false} />
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
                  formatter={(value) => [
                    `${Number(value ?? 0).toFixed(1)} kg`,
                    weightLabel,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--foreground)"
                  strokeOpacity={0.55}
                  strokeWidth={1.6}
                  fill="url(#insights-weight-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </InsightsCard>
        </motion.div>

        <motion.div {...getRevealInViewProps({ delay: 0.16, reducedMotion })}>
          <InsightsCard
            title={t.bodyMeasurementsTitle}
            description={t.bodyMeasurementsDesc}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={localizedMeasurementsData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="insights-waist-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="insights-hips-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="insights-chest-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity={0.07} />
                    <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeOpacity={0.2} vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  dy={8}
                />
                <YAxis hide domain={[82, 100]} />
                <Tooltip
                  {...tooltipSharedProps}
                  labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
                  formatter={(value, name) => {
                    const metric =
                      name === "waist"
                        ? waistLabel
                        : name === "hips"
                          ? hipsLabel
                          : chestLabel

                    return [`${Number(value ?? 0).toFixed(1)} cm`, metric]
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="waist"
                  stroke="var(--primary)"
                  strokeWidth={1.7}
                  fill="url(#insights-waist-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="hips"
                  stroke="var(--foreground)"
                  strokeOpacity={0.5}
                  strokeWidth={1.4}
                  fill="url(#insights-hips-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="chest"
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.65}
                  strokeWidth={1.3}
                  fill="url(#insights-chest-fill)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                {waistLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-foreground/45" />
                {hipsLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground/65" />
                {chestLabel}
              </span>
            </div>
          </InsightsCard>
        </motion.div>
      </div>
    </LandingSection>
  )
}
