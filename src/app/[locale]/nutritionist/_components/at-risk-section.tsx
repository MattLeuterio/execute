"use client"

import Link from "next/link"
import { ClientSummary } from "@/lib/types"
import { AtRiskClientItem } from "./at-risk-client-item"

interface AtRiskSectionProps {
  clients: ClientSummary[]
  locale: string
  t: any
}

export function AtRiskSection({ clients, locale, t }: AtRiskSectionProps) {
  const getSubtitle = () => {
    if (locale === "it") {
      return clients.length === 1
        ? "1 cliente ha bisogno di attenzione"
        : `${clients.length} clienti hanno bisogno di attenzione`
    }
    return clients.length === 1
      ? "1 client needs attention"
      : `${clients.length} clients need attention`
  }

  if (clients.length === 0) {
    return (
      <section className="rounded-lg border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">{t.dashboard.sections.atRisk}</h2>
        <div className="text-center py-12">
          <p className="text-sm text-foreground/50">{t.dashboard.emptyStates.allOnTrack}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{t.dashboard.sections.atRisk}</h2>
          <p className="mt-1 text-xs text-foreground/50">{getSubtitle()}</p>
        </div>
        <Link
          href={`/${locale}/nutritionist/clients?filter=at-risk&sortBy=adherence&sort=asc`}
          className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          {t.dashboard.cta.viewAll}
        </Link>
      </div>

      <div className="space-y-3">
        {clients.map((client) => (
          <AtRiskClientItem
            key={client.id}
            id={client.id}
            name={client.name}
            adherencePercentage={client.adherencePercentage}
            status={client.status}
            lastActivityDate={client.lastActivityDate}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </section>
  )
}
