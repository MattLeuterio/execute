"use client"

import { InsightsGrid } from "@/components/insights/insights-grid"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

type ProgressInsightsSectionProps = {
  language: Language
}

export function ProgressInsightsSection({ language }: ProgressInsightsSectionProps) {
  const t = translations[language]

  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">{t.insightsTitle}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{t.insightsDesc}</p>
      </header>
      <InsightsGrid language={language} />
    </section>
  )
}