import { getTranslations, type Locale } from '@/lib/i18n'

interface SettingsPageProps {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.nav.settings}</h1>
    </div>
  )
}
