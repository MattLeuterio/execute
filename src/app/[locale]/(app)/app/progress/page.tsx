import { notFound } from "next/navigation"

import { ProgressInsightsSection } from "@/components/private/progress-insights-section"
import { isLocale } from "@/lib/i18n"

type LocaleProgressPageProps = {
  params: Promise<{ locale: string }>
}

export default async function ProgressPage({ params }: LocaleProgressPageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <ProgressInsightsSection language={locale} />
}
