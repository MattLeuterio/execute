'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Table,
  Updater,
  useReactTable,
} from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { getPlansTableColumns } from './plans-table-columns'
import type { PlanTableItem } from './plans-utils'

interface UsePlansTableProps {
  data: PlanTableItem[]
  locale: string
  t: NutritionistTranslations
}

interface UsePlansTableReturn {
  table: Table<PlanTableItem>
  globalFilter: string
  setGlobalFilter: (value: string) => void
  filteredData: PlanTableItem[]
  getSelectedRows: () => PlanTableItem[]
}

export function usePlansTable({ data, locale, t }: UsePlansTableProps): UsePlansTableReturn {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const filteredData = useMemo(() => {
    if (!globalFilter) return data
    const searchLower = globalFilter.toLowerCase()
    return data.filter((plan) => plan.name.toLowerCase().includes(searchLower))
  }, [data, globalFilter])

  const columns = useMemo(() => getPlansTableColumns(t, locale), [t, locale])

  const onSortingChange = useCallback((updater: Updater<SortingState>) => {
    setSorting((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  const onGlobalFilterChange = useCallback((updater: Updater<string>) => {
    setGlobalFilter((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  const onRowSelectionChange = useCallback((updater: Updater<RowSelectionState>) => {
    setRowSelection((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange,
    onGlobalFilterChange,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
    filteredData,
    getSelectedRows: () => table.getSelectedRowModel().rows.map((row) => row.original),
  }
}
