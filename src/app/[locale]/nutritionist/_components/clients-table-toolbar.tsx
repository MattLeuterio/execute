'use client'

import { useState } from 'react'
import { Search, Download, Archive } from 'lucide-react'
import type { NutritionistTranslations } from '@/lib/i18n'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ClientSummary } from '@/lib/types'
import { exportClientsToCSV, archiveClients } from './clients-utils'

interface ClientsTableToolbarProps {
  selectedClients: ClientSummary[]
  searchTerm: string
  onSearchChange: (term: string) => void
  t: NutritionistTranslations
}

export function ClientsTableToolbar({
  selectedClients,
  searchTerm,
  onSearchChange,
  t,
}: ClientsTableToolbarProps) {
  const [isArchiving, setIsArchiving] = useState(false)

  const handleExportCSV = () => {
    exportClientsToCSV(selectedClients.length > 0 ? selectedClients : [])
  }

  const handleArchive = async () => {
    if (selectedClients.length === 0) return
    const confirmMsg = t?.clients?.actions?.confirmArchive?.replace('{count}', String(selectedClients.length)) 
      || `Archive ${selectedClients.length} client(s)?`
    if (!confirm(confirmMsg)) return

    setIsArchiving(true)
    try {
      await archiveClients(selectedClients.map((c) => c.id))
      // TODO: Refresh table
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40 pointer-events-none" />
        <Input
          placeholder={t?.clients?.search?.placeholder || "Search by name..."}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Bulk actions */}
      {selectedClients.length > 0 && (
        <div className="flex gap-2">
          <span className="flex items-center text-xs text-foreground/60">
            {selectedClients.length} {t?.clients?.search?.selected || "selected"}
          </span>

          <Button
            onClick={handleExportCSV}
            variant="ghost"
            size="sm"
            className="gap-2"
            title="Export selected clients to CSV"
          >
            <Download className="h-4 w-4" />
            {t?.clients?.actions?.export || "Export"}
          </Button>

          <Button
            onClick={handleArchive}
            disabled={isArchiving}
            variant="ghost"
            size="sm"
            className="gap-2 text-red-600/70 hover:text-red-600 hover:bg-red-500/10"
            title="Archive selected clients"
          >
            <Archive className="h-4 w-4" />
            {t?.clients?.actions?.archive || "Archive"}
          </Button>
        </div>
      )}
    </div>
  )
}
