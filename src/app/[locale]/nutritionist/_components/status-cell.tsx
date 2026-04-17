import { ClientStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { getStatusColors } from "@/lib/colors"

interface StatusCellProps {
  status: ClientStatus
  t: any
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

export function StatusCell({ status, t }: StatusCellProps) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusColors(status))}>
      {getStatusLabel(status, t)}
    </span>
  )
}
