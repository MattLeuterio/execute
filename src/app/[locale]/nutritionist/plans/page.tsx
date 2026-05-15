'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { PageHeader } from '@/components/common/page-header'
import { getAllPlans, getPlanAssignmentsByPlanId } from '@/lib/data/mock-plans'
import { nutritionistTranslations } from '@/lib/i18n'
import { PlansTableDesktop } from '../_components/plans-table-desktop'
import { PlansTablePagination } from '../_components/plans-table-pagination'
import { PlansMobileList } from '../_components/plans-mobile-list'
import { PlansTableToolbar } from '../_components/plans-table-toolbar'
import {
  deletePlans,
  exportPlansToPdf,
  type PlanTableItem,
} from '../_components/plans-utils'
import { usePlansTable } from '../_components/use-plans-table'

function sortByMostRecent(plans: PlanTableItem[]) {
  return plans.slice().sort((left, right) => right.updatedAt.getTime() - left.updatedAt.getTime())
}

function hydratePlans(): PlanTableItem[] {
  return sortByMostRecent(
    getAllPlans().map((plan) => {
      const assignments = getPlanAssignmentsByPlanId(plan.id).filter(
        (assignment) => assignment.status === 'active' && !assignment.endedAt && !assignment.unassignedAt,
      )

      return {
        ...plan,
        assignedClients: assignments.length,
      }
    }),
  )
}

export default function PlansPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useMemo(
    () => nutritionistTranslations[locale as keyof typeof nutritionistTranslations] || nutritionistTranslations.en,
    [locale],
  )
  const [plans, setPlans] = useState<PlanTableItem[]>(() => hydratePlans())

  const { table, globalFilter, setGlobalFilter, getSelectedRows } = usePlansTable({
    data: plans,
    locale,
    t,
  })

  const selectedPlans = getSelectedRows()

  const handleExportPdf = () => {
    if (selectedPlans.length === 0) return
    exportPlansToPdf(selectedPlans, locale, t)
    toast.success(t.plans.feedback.exportSuccess.replace('{count}', String(selectedPlans.length)))
  }

  const handleDelete = async () => {
    if (selectedPlans.length === 0) return

    const selectedIds = selectedPlans.map((plan) => plan.id)
    await deletePlans(selectedIds)

    setPlans((currentPlans) => currentPlans.filter((plan) => !selectedIds.includes(plan.id)))

    table.toggleAllRowsSelected(false)
    toast.success(t.plans.feedback.deleteSuccess.replace('{count}', String(selectedIds.length)))
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t.plans.header} description={t.plans.subtitle} />

      {plans.length > 0 && (
        <PlansTableToolbar
          selectedPlans={selectedPlans}
          searchTerm={globalFilter}
          onSearchChange={setGlobalFilter}
          onExportPdf={handleExportPdf}
          onDelete={handleDelete}
          t={t}
        />
      )}

      {plans.length === 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/50 p-6 text-sm text-muted-foreground">
          {t.plans.detail.emptyStates.noPlans}
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <PlansTableDesktop table={table} locale={locale} t={t} />
            <PlansTablePagination table={table} t={t} />
          </div>

          <div className="lg:hidden">
            <PlansMobileList table={table} locale={locale} t={t} />
          </div>
        </>
      )}
    </div>
  )
}