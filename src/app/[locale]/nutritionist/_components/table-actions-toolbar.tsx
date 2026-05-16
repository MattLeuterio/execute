'use client'

import type { LucideIcon } from 'lucide-react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface DesktopToolbarAction {
  label: string
  icon: LucideIcon
  onClick: () => void | Promise<void>
  disabled?: boolean
  className?: string
}

interface TableActionsToolbarProps {
  searchPlaceholder: string
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCount: number
  selectedLabel: string
  actions: DesktopToolbarAction[]
}

export function TableActionsToolbar({
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  selectedCount,
  selectedLabel,
  actions,
}: TableActionsToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-foreground/60">
          {selectedCount} {selectedLabel}
        </span>

        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              onClick={action.onClick}
              disabled={selectedCount === 0 || action.disabled}
              variant="ghost"
              size="sm"
              className={cn('gap-2', action.className)}
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}