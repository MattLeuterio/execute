import { notFound } from "next/navigation"

import { LegalMarkdownPage } from "@/components/marketing/legal-markdown-page"
import { isLocale } from "@/lib/i18n"

type PrivacyPageProps = {
  params: Promise<{ locale: string }>
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <LegalMarkdownPage language={locale} fileName="privacy-policy.md" />
}