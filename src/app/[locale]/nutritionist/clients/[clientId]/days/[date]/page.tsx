"use client"

import { notFound, useParams, useRouter } from "next/navigation"
import { ArrowLeft, Check, Flame, MessageSquare, Ruler, Scale } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getMockAdherenceDayDetailByClientId } from "@/lib/data/mock-adherence-overview"
import { formatTimeAgo } from "@/lib/date-utils"
import { getTranslations, type Locale } from "@/lib/i18n"
import { ClientDetailSection } from "../../../../_components/client-detail-section"

function parseDateParam(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null
  }

  return date
}

function formatDayLabel(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}

export default function ClientDayDetailPage() {
  const { locale, clientId, date: dateParam } = useParams<{ locale: string; clientId: string; date: string }>()
  const router = useRouter()
  const detailCopy = getTranslations("nutritionist", locale as Locale).clients.detail.dayDetail

  const parsedDate = parseDateParam(dateParam)
  if (!parsedDate) {
    notFound()
  }

  const detail = getMockAdherenceDayDetailByClientId(clientId, parsedDate)

  const getStateLabel = (state: "completed" | "partial" | "not_started" | "not_tracked") => {
    if (state === "completed") return detailCopy.stateValues.completed
    if (state === "partial") return detailCopy.stateValues.partial
    if (state === "not_started") return detailCopy.stateValues.notStarted
    return detailCopy.stateValues.notTracked
  }

  const getEventTypeLabel = (type: "adherence" | "weight_check" | "measurement_check" | "comment") => {
    if (type === "adherence") return detailCopy.eventTypes.adherence
    if (type === "weight_check") return detailCopy.eventTypes.weightCheck
    if (type === "measurement_check") return detailCopy.eventTypes.measurementCheck
    return detailCopy.eventTypes.comment
  }

  return (
    <div className="space-y-6">
      <ClientDetailSection
        title={`${detailCopy.title} • ${formatDayLabel(detail.date, locale)}`}
        description={detailCopy.description}
        actions={
          <Button size="sm" variant="outline" onClick={() => router.push(`/${locale}/nutritionist/clients/${clientId}`)}>
            <ArrowLeft className="size-4" />
            {detailCopy.backToClient}
          </Button>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {detailCopy.eventTypes.adherence}: {detail.adherencePercentage === null ? detailCopy.notAvailable : `${detail.adherencePercentage}%`}
          </Badge>
          <Badge variant="outline">
            {detailCopy.state}: {getStateLabel(detail.dayState)}
          </Badge>
          <Badge variant="outline">
            {detailCopy.planned}: {detail.plannedItems}
          </Badge>
          <Badge variant="outline">
            {detailCopy.completed}: {detail.completedItems}
          </Badge>

          {detail.dayState === "completed" ? <Flame className="size-4 text-orange-500" /> : null}
          {detail.completedItems > 0 ? <Check className="size-4 text-emerald-600" /> : null}
          {detail.hasComment ? <MessageSquare className="size-4 text-muted-foreground" /> : null}
          {detail.hasWeightCheck ? <Scale className="size-4 text-muted-foreground" /> : null}
          {detail.hasMeasurementCheck ? <Ruler className="size-4 text-muted-foreground" /> : null}
        </div>
      </ClientDetailSection>

      <ClientDetailSection title={detailCopy.planSection}>
        <div className="rounded-lg border border-border/50 p-3 text-sm text-foreground">
          <p>
            {detailCopy.planned}: <span className="font-semibold">{detail.plannedItems}</span>
          </p>
          <p>
            {detailCopy.completed}: <span className="font-semibold">{detail.completedItems}</span>
          </p>
          <p>
            {detailCopy.eventTypes.adherence}: <span className="font-semibold">{detail.adherencePercentage === null ? detailCopy.notAvailable : `${detail.adherencePercentage}%`}</span>
          </p>
        </div>
      </ClientDetailSection>

      <ClientDetailSection title={detailCopy.eventsSection}>
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            {detailCopy.weight}: <span className="font-semibold">{detail.weightValue ?? detailCopy.notAvailable}</span>
          </p>
          <p className="text-sm text-foreground">
            {detailCopy.measurements}: <span className="font-semibold">{detail.measurementTypes.length || detailCopy.notAvailable}</span>
          </p>
          <p className="text-sm text-foreground">
            {detailCopy.comments}: <span className="font-semibold">{detail.notes.length || detailCopy.notAvailable}</span>
          </p>
        </div>
      </ClientDetailSection>

      <ClientDetailSection title={detailCopy.timelineSection}>
        {detail.timeline.length === 0 ? (
          <p className="text-sm text-muted-foreground">{detailCopy.noEvents}</p>
        ) : (
          <div className="space-y-2">
            {detail.timeline.map((event) => (
              <div key={event.id} className="rounded-lg border border-border/50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="outline" className="capitalize">
                    {getEventTypeLabel(event.type)}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{formatTimeAgo(event.at, "string")}</p>
                </div>
                <p className="mt-2 text-sm text-foreground">{event.label}</p>
              </div>
            ))}
          </div>
        )}
      </ClientDetailSection>
    </div>
  )
}
