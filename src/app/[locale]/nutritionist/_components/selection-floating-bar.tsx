'use client'

import { Button } from '@/components/ui/button'
import type { NutritionistTranslations } from '@/lib/i18n'
import { X, CheckSquare } from 'lucide-react'

interface SelectionFloatingBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  t: NutritionistTranslations
}

export function SelectionFloatingBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  t,
}: SelectionFloatingBarProps) {
  return (
    <div className="fixed left-4 right-4 z-50 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 backdrop-blur-sm md:bottom-6 md:left-4 md:right-4 bottom-20 lg:bottom-6">
      {/* Contatore */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-emerald-600">
          {selectedCount}/{totalCount}
        </span>
        <span className="text-xs text-foreground/60">
          {selectedCount === 1 ? 'selezionato' : 'selezionati'}
        </span>
      </div>

      {/* Azioni */}
      <div className="flex gap-2">
        {selectedCount < totalCount && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="h-8 px-2 text-xs"
          >
            <CheckSquare className="h-4 w-4 mr-1" />
            Seleziona tutti
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="h-8 px-2 text-xs"
        >
          <X className="h-4 w-4 mr-1" />
          Annulla
        </Button>
      </div>
    </div>
  )
}
