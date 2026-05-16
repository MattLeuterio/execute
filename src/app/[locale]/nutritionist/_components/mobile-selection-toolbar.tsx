'use client'

import { CheckSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileSelectionToolbarProps {
  isSelecting: boolean
  selectedCount: number
  totalCount: number
  selectLabel: string
  selectAllLabel: string
  cancelLabel: string
  onStartSelecting: () => void
  onSelectAll: () => void
  onClearSelection: () => void
}

export function MobileSelectionToolbar({
  isSelecting,
  selectedCount,
  totalCount,
  selectLabel,
  selectAllLabel,
  cancelLabel,
  onStartSelecting,
  onSelectAll,
  onClearSelection,
}: MobileSelectionToolbarProps) {
  if (!isSelecting) {
    return (
      <Button variant="outline" size="sm" onClick={onStartSelecting} className="w-full">
        {selectLabel}
      </Button>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 backdrop-blur-sm">
      <span className="text-sm font-semibold text-emerald-600">
        {selectedCount}/{totalCount}
      </span>

      <div className="flex gap-2">
        {selectedCount < totalCount && (
          <Button variant="ghost" size="sm" onClick={onSelectAll} className="h-8 px-2 text-xs">
            <CheckSquare className="mr-1 h-4 w-4" />
            {selectAllLabel}
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onClearSelection} className="h-8 px-2 text-xs">
          <X className="mr-1 h-4 w-4" />
          {cancelLabel}
        </Button>
      </div>
    </div>
  )
}