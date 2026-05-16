import { notFound } from 'next/navigation'

import { BackButton } from '@/components/ui/back-button'
import { getPlanById } from '@/lib/data/mock-plans'
import { getTranslations, type Locale } from '@/lib/i18n'
import { PlanDetailClient } from './plan-detail-client'

interface PlanDetailPageProps {
  params: Promise<{ locale: string; planId: string }>
}

export default async function PlanDetailPage({ params }: PlanDetailPageProps) {
  const { locale, planId } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  const plan = getPlanById(planId)
  if (!plan) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <BackButton locale={locale} href={`/${locale}/nutritionist/plans`} suffix={t.plans.actions.backTarget} />
      <PlanDetailClient locale={locale} planId={planId} />
    </div>
  )
}