'use client'

import type { ReactNode } from 'react'
import { MoreVertical } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: ReactNode
  description?: ReactNode
  actions?: React.ReactNode
  mobileActions?: React.ReactNode
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsLabel?: string
}

export function PageHeader({
  title,
  description,
  actions,
  mobileActions,
  className,
  titleClassName,
  descriptionClassName,
  actionsLabel = 'Page actions',
}: PageHeaderProps) {
  const resolvedMobileActions = mobileActions ?? actions

  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
      <div className="space-y-1">
        {typeof title === 'string' ? (
          <h1 className={cn('text-3xl font-bold tracking-tight text-foreground', titleClassName)}>{title}</h1>
        ) : (
          <div className={cn('text-3xl font-bold tracking-tight text-foreground', titleClassName)}>{title}</div>
        )}
        {description ? (
          typeof description === 'string' ? (
            <p className={cn('max-w-3xl text-sm text-foreground/60', descriptionClassName)}>{description}</p>
          ) : (
            <div className={cn('max-w-3xl text-sm text-foreground/60', descriptionClassName)}>{description}</div>
          )
        ) : null}
      </div>

      {actions ? <div className="hidden flex-wrap items-center gap-2 md:flex">{actions}</div> : null}

      {resolvedMobileActions ? (
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={actionsLabel}
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 min-w-56">
              {resolvedMobileActions}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </div>
  )
}