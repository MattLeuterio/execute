"use client"

import { InsightsGrid } from "@/components/insights/insights-grid"
import { LandingSection } from "@/components/marketing/landing-section"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

type InsightsPreviewSectionProps = {
  language: Language
}

export function InsightsPreviewSection({ language }: InsightsPreviewSectionProps) {
  const t = translations[language]

  return (
    <LandingSection
      id="insights"
      eyebrow={t.insightsLabel}
      title={t.insightsTitle}
      description={t.insightsDesc}
    >
      <InsightsGrid language={language} withReveal />
    </LandingSection>
  )
}
