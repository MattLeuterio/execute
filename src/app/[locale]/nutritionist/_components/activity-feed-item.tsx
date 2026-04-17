"use client"

import { ActivityItem, ActivityType } from "@/lib/types"
import { CheckCircle2, AlertCircle, TrendingDown, Plus, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatTimeAgo } from "@/lib/date-utils"
import { getStatusColors } from "@/lib/colors"

interface ActivityFeedItemProps {
  activity: ActivityItem
  locale: string
  t: any
}

export function ActivityFeedItem({ activity, locale, t }: ActivityFeedItemProps) {
  const iconMap: Record<ActivityType, React.ReactNode> = {
    [ActivityType.ClientAdded]: <Plus className="h-4 w-4 text-emerald-500" />,
    [ActivityType.PlanAssigned]: <MessageSquare className="h-4 w-4 text-blue-500" />,
    [ActivityType.CheckInCompleted]: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    [ActivityType.CheckInMissed]: <AlertCircle className="h-4 w-4 text-yellow-500" />,
    [ActivityType.AdhererenceDrop]: <TrendingDown className="h-4 w-4 text-red-500" />,
    [ActivityType.PlanUpdated]: <MessageSquare className="h-4 w-4 text-blue-500" />,
    [ActivityType.NoteAdded]: <MessageSquare className="h-4 w-4 text-blue-500" />,
  }

  const getActivityDescription = (type: ActivityType, metadata?: any) => {
    const clientName = (metadata as any)?.clientName || ""
    
    const typeMap: Record<ActivityType, keyof typeof t.activity.types> = {
      [ActivityType.ClientAdded]: "clientAdded" as const,
      [ActivityType.PlanAssigned]: "planAssigned" as const,
      [ActivityType.CheckInCompleted]: "checkinCompleted" as const,
      [ActivityType.CheckInMissed]: "checkinMissed" as const,
      [ActivityType.AdhererenceDrop]: "adherenceDrop" as const,
      [ActivityType.PlanUpdated]: "planUpdated" as const,
      [ActivityType.NoteAdded]: "noteAdded" as const,
    }
    
    const baseKey = typeMap[type]
    
    if (baseKey && t?.activity?.types && baseKey in t.activity.types) {
      const template = (t.activity.types as any)[baseKey]
      return typeof template === "string" ? template.replace("{client}", clientName) : activity.description
    }
    return activity.description
  }

  return (
    <div className={cn("flex gap-4 rounded-lg border border-border/30 p-4", getStatusColors(activity.severity))}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background">
        {iconMap[activity.type]}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-foreground">{activity.clientName}</p>
          <p className="text-sm text-foreground/70">{getActivityDescription(activity.type, activity.metadata)}</p>
        </div>
        <p className="mt-1 text-xs text-foreground/50">{formatTimeAgo(activity.timestamp, 'string', t, locale)}</p>
      </div>

      {activity.metadata && (
        <div className="flex-shrink-0 text-right">
          {(activity.metadata as any).change !== undefined && (
            <span className={cn("text-xs font-medium", (activity.metadata as any).change < 0 ? "text-emerald-600" : "text-red-600")}>
              {(activity.metadata as any).change > 0 ? "+" : ""}{(activity.metadata as any).change}
            </span>
          )}
          {(activity.metadata as any).fromValue !== undefined && (
            <p className="text-xs text-foreground/50">
              {(activity.metadata as any).fromValue} → {(activity.metadata as any).toValue}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
