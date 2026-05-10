'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { ClientSummary } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import { AdherenceBadge } from '@/components/common/adherence-badge'
import { formatTimeAgo } from '@/lib/date-utils'

const columnHelper = createColumnHelper<ClientSummary>()

export function getClientsTableColumns(
  t?: NutritionistTranslations,
  locale?: string
): ColumnDef<ClientSummary>[] {
  return [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          aria-label={`Select row ${row.original.name}`}
        />
      ),
      size: 70,
      
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('name', {
      header: t?.clients?.table?.name || 'Name',
      cell: (info) => info.getValue(),
      size: 200,
    }) as ColumnDef<ClientSummary>,
    columnHelper.display({
      id: 'email',
      header: t?.clients?.table?.email || 'Email',
      cell: (info) => info.row.original.email || '—',
      size: 200,
    }) as ColumnDef<ClientSummary>,
    columnHelper.display({
      id: 'phone',
      header: t?.clients?.table?.phone || 'Phone',
      cell: (info) => info.row.original.phone || '—',
      size: 175,
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('adherencePercentage', {
      header: t?.clients?.table?.adherence || 'Adherence',
      cell: (info) => {
        const percentage = info.getValue()
        return <AdherenceBadge value={percentage} />
      },
      size: 110,
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('lastActivityDate', {
      header: t?.clients?.table?.lastActivity || 'Last Activity',
      cell: (info) => (
        <div suppressHydrationWarning>
          {formatTimeAgo(info.getValue(), 'string', t, locale)}
        </div>
      ),
      size: 200,
    }) as ColumnDef<ClientSummary>,
  ]
}
