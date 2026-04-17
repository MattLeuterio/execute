"use client"

import Link from "next/link"
import { ActivityItem } from "@/lib/types"
import type { NutritionistTranslations } from "@/lib/i18n"
import { ActivityFeedItem } from "./activity-feed-item"

interface ActivitySectionProps {
  activities: ActivityItem[]
  locale: string
  t: NutritionistTranslations
}

export function ActivitySection({ activities, locale, t }: ActivitySectionProps) {
  return (
    <section className="rounded-lg border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">{t.dashboard.sections.recentActivity}</h2>
          <p className="mt-1 text-xs text-foreground/50">{t.dashboard.sections.latestUpdates}</p>
        </div>
        <Link
          href={`/${locale}/nutritionist/clients?sortBy=lastActivity&sort=desc`}
          className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          {t.dashboard.cta.viewAll}
        </Link>
      </div>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="py-8 text-center text-sm text-foreground/50">{t.dashboard.emptyStates.noActivity}</p>
        ) : (
          activities.map((activity) => <ActivityFeedItem key={activity.id} activity={activity} locale={locale} t={t} />)
        )}
      </div>
    </section>
  )
}
