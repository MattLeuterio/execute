import Link from 'next/link'
import { ArrowUpRight, CalendarClock, FileText, Tags } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PlanTagList } from '@/components/common/plan-tag-list'
import { getAllPlans, getPlanAssignmentsByPlanId } from '@/lib/data/mock-plans'
import { getTranslations, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { PlanDocumentView } from '../_components/plan-document-view'

interface PlansPageProps {
  params: Promise<{ locale: string }>
}

export default async function PlansPage({ params }: PlansPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)

  const plans = getAllPlans().slice().sort((left, right) => right.updatedAt.getTime() - left.updatedAt.getTime())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t.plans.header}</h1>
        <p className="mt-2 text-sm text-foreground/60">{t.plans.subtitle}</p>
      </div>

      {plans.length === 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/50 p-6 text-sm text-muted-foreground">
          {t.plans.detail.emptyStates.noPlans}
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {plans.map((plan) => {
            const assignments = getPlanAssignmentsByPlanId(plan.id).filter(
              (assignment) => assignment.status === 'active' && !assignment.endedAt && !assignment.unassignedAt,
            )
            const clientLabel = assignments.length === 1 ? t.plans.table.client : t.plans.table.clients

            return (
              <Card key={plan.id} className="border-border/60 bg-background/70">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base font-semibold tracking-tight text-foreground">
                        {plan.name}
                      </CardTitle>
                      <CardDescription>{plan.description ?? plan.summary}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {plan.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1">
                      <CalendarClock className="size-3.5" />
                      {t.plans.table.updatedAt}: {plan.updatedAt.toLocaleDateString(locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1">
                      <FileText className="size-3.5" />
                      {assignments.length} {clientLabel.toLowerCase()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Tags className="size-3.5" />
                      {t.plans.tags.header}
                    </p>
                    <PlanTagList tags={plan.tags} emptyLabel={t.plans.tags.emptyState} />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.contentJson.content.length > 0 ? (
                    <PlanDocumentView
                      content={plan.contentJson}
                      options={{ preview: true, maxNodes: 5, maxListItems: 3 }}
                      className="rounded-lg border border-border/50 bg-background/60 p-4"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.plans.detail.emptyStates.noContent}</p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-muted-foreground">
                      {t.plans.detail.fields.assignedClients}: {assignments.length}
                    </p>
                    <Link
                      href={`/${locale}/nutritionist/plans/${plan.id}`}
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    >
                      {t.plans.actions.openDetails}
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}