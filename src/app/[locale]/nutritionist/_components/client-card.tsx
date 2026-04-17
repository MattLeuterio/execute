import { ClientSummary, ClientStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { getStatusColors } from "@/lib/colors"
import { formatTimeAgo } from "@/lib/date-utils"
import { TrendingDown, TrendingUp, Minus, ChevronRight } from "lucide-react"

interface ClientCardProps {
  client: ClientSummary
  t: any
  isSelecting?: boolean
  isSelected?: boolean
  locale?: string
}

function getStatusLabel(status: ClientStatus, t: any): string {
  switch (status) {
    case ClientStatus.OnTrack:
      return t.status.onTrack
    case ClientStatus.Warning:
      return t.status.warning
    case ClientStatus.AtRisk:
      return t.status.atRisk
    case ClientStatus.Inactive:
      return t.status.inactive
    default:
      return status
  }
}

export function ClientCard({ client, t, isSelecting = false, isSelected = false, locale }: ClientCardProps) {
  const borderClass = isSelecting
    ? isSelected
      ? 'border-emerald-500 border-2' // Verde quando selezionato
      : 'border-foreground/20 border-2' // Grigio quando non selezionato
    : 'border border-border' // Bordo visibile normalmente

  return (
    <div className={cn("rounded-lg bg-background/50 p-4 backdrop-blur-sm transition-colors", borderClass)}>
      {/* Header with name */}
      <div className="mb-3">
        <h3 className="font-semibold text-foreground">{client.name}</h3>
      </div>

      {/* Email */}
      {client.email && (
        <p className="mb-2 text-xs text-foreground/60">{client.email}</p>
      )}

      {/* Phone */}
      {client.phone && (
        <p className="mb-2 text-xs text-foreground/60">{client.phone}</p>
      )}

      {/* Metrics row */}
      <div className="mb-2 grid grid-cols-2 gap-4 text-xs">
        {/* Adherence */}
        <div>
          <p className="text-foreground/50">{t.clients.table.adherence}</p>
          <div className="mt-1 flex items-center gap-1">
            <div
              className={cn(
                "h-5 w-10 rounded text-xs font-medium flex items-center justify-center",
                getStatusColors(client.adherencePercentage)
              )}
            >
              {client.adherencePercentage}%
            </div>
          </div>
        </div>

        {/* Last Activity */}
        <div>
          <p className="text-foreground/50">{t.clients.table.lastActivity}</p>
          <p className="mt-1 font-medium text-foreground text-xs" suppressHydrationWarning>
            {formatTimeAgo(client.lastActivityDate, 'string', t, locale)}
          </p>
        </div>
      </div>
    </div>
  )
}
