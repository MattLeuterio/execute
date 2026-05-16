'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Table } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { SelectionFloatingBar } from './selection-floating-bar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CalendarClock, FileText, Tags } from 'lucide-react'
import { TagItem } from '@/components/common/tag-item'
import type { PlanTableItem } from './plans-utils'

interface PlansMobileListProps {
  table: Table<PlanTableItem>
  locale: string
  t: NutritionistTranslations
}

export function PlansMobileList({ table, locale, t }: PlansMobileListProps) {
  const [isSelecting, setIsSelecting] = useState(false)
  const rows = table.getRowModel().rows
  const selectedCount = Object.values(table.getState().rowSelection).filter(Boolean).length

  const handleToggleSelect = (rowId: string) => {
    const rowIndex = rows.findIndex((row) => row.id === rowId)
    if (rowIndex !== -1) {
      rows[rowIndex].toggleSelected()
    }
  }

  const handleSelectAll = () => {
    table.toggleAllRowsSelected(true)
  }

  const handleClearSelection = () => {
    table.toggleAllRowsSelected(false)
    setIsSelecting(false)
  }

  return (
    <div className="relative space-y-3">
      {!isSelecting && (
        <Button variant="outline" size="sm" onClick={() => setIsSelecting(true)} className="w-full">
          {t.plans.actions.select}
        </Button>
      )}

      {rows.length === 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/50 p-8 text-center backdrop-blur-sm">
          <p className="text-sm text-foreground/50">{t.plans.detail.emptyStates.noPlans}</p>
        </div>
      ) : (
        rows.map((row) => {
          const plan = row.original
          const isSelected = row.getIsSelected()
          const clientLabel = plan.assignedClients === 1 ? t.plans.table.client : t.plans.table.clients

          const card = (
            <Card className={isSelecting
              ? (isSelected ? 'border-emerald-500 border-2 bg-background/60' : 'border-border/50 bg-background/50')
              : 'border-border/50 bg-background/50 backdrop-blur-sm'
            }>
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
                    {plan.assignedClients} {clientLabel.toLowerCase()}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Tags className="size-3.5" />
                    {t.plans.tags.header}
                  </p>
                  {plan.tags.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{t.plans.tags.emptyState}</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {plan.tags.map((tag) => (
                        <TagItem key={tag.id} tag={tag} mode="readonly" />
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          )

          if (isSelecting) {
            return (
              <div key={row.id} onClick={() => handleToggleSelect(row.id)} className="cursor-pointer">
                {card}
              </div>
            )
          }

          return (
            <Link key={row.id} href={`/${locale}/nutritionist/plans/${plan.id}`} className="block transition-colors hover:opacity-80">
              {card}
            </Link>
          )
        })
      )}

      {isSelecting && (
        <SelectionFloatingBar
          selectedCount={selectedCount}
          totalCount={rows.length}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          t={t}
        />
      )}
    </div>
  )
}
