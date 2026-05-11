"use client"

import { useId } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { AreaChartPanel } from "@/components/charts/area-chart-panel"
import { getRevealInViewProps } from "@/components/marketing/motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getChartGradientStops,
  getChartSeriesColor,
} from "@/lib/colors"
import {
  getChartAxisDomainWithOffset,
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
  const t = translations[language]
  const { weekPointPrefix, tooltipLabelPrefix, adherenceLabel, weightLabel, waistLabel, hipsLabel, chestLabel } =
    insightsContent[language]

  const localizedAdherenceData = localizeWeekLabels(adherenceData, weekPointPrefix)
  const localizedWeightData = localizeWeekLabels(weightData, weekPointPrefix)
  const localizedMeasurementsData = localizeWeekLabels(measurementsData, weekPointPrefix)

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
          <AreaChartPanel
            data={localizedAdherenceData}
            series={[{ dataKey: "value", seriesColor: "adherence", strokeWidth: 1.8 }]}
            yDomain={[55, 85]}
            labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
            tooltipFormatter={() => [`%`, adherenceLabel]}
          />
        </InsightsCard>
      </Wrapper>

      <Wrapper
        {...(withReveal ? getRevealInViewProps({ delay: 0.08, reducedMotion }) : {})}
      >
        <InsightsCard title={t.weightTrendTitle} description={t.weightTrendDesc}>
          <AreaChartPanel
            data={localizedWeightData}
            series={[{ dataKey: "value", seriesColor: "weight", strokeWidth: 1.6, strokeOpacity: 0.55 }]}
            yDomain={[76, 79.2]}
            labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
            tooltipFormatter={(value) => [`${value.toFixed(1)} kg`, weightLabel]}
          />
        </InsightsCard>
      </Wrapper>

      <Wrapper
        {...(withReveal ? getRevealInViewProps({ delay: 0.16, reducedMotion }) : {})}
      >
        <InsightsCard
          title={t.bodyMeasurementsTitle}
          description={t.bodyMeasurementsDesc}
        >
          <AreaChartPanel
            data={localizedMeasurementsData}
            series={[
              { dataKey: "waist", seriesColor: "waist", strokeWidth: 1.7 },
              { dataKey: "hips", seriesColor: "hips", strokeWidth: 1.4 },
              { dataKey: "chest", seriesColor: "chest", strokeWidth: 1.3 },
            ]}
            yDomain={getChartAxisDomainWithOffset(5)}
            labelFormatter={(label) => formatTooltipWeekLabel(label, tooltipLabelPrefix)}
            tooltipFormatter={(value, entry) => {
              const dataKey = entry?.dataKey ?? ""
              const metric =
                dataKey === "waist"
                  ? waistLabel
                  : dataKey === "hips"
                    ? hipsLabel
                    : chestLabel

              return [`${value.toFixed(1)} cm`, metric]
            }}
          />
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