import { ClientSummary } from '@/lib/types'

export function exportClientsToCSV(clients: ClientSummary[], filename?: string) {
  const timestamp = new Date().toISOString().split('T')[0]
  const defaultFilename = `clients_export_${timestamp}.csv`

  const headers = ['Name', 'Adherence %', 'Weight', 'Last Activity', 'Status']
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
