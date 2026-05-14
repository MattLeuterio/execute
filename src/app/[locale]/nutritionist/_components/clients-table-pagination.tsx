'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Table } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ClientSummary } from '@/lib/types'

interface ClientsTablePaginationProps {
  table: Table<ClientSummary>
  t: NutritionistTranslations
}

export function ClientsTablePagination({ table, t }: ClientsTablePaginationProps) {
  const canPreviousPage = table.getCanPreviousPage()
  const canNextPage = table.getCanNextPage()
  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = table.getState().pagination.pageSize
  const totalPages = table.getPageCount()

  return (
    <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-background/50 px-6 py-4 backdrop-blur-sm">
      <div className="text-xs text-foreground/60">
        {t.clients.table.pagination.page} <span className="font-medium text-foreground">{pageIndex + 1}</span> {t.clients.table.pagination.of}{' '}
        <span className="font-medium text-foreground">{totalPages}</span> •{' '}
        <span className="font-medium text-foreground">{table.getFilteredRowModel().rows.length}</span>{' '}
        {t.clients.table.pagination.total}
      </div>

      <div className="flex items-center gap-2">
        <Select value={String(pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
          <SelectTrigger className="w-30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} {t.clients.table.pagination.rows}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => table.previousPage()}
          disabled={!canPreviousPage}
          variant="ghost"
          size="sm"
          aria-label={t.clients.table.pagination.previousPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => table.nextPage()}
          disabled={!canNextPage}
          variant="ghost"
          size="sm"
          aria-label={t.clients.table.pagination.nextPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
