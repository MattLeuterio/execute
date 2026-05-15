import { getTranslations, type Locale } from '@/lib/i18n'
import { PageHeader } from '@/components/common/page-header'

interface CheckInsPageProps {
  params: Promise<{ locale: string }>
}

export default async function CheckInsPage({ params }: CheckInsPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  return (
    <div>
      <PageHeader title={t.nav.checkins} />
    </div>
  )
}
