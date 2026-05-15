'use client'

import { useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/common/page-header'
import { getAllClientSummaries } from '@/lib/data/mock-clients'
import { nutritionistTranslations } from '@/lib/i18n'
import { ClientStatus } from '@/lib/types'
import { useClientsTable } from './../_components/use-clients-table'
import { ClientsTableClient } from './../_components/clients-table-client'
import { ClientsTableToolbar } from './../_components/clients-table-toolbar'
import { ClientsTablePagination } from './../_components/clients-table-pagination'
import { ClientsMobileList } from './../_components/clients-mobile-list'

export default function ClientsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params.locale as string

  // Memoize clients data to prevent infinite loop
  const clients = useMemo(() => getAllClientSummaries(), [])

  const filteredClients = useMemo(() => {
    const filter = searchParams.get('filter')

    if (filter === 'at-risk') {
      return clients.filter((client) => client.status === ClientStatus.AtRisk)
    }

    return clients
  }, [clients, searchParams])

  const initialSorting = useMemo(() => {
    const sortBy = searchParams.get('sortBy')
    const sort = searchParams.get('sort')

    const sortByToColumnId: Record<string, string> = {
      name: 'name',
      adherence: 'adherencePercentage',
      adherencePercentage: 'adherencePercentage',
      lastActivity: 'lastActivityDate',
      lastActivityDate: 'lastActivityDate',
    }

    const columnId = sortBy ? sortByToColumnId[sortBy] : undefined

    if (!columnId) {
      return [{ id: 'name', desc: false }]
    }

    return [{ id: columnId, desc: sort !== 'asc' }]
  }, [searchParams])
  
  // Get translations from centralized file
  const t = useMemo(() => nutritionistTranslations[locale as keyof typeof nutritionistTranslations] || nutritionistTranslations.en, [locale])

  const { table, globalFilter, setGlobalFilter, getSelectedRows } = useClientsTable({
    data: filteredClients,
    t,
    locale,
    initialSorting,
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader title={t.clients.header} description={t.clients.subtitle} />

      {/* Toolbar with search & bulk actions */}
      {filteredClients.length > 0 && (
        <ClientsTableToolbar
          selectedClients={getSelectedRows()}
          searchTerm={globalFilter}
          onSearchChange={setGlobalFilter}
          t={t}
        />
      )}

      {/* Table */}
      {filteredClients.length === 0 ? (
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
          <ClientsTablePagination table={table} t={t} />
        </>
      )}
    </div>
  )
}
