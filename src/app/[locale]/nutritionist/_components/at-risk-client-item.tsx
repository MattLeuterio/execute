"use client"

import Link from "next/link"
import { ClientStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AtRiskClientItemProps {
  id: string
  name: string
  adherencePercentage: number
  status: ClientStatus
  lastActivityDate: Date
  locale: string
  t: any
}

export function AtRiskClientItem({
  id,
  name,
  adherencePercentage,
  status,
  lastActivityDate,
  locale,
  t,
}: AtRiskClientItemProps) {
  const daysAgo = Math.floor((new Date().getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24))

  const getTimeAgo = () => {
    if (daysAgo === 0) return t.common.time.today
    if (daysAgo === 1) return t.common.time.yesterday
    return `${daysAgo} ${t.common.time.daysAgo}`
  }

  return (
    <Link
      href={`/${locale}/nutritionist/clients/${id}`}
      className="group flex items-center justify-between rounded-lg border border-border/30 bg-background/30 p-4 transition-all hover:border-border/50 hover:bg-background/50"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
          <div>
            <h4 className="font-medium text-foreground">{name}</h4>
            <p className="text-xs text-foreground/50">{getTimeAgo()}</p>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-foreground">{adherencePercentage}%</p>
        <p className="text-xs text-foreground/50">{t.common.labels.adherence}</p>
      </div>
    </Link>
  )
}
