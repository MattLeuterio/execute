import { PageHeader } from "@/components/common/page-header"
import { getTranslations, type Locale } from "@/lib/i18n"

interface ArchivePageProps {
  params: Promise<{ locale: string }>
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { locale } = await params
  const t = getTranslations("nutritionist", locale as Locale)

  return (
    <div>
      <PageHeader title={t.nav.archive} />
    </div>
  )
}