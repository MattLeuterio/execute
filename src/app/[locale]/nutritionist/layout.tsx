import { ReactNode } from "react"
import { AppShell } from "./_components/app-shell"
import { getTranslations, type Locale } from "@/lib/i18n"

interface NutritionistLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function NutritionistLayout({ children, params }: NutritionistLayoutProps) {
  const { locale } = await params
  const t = getTranslations("nutritionist", locale as Locale)

  return <AppShell locale={locale} t={t}>{children}</AppShell>
}
