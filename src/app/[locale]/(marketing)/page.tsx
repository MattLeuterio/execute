import { notFound } from "next/navigation"

import { MarketingHomePage } from "@/components/marketing/marketing-home-page"
import { isLocale } from "@/lib/i18n"

type LocalePageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocalizedMarketingPage({ params }: LocalePageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <MarketingHomePage language={locale} />
}
