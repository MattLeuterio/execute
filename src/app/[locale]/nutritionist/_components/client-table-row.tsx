import { ClientSummary, ClientStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { TrendingDown, TrendingUp, Minus } from "lucide-react"
import { getStatusColors } from "@/lib/colors"
import { formatTimeAgo } from "@/lib/date-utils"

interface ClientTableRowProps {
  client: ClientSummary
  t: any
  locale?: string
}

function getStatusBadgeColor(status: ClientStatus) {
  switch (status) {
    case ClientStatus.OnTrack:
      return "bg-emerald-500/20 text-emerald-600"
    case ClientStatus.Warning:
      return "bg-amber-500/20 text-amber-600"
    case ClientStatus.AtRisk:
      return "bg-red-500/20 text-red-600"
    case ClientStatus.Inactive:
      return "bg-slate-500/20 text-slate-600"
    default:
      return "bg-foreground/10 text-foreground/60"
  }
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

export function ClientTableRow({ client, t, locale }: ClientTableRowProps) {
  const lastWeightChange = (client as any).lastWeightChange || 0 // Demo: would come from adherence data
  const trendIcon = lastWeightChange > 0 ? <TrendingUp /> : lastWeightChange < 0 ? <TrendingDown /> : <Minus />

  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm">
      {/* Name */}
      <div className="col-span-3 font-medium text-foreground">{client.name}</div>

      {/* Adherence */}
      <div className="col-span-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-6 w-12 rounded text-xs font-medium flex items-center justify-center",
              getStatusColors(client.adherencePercentage)
            )}
          >
            {client.adherencePercentage}%
          </div>
        </div>
      </div>

      {/* Weight */}
      <div className="col-span-2 text-foreground/70">
        {client.latestWeight ? `${client.latestWeight}${client.weightUnit}` : "—"}
      </div>

      {/* Last Activity */}
      <div className="col-span-3 text-foreground/60">{formatTimeAgo(client.lastActivityDate, 'string', t, locale)}</div>

      {/* Status badge */}
      <div className="col-span-2">
        <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusColors(client.status))}>
          {getStatusLabel(client.status, t)}
        </span>
      </div>
    </div>
  )
}
