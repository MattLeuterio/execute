'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { getAllClientSummaries } from '@/lib/data/mock-clients'
import { nutritionistTranslations } from '@/lib/i18n'
import { useClientsTable } from './../_components/use-clients-table'
import { ClientsTableClient } from './../_components/clients-table-client'
import { ClientsTableToolbar } from './../_components/clients-table-toolbar'
import { ClientsTablePagination } from './../_components/clients-table-pagination'
import { ClientsMobileList } from './../_components/clients-mobile-list'

export default function ClientsPage() {
  const params = useParams()
  const locale = params.locale as string

  // Memoize clients data to prevent infinite loop
  const clients = useMemo(() => getAllClientSummaries(), [])
  
  // Get translations from centralized file
  const t = useMemo(() => nutritionistTranslations[locale as keyof typeof nutritionistTranslations] || nutritionistTranslations.en, [locale])

  const { table, globalFilter, setGlobalFilter, getSelectedRows } = useClientsTable({ data: clients, t })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t.clients.header}</h1>
        <p className="mt-2 text-sm text-foreground/60">{t.clients.subtitle}</p>
      </div>

      {/* Toolbar with search & bulk actions */}
      {clients.length > 0 && (
        <ClientsTableToolbar
          selectedClients={getSelectedRows()}
          searchTerm={globalFilter}
          onSearchChange={setGlobalFilter}
          t={t}
        />
      )}

      {/* Table */}
      {clients.length === 0 ? (
        <div className="rounded-lg border border-border/50 bg-background/50 p-12 text-center backdrop-blur-sm">
          <p className="text-sm text-foreground/50">{t.clients.emptyStates.noClients}</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden lg:block">
            <ClientsTableClient table={table} locale={locale} t={t} />
          </div>

          {/* Mobile list */}
          <div className="lg:hidden">
            <ClientsMobileList table={table} locale={locale} t={t} />
          </div>

          {/* Pagination */}
          <ClientsTablePagination table={table} />
        </>
      )}
    </div>
  )
}
