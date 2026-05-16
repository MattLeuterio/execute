'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Download, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmationDialog } from '@/components/common/confirmation-dialog'
import { PageHeader } from '@/components/common/page-header'
import { getAllPlans, getPlanAssignmentsByPlanId } from '@/lib/data/mock-plans'
import { nutritionistTranslations } from '@/lib/i18n'
import { PlansTableDesktop } from '../_components/plans-table-desktop'
import { PlansTablePagination } from '../_components/plans-table-pagination'
import { PlansMobileList } from '../_components/plans-mobile-list'
import {
  TableActionsToolbar,
} from '../_components/table-actions-toolbar'
import {
  deletePlans,
  exportPlansToPdf,
  type PlanTableItem,
} from '../_components/plans-utils'
import { usePlansTable } from '../_components/use-plans-table'
import { useTableToolbarActions } from '../_components/use-table-toolbar-actions'

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
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleConfirmDelete = async () => {
    setIsDeleting(true)
    try {
      await handleDelete()
      setConfirmDeleteOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  const { actions } = useTableToolbarActions({
    selectedCount: selectedPlans.length,
    actionDefinitions: [
      {
        id: 'export-pdf',
        label: t.plans.actions.exportPdf,
        icon: Download,
        onClick: handleExportPdf,
      },
      {
        id: 'delete',
        label: t.plans.actions.delete,
        icon: Trash2,
        onClick: () => setConfirmDeleteOpen(true),
        className: 'text-red-600/70 hover:bg-red-500/10 hover:text-red-600',
        disabled: isDeleting,
      },
    ],
  })

  return (
    <>
      <div className="space-y-6">
        <PageHeader title={t.plans.header} description={t.plans.subtitle} />

        {plans.length > 0 && (
          <TableActionsToolbar
            searchPlaceholder={t.plans.search.placeholder}
            searchTerm={globalFilter}
            onSearchChange={setGlobalFilter}
            selectedCount={selectedPlans.length}
            selectedLabel={t.plans.search.selected}
            actions={actions}
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

      <ConfirmationDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title={t.plans.confirmations.deleteTitle}
        description={t.plans.confirmations.deleteDescription.replace('{count}', String(selectedPlans.length))}
        cancelLabel={t.plans.confirmations.cancel}
        confirmLabel={t.plans.confirmations.deleteConfirm}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        destructive
      />
    </>
  )
}