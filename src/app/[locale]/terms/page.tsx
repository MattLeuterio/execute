import { notFound } from "next/navigation"

import { LegalMarkdownPage } from "@/components/marketing/legal-markdown-page"
import { isLocale } from "@/lib/i18n"

type TermsPageProps = {
  params: Promise<{ locale: string }>
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <LegalMarkdownPage language={locale} fileName="terms-and-conditions.md" />
}