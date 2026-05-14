import { getTranslations, type Locale } from '@/lib/i18n'

interface CheckInsPageProps {
  params: Promise<{ locale: string }>
}

export default async function CheckInsPage({ params }: CheckInsPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.nav.checkins}</h1>
    </div>
  )
}
