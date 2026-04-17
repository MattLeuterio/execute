'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  VisibilityState,
  PaginationState,
  RowSelectionState,
  Updater,
  Table,
} from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { ClientSummary } from '@/lib/types'
import { getClientsTableColumns } from './clients-table-columns'

interface UseClientsTableProps {
  data: ClientSummary[]
  t?: NutritionistTranslations
}

interface UseClientsTableReturn {
  table: Table<ClientSummary>
  globalFilter: string
  setGlobalFilter: (value: string) => void
  rowSelection: Record<string, boolean>
  getSelectedRows: () => ClientSummary[]
}

export function useClientsTable({ data, t }: UseClientsTableProps): UseClientsTableReturn {
  // State (independent from URL params to avoid infinite loops)
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getDefaultVisibility()
  )
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  // Search filter
  const filteredData = useMemo(() => {
    if (!globalFilter) return data
    const searchLower = globalFilter.toLowerCase()
    return data.filter((client) => client.name.toLowerCase().includes(searchLower))
  }, [data, globalFilter])

  // Columns
  const columns = useMemo(() => getClientsTableColumns(t), [t])

  // Memoized callbacks to prevent state update warnings
  const onSortingChange = useCallback((updater: Updater<SortingState>) => {
    setSorting((prev) => {
      const newSorting = typeof updater === 'function' ? updater(prev) : updater
      return newSorting
    })
  }, [])

  const onGlobalFilterChange = useCallback((updater: Updater<string>) => {
    setGlobalFilter((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  const onColumnVisibilityChange = useCallback((updater: Updater<VisibilityState>) => {
    setColumnVisibility((prev) => {
      const newVis = typeof updater === 'function' ? updater(prev) : updater
      if (typeof window !== 'undefined') {
        localStorage.setItem('execute_clients_table_visibility', JSON.stringify(newVis))
      }
      return newVis
    })
  }, [])

  const onRowSelectionChange = useCallback((updater: Updater<RowSelectionState>) => {
    setRowSelection((prev) => {
      const newSelection = typeof updater === 'function' ? updater(prev) : updater
      return newSelection
    })
  }, [])

  const onPaginationChange = useCallback((updater: Updater<PaginationState>) => {
    setPagination((prev) => {
      const newPag = typeof updater === 'function' ? updater(prev) : updater
      return newPag
    })
  }, [])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter, columnVisibility, rowSelection, pagination },
    onSortingChange,
    onGlobalFilterChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
    rowSelection,
    getSelectedRows: () => table.getSelectedRowModel().rows.map((r) => r.original),
  }
}

function getDefaultVisibility(): VisibilityState {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem('execute_clients_table_visibility')
    if (stored) return JSON.parse(stored)
  } catch {}
  return {
    select: true,
    name: true,
    adherencePercentage: true,
    latestWeight: true,
    lastActivityDate: true,
    status: true,
  }
}
