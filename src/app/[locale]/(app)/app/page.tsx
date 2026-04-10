import { redirect } from "next/navigation"

import { isLocale } from "@/lib/i18n"

type LocaleAppRootPageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocaleAppRootPage({ params }: LocaleAppRootPageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    redirect("/it")
  }

  redirect(`/${locale}/app/today`)
}
