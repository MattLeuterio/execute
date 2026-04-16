import { Users, TrendingUp, AlertTriangle } from "lucide-react"
import { getAllClientSummaries, getClientsByStatus } from "@/lib/data/mock-clients"
import { getActivityFeed } from "@/lib/data/mock-activity"
import { ClientStatus } from "@/lib/types"
import { getTranslations, type Locale } from "@/lib/i18n"
import { KPICard } from "../_components/kpi-card"
import { AtRiskSection } from "../_components/at-risk-section"
import { ActivitySection } from "../_components/activity-section"

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params
  const t = getTranslations("nutritionist", locale as Locale)

  // Get data
  const allClients = getAllClientSummaries()
  const atRiskClients = getClientsByStatus(ClientStatus.AtRisk)
  const recentActivities = getActivityFeed(undefined, 10)

  // Calculate KPI metrics
  const totalActiveClients = allClients.length
  const avgAdherence = Math.round(
    allClients.reduce((sum, client) => sum + client.adherencePercentage, 0) / (allClients.length || 1),
  )
  const atRiskCount = atRiskClients.length

  // Determine average adherence trend (simplified: show if above/below 75%)
  const adherenceTrend = avgAdherence >= 75 ? ("up" as const) : avgAdherence >= 50 ? ("neutral" as const) : ("down" as const)

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t.dashboard.header}</h1>
        <p className="mt-2 text-sm text-foreground/60">{t.dashboard.subtitle}</p>
      </div>

      {/* KPI Grid - 3 columns on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          label={t.dashboard.kpi.activeClients}
          value={totalActiveClients}
          icon={<Users className="h-4 w-4" />}
        />

        <KPICard
          label={t.dashboard.kpi.avgAdherence}
          value={avgAdherence}
          unit="%"
          icon={<TrendingUp className="h-4 w-4" />}
        />

        <KPICard
          label={t.dashboard.kpi.clientsAtRisk}
          value={atRiskCount}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      {/* Content sections - responsive: mobile stacked, tablet+ 50/50 layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <AtRiskSection clients={atRiskClients.slice(0, 5)} locale={locale} t={t} />
        <ActivitySection activities={recentActivities.slice(0, 5)} locale={locale} t={t} />
      </div>
    </div>
  )
}
