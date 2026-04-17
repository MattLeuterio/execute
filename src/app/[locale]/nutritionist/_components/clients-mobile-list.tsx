'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Table } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { ClientSummary } from '@/lib/types'
import { ClientCard } from './client-card'
import { SelectionFloatingBar } from './selection-floating-bar'
import { Button } from '@/components/ui/button'

interface ClientsMobileListProps {
  table: Table<ClientSummary>
  locale: string
  t: NutritionistTranslations
}

export function ClientsMobileList({ table, locale, t }: ClientsMobileListProps) {
  const [isSelecting, setIsSelecting] = useState(false)
  const rows = table.getRowModel().rows
  const selectedCount = Object.values(table.getState().rowSelection).filter(Boolean).length
  
  const handleToggleSelect = (rowId: string) => {
    const rowIndex = rows.findIndex((r) => r.id === rowId)
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
      {/* Selection mode toggle */}
      {!isSelecting && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSelecting(true)}
          className="w-full"
        >
          Seleziona
        </Button>
      )}

      {/* Cards */}
      {rows.length === 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/50 p-8 text-center backdrop-blur-sm">
          <p className="text-sm text-foreground/50">{t.clients.emptyStates.noClients}</p>
        </div>
      ) : (
        rows.map((row) => {
          const isSelected = row.getIsSelected()
          
          if (isSelecting) {
            // Selection mode - no navigation
            return (
              <div
                key={row.id}
                onClick={() => handleToggleSelect(row.id)}
                className="cursor-pointer"
              >
                <ClientCard
                  client={row.original}
                  t={t}
                  isSelecting={true}
                  isSelected={isSelected}
                />
              </div>
            )
          } else {
            // Normal mode - navigate
            return (
              <Link
                key={row.id}
                href={`/${locale}/nutritionist/clients/${row.original.id}`}
                className="block transition-colors hover:opacity-80"
              >
                <ClientCard client={row.original} t={t} />
              </Link>
            )
          }
        })
      )}

      {/* Floating selection bar */}
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
