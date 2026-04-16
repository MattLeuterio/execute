"use client"

import { cn } from "@/lib/utils"

interface KPICardProps {
  label: string
  value: string | number
  unit?: string
  trend?: {
    direction: "up" | "down" | "neutral"
    percentage?: number
  }
  icon?: React.ReactNode
}

export function KPICard({ label, value, unit, trend, icon }: KPICardProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/50 px-6 py-8 backdrop-blur-sm">
      {/* Icon or label */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">{label}</h3>
        {icon && <div className="text-foreground/40">{icon}</div>}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
        {unit && <span className="text-sm text-foreground/60">{unit}</span>}
      </div>

      {/* Trend */}
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded",
              trend.direction === "up" && "bg-emerald-500/20",
              trend.direction === "down" && "bg-red-500/20",
              trend.direction === "neutral" && "bg-foreground/10"
            )}
          >
            <span
              className={cn(
                "text-xs font-medium",
                trend.direction === "up" && "text-emerald-500",
                trend.direction === "down" && "text-red-500",
                trend.direction === "neutral" && "text-foreground/50"
              )}
            >
              {trend.direction === "up" && "↑"}
              {trend.direction === "down" && "↓"}
              {trend.direction === "neutral" && "→"}
            </span>
          </div>
          <span className="text-xs text-foreground/60">
            {trend.percentage ? `${trend.percentage}% from last week` : "No change"}
          </span>
        </div>
      )}
    </div>
  )
}
