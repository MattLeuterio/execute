import Link from "next/link"
import { ClientSummary } from "@/lib/types"
import { ClientTableRow } from "./client-table-row"

interface ClientsTableProps {
  clients: ClientSummary[]
  locale: string
  t: any
}

export function ClientsTable({ clients, locale, t }: ClientsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm">
      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 border-b border-border/30 bg-foreground/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-foreground/60">
        <div className="col-span-3">{t.clients.table.name}</div>
        <div className="col-span-2">{t.clients.table.adherence}</div>
        <div className="col-span-2">{t.clients.table.email}</div>
        <div className="col-span-2">{t.clients.table.phone}</div>
        <div className="col-span-3">{t.clients.table.lastActivity}</div>
        <div className="col-span-2">{t.clients.table.status}</div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-border/30">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/${locale}/nutritionist/clients/${client.id}`}
            className="transition-colors hover:bg-foreground/5"
          >
            <ClientTableRow client={client} t={t} locale={locale} />
          </Link>
        ))}
      </div>
    </div>
  )
}
