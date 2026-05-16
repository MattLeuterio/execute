'use client'

import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { TagItem } from '@/components/common/tag-item'
import type { PlanTableItem } from './plans-utils'

const columnHelper = createColumnHelper<PlanTableItem>()

export function getPlansTableColumns(t: NutritionistTranslations, locale: string): ColumnDef<PlanTableItem>[] {
  return [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
          aria-label={t.plans.table.selection.selectAllRows}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
          aria-label={t.plans.table.selection.selectRow.replace('{name}', row.original.name)}
        />
      ),
      size: 52,
    }) as ColumnDef<PlanTableItem>,
    columnHelper.accessor('name', {
      header: t.plans.table.title,
      size: 250,
      cell: ({ row }) => {
        const plan = row.original

        return (
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-foreground">{plan.name}</span>
          </div>
        )
      },
    }) as ColumnDef<PlanTableItem>,
    columnHelper.accessor('status', {
      header: t.plans.table.status,
      size: 120,
      cell: (info) => (
        <Badge variant="outline" className="capitalize">
          {info.getValue()}
        </Badge>
      ),
    }) as ColumnDef<PlanTableItem>,
    columnHelper.accessor('assignedClients', {
      header: t.plans.table.clients,
      size: 120,
      cell: (info) => info.getValue(),
    }) as ColumnDef<PlanTableItem>,
    columnHelper.accessor('updatedAt', {
      header: t.plans.table.updatedAt,
      size: 150,
      cell: (info) => info.getValue().toLocaleDateString(locale),
    }) as ColumnDef<PlanTableItem>,
    columnHelper.display({
      id: 'tags',
      header: t.plans.tags.header,
      size: 320,
      cell: ({ row }) => {
        const tags = row.original.tags

        if (tags.length === 0) {
          return <p className="text-xs text-muted-foreground">{t.plans.tags.emptyState}</p>
        }

        return (
          <div className="flex flex-wrap justify-start gap-2">
            {tags.map((tag) => (
              <TagItem key={tag.id} tag={tag} mode="readonly" />
            ))}
          </div>
        )
      },
    }) as ColumnDef<PlanTableItem>,
  ]
}
