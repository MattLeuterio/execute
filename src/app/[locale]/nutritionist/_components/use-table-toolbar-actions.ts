'use client'

import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { DesktopToolbarAction } from './table-actions-toolbar'

export interface ToolbarActionDefinition {
  id: string
  label: string
  icon: LucideIcon
  onClick: () => void | Promise<void>
  className?: string
  disabled?: boolean
}

interface UseTableToolbarActionsOptions {
  selectedCount: number
  actionDefinitions: ToolbarActionDefinition[]
}

interface UseTableToolbarActionsReturn {
  actions: DesktopToolbarAction[]
  pendingActionId: string | null
  isActionPending: (actionId: string) => boolean
}

export function useTableToolbarActions({
  selectedCount,
  actionDefinitions,
}: UseTableToolbarActionsOptions): UseTableToolbarActionsReturn {
  const [pendingActionId, setPendingActionId] = useState<string | null>(null)

  const actions = useMemo<DesktopToolbarAction[]>(
    () =>
      actionDefinitions.map((definition) => ({
        label: definition.label,
        icon: definition.icon,
        className: definition.className,
        disabled:
          selectedCount === 0 ||
          Boolean(definition.disabled) ||
          pendingActionId === definition.id,
        onClick: async () => {
          if (selectedCount === 0 || definition.disabled || pendingActionId === definition.id) return

          setPendingActionId(definition.id)
          try {
            await definition.onClick()
          } finally {
            setPendingActionId((current) => (current === definition.id ? null : current))
          }
        },
      })),
    [actionDefinitions, pendingActionId, selectedCount],
  )

  return {
    actions,
    pendingActionId,
    isActionPending: (actionId: string) => pendingActionId === actionId,
  }
}