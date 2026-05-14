'use client'

import { flexRender, Table } from '@tanstack/react-table'
import type { NutritionistTranslations } from '@/lib/i18n'
import type { PlanTableItem } from './plans-utils'

interface PlansTableDesktopProps {
  table: Table<PlanTableItem>
  locale: string
  t: NutritionistTranslations
}

export function PlansTableDesktop({ table, locale, t }: PlansTableDesktopProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-background">
      <div className="overflow-x-auto">
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border/30 bg-background text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                {headerGroup.headers.map((header) => {
                  const isSelect = header.column.id === 'select'
                  const isName = header.column.id === 'name'
                  const isStickyColumn = isSelect || isName

                  return (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left"
                      style={{
                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                        width: header.getSize(),
                        ...(isStickyColumn && {
                          position: 'sticky',
                          backgroundColor: 'var(--background)',
                          zIndex: isSelect ? 20 : 19,
                          left: isSelect ? 0 : 52,
                        }),
                      }}
                      onClick={() => {
                        if (header.column.getCanSort()) {
                          header.column.toggleSorting()
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="text-xs text-foreground/40">
                            {{
                              asc: ' ↑',
                              desc: ' ↓',
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-border/30">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="group">
                {row.getVisibleCells().map((cell) => {
                  const isSelect = cell.column.id === 'select'
                  const isName = cell.column.id === 'name'
                  const isStickyColumn = isSelect || isName

                  return (
                    <td
                      key={cell.id}
                      className={`px-6 py-4 text-sm overflow-hidden ${
                        isStickyColumn ? 'bg-background group-hover:bg-muted' : 'group-hover:bg-muted'
                      }`}
                      style={{
                        cursor: cell.column.id !== 'select' ? 'pointer' : 'default',
                        width: cell.column.getSize(),
                        ...(isStickyColumn && {
                          position: 'sticky',
                          zIndex: isSelect ? 20 : 19,
                          left: isSelect ? 0 : 52,
                        }),
                      }}
                      onClick={() => {
                        if (cell.column.id !== 'select') {
                          window.location.href = `/${locale}/nutritionist/plans/${row.original.id}`
                        }
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <div className="px-6 py-12 text-center text-sm text-foreground/50">{t.plans.detail.emptyStates.noPlans}</div>
      )}
    </div>
  )
}
