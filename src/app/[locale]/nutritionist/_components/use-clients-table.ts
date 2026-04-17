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
  Table,
} from '@tanstack/react-table'
import { ClientSummary } from '@/lib/types'
import { getClientsTableColumns } from './clients-table-columns'

interface UseClientsTableProps {
  data: ClientSummary[]
  t?: any
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
  const [rowSelection, setRowSelection] = useState({})
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSortingChange = useCallback((updater: any) => {
    setSorting((prev) => {
      const newSorting =
        typeof updater === 'function' ? updater(prev) : (updater as SortingState)
      return newSorting
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onGlobalFilterChange = useCallback((value: any) => {
    setGlobalFilter(value)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onColumnVisibilityChange = useCallback((updater: any) => {
    setColumnVisibility((prev) => {
      const newVis =
        typeof updater === 'function' ? updater(prev) : (updater as VisibilityState)
      if (typeof window !== 'undefined') {
        localStorage.setItem('execute_clients_table_visibility', JSON.stringify(newVis))
      }
      return newVis
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRowSelectionChange = useCallback((updater: any) => {
    setRowSelection((prev) => {
      const newSelection =
        typeof updater === 'function'
          ? updater(prev)
          : (updater as Record<string, boolean>)
      return newSelection
    })
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPaginationChange = useCallback((updater: any) => {
    setPagination((prev) => {
      const newPag =
        typeof updater === 'function' ? updater(prev) : (updater as PaginationState)
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getSelectedRows: () => table.getSelectedRowModel().rows.map((r: any) => r.original),
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
