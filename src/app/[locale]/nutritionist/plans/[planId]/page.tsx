import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, CalendarClock } from 'lucide-react'

import { BackButton } from '@/components/ui/back-button'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlanTagEditorPopoverList } from '@/components/common/plan-tag-editor-popover'
import { ClientDetailSection } from '../../_components/client-detail-section'
import { PlanDocumentView } from '../../_components/plan-document-view'
import { getClientDetailById } from '@/lib/data/mock-clients'
import { getPlanAssignmentsByPlanId, getPlanById } from '@/lib/data/mock-plans'
import { getTranslations, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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

  const assignments = getPlanAssignmentsByPlanId(plan.id).filter(
    (assignment) => assignment.status === 'active' && !assignment.endedAt && !assignment.unassignedAt,
  )

  const assignedClients = assignments
    .map((assignment) => ({
      assignment,
      client: getClientDetailById(assignment.clientId),
    }))
    .filter((entry) => entry.client !== undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <BackButton
            locale={locale}
            href={`/${locale}/nutritionist/plans`}
            suffix={t.plans.actions.backTarget}
          />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{plan.name}</h1>
            <p className="max-w-3xl text-sm text-foreground/60">{plan.description ?? plan.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {plan.status}
          </Badge>
        </div>
      </div>

      <ClientDetailSection
        title={t.plans.detail.sections.overview}
        description={t.plans.detail.headerDescription}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-background/60">
            <CardHeader className="pb-3">
              <CardDescription>{t.plans.detail.fields.status}</CardDescription>
              <CardTitle className="text-base capitalize">{plan.status}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/60 bg-background/60">
            <CardHeader className="pb-3">
              <CardDescription>{t.plans.detail.fields.version}</CardDescription>
              <CardTitle className="text-base">v{plan.version}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/60 bg-background/60">
            <CardHeader className="pb-3">
              <CardDescription>{t.plans.detail.fields.updatedAt}</CardDescription>
              <CardTitle className="text-base">{plan.updatedAt.toLocaleDateString(locale)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <PlanTagEditorPopoverList
          tags={plan.tags}
          emptyLabel={t.plans.tags.emptyState}
          labels={{
            title: t.plans.tags.header,
            description: t.plans.tags.hint,
            name: t.plans.tags.fields.name,
            color: t.plans.tags.fields.color,
            colors: t.plans.tags.colors,
            save: t.plans.tags.actions.save,
            cancel: t.plans.tags.actions.cancel,
            saved: t.plans.tags.help,
          }}
          className="mt-4"
        />
      </ClientDetailSection>

      <ClientDetailSection
        title={t.plans.detail.sections.assignments}
        description={t.plans.detail.fields.assignedClients}
      >
        {assignedClients.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.plans.detail.emptyStates.noAssignments}</p>
        ) : (
          <div className="space-y-3">
            {assignedClients.map(({ assignment, client }) => (
              <div
                key={assignment.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/50 p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{client?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {client?.email ?? client?.phone ?? client?.id}
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  {t.plans.detail.fields.startDate}: {assignment.startedAt?.toLocaleDateString(locale) ?? assignment.assignedAt.toLocaleDateString(locale)}
                </p>
              </div>
            ))}
          </div>
        )}
      </ClientDetailSection>

      <ClientDetailSection
        title={t.plans.detail.sections.document}
        description={plan.summary ?? plan.contentText ?? t.plans.detail.emptyStates.noContent}
      >
        {plan.contentJson.content.length > 0 ? (
          <PlanDocumentView content={plan.contentJson} className="rounded-lg border border-border/50 p-4" />
        ) : (
          <p className="text-sm text-muted-foreground">{t.plans.detail.emptyStates.noContent}</p>
        )}
      </ClientDetailSection>
    </div>
  )
}