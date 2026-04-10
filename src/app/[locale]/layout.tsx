import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { defaultLocale, isLocale } from "@/lib/i18n"

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const localizedSeo = {
  it: {
    description:
      "Execute aiuta i team a trasformare i piani strategici in risultati misurabili, con chiarezza operativa e avanzamento continuo.",
  },
  en: {
    description:
      "Execute helps teams turn strategy into measurable outcomes with clear execution workflows and continuous progress visibility.",
  },
} as const

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  const resolvedLocale = isLocale(locale) ? locale : defaultLocale
  const description = localizedSeo[resolvedLocale].description

  return {
    description,
    alternates: {
      canonical: `/${resolvedLocale}`,
      languages: {
        it: "/it",
        en: "/en",
        "x-default": "/it",
      },
    },
    openGraph: {
      title: "Execute",
      description,
      url: `https://executebase.com/${resolvedLocale}`,
      siteName: "Execute",
      type: "website",
      locale: resolvedLocale === "it" ? "it_IT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Execute",
      description,
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <>{children}</>
}
