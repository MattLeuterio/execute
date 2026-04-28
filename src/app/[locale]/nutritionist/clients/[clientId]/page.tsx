"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { CalendarClock, ClipboardList, FileText, PencilLine, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AdherenceChart,
  MeasurementsChart,
  type MeasurementsChartPoint,
  WeightChart,
} from "../../_components/client-detail-charts"
import { ClientDetailSection } from "../../_components/client-detail-section"
import { getStatusColors } from "@/lib/colors"
import { getAdherenceByClientId } from "@/lib/data/mock-adherence"
import {
  getCheckInsByClientId,
  getWeightHistoryByClientId,
  MOCK_MEASUREMENT_ENTRIES,
} from "@/lib/data/mock-checkins"
import { MEASUREMENT_DEFINITIONS } from "@/lib/measurements"
import { getClientDetailById } from "@/lib/data/mock-clients"
import { getNotesByClientId } from "@/lib/data/mock-notes"
import { getPlanByClientId } from "@/lib/data/mock-plans"
import { filterDataByMonthsRange, formatTimeAgo } from "@/lib/date-utils"
import { getTranslations, type Locale } from "@/lib/i18n"
import { ClientStatus, type MeasurementType } from "@/lib/types"
import { cn } from "@/lib/utils"

// All active (non-legacy) measurement types
const ACTIVE_MEASUREMENT_TYPES = new Set(
  MEASUREMENT_DEFINITIONS.filter((d) => !d.legacy).map((d) => d.key)
)

const STATUS_KEY_MAP: Record<ClientStatus, "onTrack" | "warning" | "atRisk" | "inactive"> = {
  [ClientStatus.OnTrack]: "onTrack",
  [ClientStatus.Warning]: "warning",
  [ClientStatus.AtRisk]: "atRisk",
  [ClientStatus.Inactive]: "inactive",
}

function formatChartLabel(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
  }).format(date)
}

function isMeasurementChartKey(type: MeasurementType): boolean {
  return ACTIVE_MEASUREMENT_TYPES.has(type)
}

function getLocalizedNoteType(
  type: "observation" | "feedback" | "intervention" | "general",
  copy: ReturnType<typeof getTranslations<"nutritionist">>["clients"]["detail"]["noteTypes"]
) {
  return copy[type]
}

export default function ClientDetailPage() {
  const { locale, clientId } = useParams<{ locale: string; clientId: string }>()
  const [rangeByChart, setRangeByChart] = useState({
    adherence: 3,
    weight: 3,
    measurements: 3,
  })

  const t = getTranslations("nutritionist", locale as Locale)
  const detailCopy = t.clients.detail

  const client = getClientDetailById(clientId)
  if (!client) {
    notFound()
  }

  const statusColors = getStatusColors(client.status, "object")
  
  // Prepare full adherence data
  const fullAdherenceData = getAdherenceByClientId(clientId, 21)
    .slice()
    .reverse()
    .map((entry) => ({
      label: formatChartLabel(entry.date, locale),
      adherence: entry.adherencePercentage,
      rawDate: entry.date,
    }))

  // Prepare full weight data
  const fullWeightData = getWeightHistoryByClientId(clientId).map((entry) => ({
    label: formatChartLabel(entry.recordedAt, locale),
    weight: entry.value,
    rawDate: entry.recordedAt,
  }))

  const measurementEntries = MOCK_MEASUREMENT_ENTRIES
    .filter((entry) => entry.clientId === clientId && isMeasurementChartKey(entry.type))
    .sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime())

  const measurementsByDate = new Map<string, MeasurementsChartPoint & { sortValue: number }>()

  for (const entry of measurementEntries) {
    if (!isMeasurementChartKey(entry.type)) continue

    const key = entry.recordedAt.toISOString().slice(0, 10)
    const existing = measurementsByDate.get(key)

    if (!existing) {
      measurementsByDate.set(key, {
        label: formatChartLabel(entry.recordedAt, locale),
        sortValue: entry.recordedAt.getTime(),
        rawDate: entry.recordedAt,
        [entry.type]: entry.value,
      })
    } else {
      (existing as unknown as Record<string, number>)[entry.type] = entry.value
    }
  }

  const fullMeasurementsData: MeasurementsChartPoint[] = Array.from(measurementsByDate.values())
    .sort((a, b) => a.sortValue - b.sortValue)
    .map(({ sortValue: _unused, ...point }) => {
      void _unused
      return point
    })

  // Filter data based on selected range per chart
  const adherenceData = filterDataByMonthsRange(fullAdherenceData, rangeByChart.adherence, (p) => p.rawDate)
  const weightData = filterDataByMonthsRange(fullWeightData, rangeByChart.weight, (p) => p.rawDate)
  const measurementsData = filterDataByMonthsRange(fullMeasurementsData, rangeByChart.measurements, (p) => p.rawDate)

  const recentCheckIns = getCheckInsByClientId(clientId).slice(0, 5)
  const notes = getNotesByClientId(clientId).slice(0, 5)
  const currentPlan = getPlanByClientId(clientId)

  return (
    <div className="space-y-6">
      <ClientDetailSection
        title={client.name}
        description={detailCopy.headerDescription}
        actions={
          <>
            <Button size="sm" variant="outline" type="button">
              <PencilLine className="size-4" />
              {detailCopy.actions.editPlan}
            </Button>
            <Button size="sm" type="button">
              <Plus className="size-4" />
              {detailCopy.actions.addCheckin}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{detailCopy.fields.status}</p>
            <Badge
              variant="outline"
              className={cn("w-fit border-transparent capitalize", statusColors.bg, statusColors.text)}
            >
              {t.status[STATUS_KEY_MAP[client.status]]}
            </Badge>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{detailCopy.fields.adherence}</p>
            <p className="text-2xl font-semibold text-foreground">{client.weeklyAdherence}%</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{detailCopy.fields.lastCheckin}</p>
            <p className="text-sm font-medium text-foreground" suppressHydrationWarning>
              {client.lastCheckInDate ? formatTimeAgo(client.lastCheckInDate, "string", t, locale) : detailCopy.emptyStates.noCheckinsYet}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{detailCopy.fields.interventionSignal}</p>
            <p className="text-sm font-medium text-foreground">
              {client.status === ClientStatus.AtRisk
                ? detailCopy.interventions.high
                : client.status === ClientStatus.Warning
                  ? detailCopy.interventions.monitorClosely
                  : detailCopy.interventions.noUrgentAction}
            </p>
          </div>
        </div>
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.adherenceChart}
        description={detailCopy.sections.adherenceChartDescription}
        className="overflow-visible border border-border/60 bg-background/60"
        actions={
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={rangeByChart.adherence === 3 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, adherence: 3 }))}
            >
              3 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.adherence === 6 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, adherence: 6 }))}
            >
              6 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.adherence === 12 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, adherence: 12 }))}
            >
              1 anno
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.adherence === -1 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, adherence: -1 }))}
            >
              Tutto
            </Button>
          </div>
        }
      >
        <AdherenceChart data={adherenceData} labels={detailCopy.charts} />
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.weight}
        description={detailCopy.sections.weightDescription}
        className="overflow-visible border border-border/60 bg-background/60"
        actions={
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={rangeByChart.weight === 3 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, weight: 3 }))}
            >
              3 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.weight === 6 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, weight: 6 }))}
            >
              6 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.weight === 12 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, weight: 12 }))}
            >
              1 anno
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.weight === -1 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, weight: -1 }))}
            >
              Tutto
            </Button>
          </div>
        }
      >
        <WeightChart data={weightData} labels={detailCopy.charts} />
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.measurements}
        description={detailCopy.sections.measurementsDescription}
        className="overflow-visible border border-border/60 bg-background/60"
        actions={
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={rangeByChart.measurements === 3 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, measurements: 3 }))}
            >
              3 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.measurements === 6 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, measurements: 6 }))}
            >
              6 mesi
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.measurements === 12 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, measurements: 12 }))}
            >
              1 anno
            </Button>
            <Button
              size="sm"
              variant={rangeByChart.measurements === -1 ? "default" : "outline"}
              onClick={() => setRangeByChart((prev) => ({ ...prev, measurements: -1 }))}
            >
              Tutto
            </Button>
          </div>
        }
      >
        <MeasurementsChart data={measurementsData} labels={detailCopy.charts} />
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.recentCheckins}
        description={detailCopy.sections.recentCheckinsDescription}
        actions={
          <Button size="sm" variant="outline" type="button">
            <CalendarClock className="size-4" />
            {detailCopy.actions.viewAll}
          </Button>
        }
      >
        {recentCheckIns.length === 0 ? (
          <p className="text-sm text-muted-foreground">{detailCopy.emptyStates.noCheckins}</p>
        ) : (
          <div className="space-y-3">
            {recentCheckIns.map((checkIn) => (
              <div key={checkIn.id} className="rounded-lg border border-border/50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground" suppressHydrationWarning>
                    {formatTimeAgo(checkIn.completedAt, "string", t, locale)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {checkIn.data.weight ? `${checkIn.data.weight.value.toFixed(1)} ${checkIn.data.weight.unit}` : detailCopy.emptyStates.noWeight}
                  </p>
                </div>
                {checkIn.professionalNotes ? (
                  <p className="mt-2 text-sm text-muted-foreground">{checkIn.professionalNotes}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.notes}
        description={detailCopy.sections.notesDescription}
        actions={
          <Button size="sm" variant="outline" type="button">
            <FileText className="size-4" />
            {detailCopy.actions.addNote}
          </Button>
        }
      >
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">{detailCopy.emptyStates.noNotes}</p>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded-lg border border-border/50 p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <Badge variant="outline" className="capitalize">
                    {getLocalizedNoteType(note.type, detailCopy.noteTypes)}
                  </Badge>
                  <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                    {formatTimeAgo(note.createdAt, "string", t, locale)}
                  </p>
                </div>
                <p className="text-sm text-foreground">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </ClientDetailSection>

      <ClientDetailSection
        title={detailCopy.sections.currentPlan}
        description={detailCopy.sections.currentPlanDescription}
        actions={
          <Button size="sm" variant="outline" type="button">
            <ClipboardList className="size-4" />
            {detailCopy.actions.openPlanDetails}
          </Button>
        }
      >
        {!currentPlan ? (
          <p className="text-sm text-muted-foreground">{detailCopy.emptyStates.noPlan}</p>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-border/50 p-3">
              <p className="text-sm font-semibold text-foreground">{currentPlan.name}</p>
              {currentPlan.description ? (
                <p className="mt-1 text-sm text-muted-foreground">{currentPlan.description}</p>
              ) : null}
              <p className="mt-2 text-xs text-muted-foreground" suppressHydrationWarning>
                {detailCopy.fields.startDate}: {formatTimeAgo(currentPlan.startDate, "string", t, locale)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {currentPlan.weeklySchedule.days.map((day) => (
                <div key={day.dayOfWeek} className="rounded-lg border border-border/50 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{detailCopy.days[day.dayOfWeek]}</p>
                  <ul className="space-y-2">
                    {day.items.map((item) => (
                      <li key={item.id} className="text-sm text-foreground">
                        <span className="font-medium">{item.name}</span>
                        {item.description ? (
                          <span className="text-muted-foreground">: {item.description}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </ClientDetailSection>
    </div>
  )
}
