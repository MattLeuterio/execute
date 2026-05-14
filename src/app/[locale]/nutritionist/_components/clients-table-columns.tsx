'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { NutritionistTranslations } from '@/lib/i18n'
import { ClientSummary } from '@/lib/types'
import { Checkbox } from '@/components/ui/checkbox'
import { AdherenceBadge } from '@/components/common/adherence-badge'
import { formatTimeAgo } from '@/lib/date-utils'
import { getPlanByClientId } from '@/lib/data/mock-plans'

const columnHelper = createColumnHelper<ClientSummary>()

export function getClientsTableColumns(
  t: NutritionistTranslations,
  locale: string,
): ColumnDef<ClientSummary>[] {
  return [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
          aria-label={t.clients.table.selection.selectAllRows}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          aria-label={t.clients.table.selection.selectRow.replace('{name}', row.original.name)}
        />
      ),
      size: 70,
      
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('name', {
      header: t.clients.table.name,
      cell: (info) => info.getValue(),
      size: 200,
    }) as ColumnDef<ClientSummary>,
    columnHelper.display({
      id: 'plan',
      header: t.clients.table.plan,
      cell: ({ row }) => {
        const plan = getPlanByClientId(row.original.id)

        if (!plan) {
          return <span className="text-muted-foreground">—</span>
        }

        return (
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-foreground">{plan.name}</span>
            <Link
              href={`/${locale}/nutritionist/plans/${plan.id}`}
              aria-label={`${t.plans.actions.openDetails}: ${plan.name}`}
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={(event) => event.stopPropagation()}
            >
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        )
      },
      size: 240,
    }) as ColumnDef<ClientSummary>,
    columnHelper.display({
      id: 'email',
      header: t.clients.table.email,
      cell: (info) => info.row.original.email || '—',
      size: 200,
    }) as ColumnDef<ClientSummary>,
    columnHelper.display({
      id: 'phone',
      header: t.clients.table.phone,
      cell: (info) => info.row.original.phone || '—',
      size: 175,
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('adherencePercentage', {
      header: t.clients.table.adherence,
      cell: (info) => {
        const percentage = info.getValue()
        return <AdherenceBadge value={percentage} />
      },
      size: 110,
    }) as ColumnDef<ClientSummary>,
    columnHelper.accessor('lastActivityDate', {
      header: t.clients.table.lastActivity,
      cell: (info) => (
        <div suppressHydrationWarning>
          {formatTimeAgo(info.getValue(), 'string', t, locale)}
        </div>
      ),
      size: 200,
    }) as ColumnDef<ClientSummary>,
  ]
}
