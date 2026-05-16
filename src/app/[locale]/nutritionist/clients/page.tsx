'use client'

import { useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Archive, Download } from 'lucide-react'
import { PageHeader } from '@/components/common/page-header'
import { getAllClientSummaries } from '@/lib/data/mock-clients'
import { nutritionistTranslations } from '@/lib/i18n'
import { ClientStatus } from '@/lib/types'
import { useClientsTable } from './../_components/use-clients-table'
import { ClientsTableClient } from './../_components/clients-table-client'
import { ClientsTablePagination } from './../_components/clients-table-pagination'
import { ClientsMobileList } from './../_components/clients-mobile-list'
import {
  TableActionsToolbar,
} from './../_components/table-actions-toolbar'
import { archiveClients, exportClientsToCSV } from './../_components/clients-utils'
import { useTableToolbarActions } from './../_components/use-table-toolbar-actions'

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

  const selectedClients = getSelectedRows()

  const handleExportCSV = () => {
    exportClientsToCSV(selectedClients.length > 0 ? selectedClients : [], t)
  }

  const handleArchive = async () => {
    if (selectedClients.length === 0) return

    const confirmMsg = t.clients.actions.confirmArchive.replace('{count}', String(selectedClients.length))
    if (!confirm(confirmMsg)) return

    await archiveClients(selectedClients.map((client) => client.id))
    // TODO: Refresh table
  }

  const { actions } = useTableToolbarActions({
    selectedCount: selectedClients.length,
    actionDefinitions: [
      {
        id: 'export',
        label: t.clients.actions.export,
        icon: Download,
        onClick: handleExportCSV,
      },
      {
        id: 'archive',
        label: t.clients.actions.archive,
        icon: Archive,
        onClick: handleArchive,
        className: 'text-red-600/70 hover:bg-red-500/10 hover:text-red-600',
      },
    ],
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader title={t.clients.header} description={t.clients.subtitle} />

      {/* Toolbar with search & bulk actions */}
      {filteredClients.length > 0 && (
        <TableActionsToolbar
          searchPlaceholder={t.clients.search.placeholder}
          searchTerm={globalFilter}
          onSearchChange={setGlobalFilter}
          selectedCount={selectedClients.length}
          selectedLabel={t.clients.search.selected}
          actions={actions}
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
