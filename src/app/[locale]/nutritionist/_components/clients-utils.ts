import type { NutritionistTranslations } from '@/lib/i18n'
import { ClientSummary } from '@/lib/types'

export function exportClientsToCSV(
  clients: ClientSummary[],
  t: NutritionistTranslations,
  filename?: string,
) {
  const timestamp = new Date().toISOString().split('T')[0]
  const defaultFilename = `${t.clients.csv.filePrefix}_${timestamp}.csv`

  const headers = [
    t.clients.csv.headers.name,
    t.clients.csv.headers.adherence,
    t.clients.csv.headers.weight,
    t.clients.csv.headers.lastActivity,
    t.clients.csv.headers.status,
  ]
  const rows = clients.map((c) => [
    c.name,
    c.adherencePercentage.toString(),
    c.latestWeight ? `${c.latestWeight}${c.weightUnit}` : '—',
    c.lastActivityDate.toLocaleDateString(),
    c.status,
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename || defaultFilename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function archiveClients(clientIds: string[]): Promise<void> {
  // TODO: Call API to mark clients as archived
  console.log('Archive clients:', clientIds)
  // Would call: PATCH /api/clients/archive { ids: clientIds }
  return Promise.resolve()
}
