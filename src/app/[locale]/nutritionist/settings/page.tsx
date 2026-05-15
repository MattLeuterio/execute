import { getTranslations, type Locale } from '@/lib/i18n'
import { PageHeader } from '@/components/common/page-header'

interface SettingsPageProps {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  return (
    <div>
      <PageHeader title={t.nav.settings} />
    </div>
  )
}
