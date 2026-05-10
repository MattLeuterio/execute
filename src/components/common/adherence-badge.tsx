import { cn } from "@/lib/utils"
import { getStatusColors } from "@/lib/colors"

interface AdherenceBadgeProps {
  value: number | null
  notAvailableLabel?: string
  className?: string
}

export function AdherenceBadge({ value, notAvailableLabel = "ND", className }: AdherenceBadgeProps) {
  if (value === null) {
    return (
      <div
        className={cn(
          "h-5 w-10 rounded text-xs font-medium flex items-center justify-center",
          "bg-slate-500/20 text-slate-600",
          className
        )}
      >
        {notAvailableLabel}
      </div>
    )
  }

  const colorClasses = getStatusColors(value, "object")

  return (
    <div
      className={cn(
        "h-5 w-10 rounded text-xs font-medium flex items-center justify-center",
        colorClasses.bg,
        colorClasses.text,
        className
      )}
    >
      {value}%
    </div>
  )
}
