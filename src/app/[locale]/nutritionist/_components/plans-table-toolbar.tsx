'use client'

import { useState } from 'react'
import { Download, Search, Trash2 } from 'lucide-react'
import type { NutritionistTranslations } from '@/lib/i18n'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/components/common/confirmation-dialog'
import type { PlanTableItem } from './plans-utils'

interface PlansTableToolbarProps {
  selectedPlans: PlanTableItem[]
  searchTerm: string
  onSearchChange: (term: string) => void
  onExportPdf: () => void
  onDelete: () => Promise<void>
  t: NutritionistTranslations
}

export function PlansTableToolbar({
  selectedPlans,
  searchTerm,
  onSearchChange,
  onExportPdf,
  onDelete,
  t,
}: PlansTableToolbarProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedCount = selectedPlans.length

  const handleConfirmDelete = async () => {
    setIsSubmitting(true)
    try {
      await onDelete()
      setConfirmDeleteOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40 pointer-events-none" />
          <Input
            placeholder={t.plans.search.placeholder}
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-10"
          />
        </div>

        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-foreground/60">
              {selectedCount} {t.plans.search.selected}
            </span>

            <Button onClick={onExportPdf} variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t.plans.actions.exportPdf}
            </Button>

            <Button
              onClick={() => setConfirmDeleteOpen(true)}
              variant="ghost"
              size="sm"
              className="gap-2 text-red-600/70 hover:text-red-600 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
              {t.plans.actions.delete}
            </Button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title={t.plans.confirmations.deleteTitle}
        description={t.plans.confirmations.deleteDescription.replace('{count}', String(selectedCount))}
        cancelLabel={t.plans.confirmations.cancel}
        confirmLabel={t.plans.confirmations.deleteConfirm}
        onConfirm={handleConfirmDelete}
        loading={isSubmitting}
        destructive
      />
    </>
  )
}
