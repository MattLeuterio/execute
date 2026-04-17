'use client'

import Link from 'next/link'
import { flexRender, Table } from '@tanstack/react-table'
import { ClientSummary } from '@/lib/types'

interface ClientsTableClientProps {
  table: Table<ClientSummary>
  locale: string
  t: any
}

export function ClientsTableClient({ table, locale, t }: ClientsTableClientProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
          {/* Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="border-b border-border/30 bg-background text-xs font-semibold uppercase tracking-wider text-foreground/60"
              >
                {headerGroup.headers.map((header: any) => {
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
                          left: isSelect ? 0 : 50,
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

          {/* Body */}
          <tbody className="divide-y divide-border/30">
            {table.getRowModel().rows.map((row: any) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-foreground/5"
                data-state={row.getIsSelected() ? 'selected' : undefined}
              >
                {row.getVisibleCells().map((cell: any) => {
                  const isSelect = cell.column.id === 'select'
                  const isName = cell.column.id === 'name'
                  const isStickyColumn = isSelect || isName
                  const isDateCell = cell.column.id === 'lastActivityDate'
                  
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm overflow-hidden"
                      style={{
                        cursor: cell.column.id !== 'select' ? 'pointer' : 'default',
                        width: cell.column.getSize(),
                        ...(isStickyColumn && {
                          position: 'sticky',
                          backgroundColor: 'var(--background)',
                          zIndex: isSelect ? 20 : 19,
                          left: isSelect ? 0 : 50,
                        }),
                      }}
                      onClick={() => {
                        if (cell.column.id !== 'select') {
                          window.location.href = `/${locale}/nutritionist/clients/${row.original.id}`
                        }
                      }}
                      suppressHydrationWarning={isDateCell}
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

      {/* Empty state */}
      {table.getRowModel().rows.length === 0 && (
        <div className="px-6 py-12 text-center text-sm text-foreground/50">
          {t.clients.emptyStates.noClients}
        </div>
      )}
    </div>
  )
}
