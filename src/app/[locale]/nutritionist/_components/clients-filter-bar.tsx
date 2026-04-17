"use client"

import Link from "next/link"
import type { NutritionistTranslations } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface ClientsFilterBarProps {
  currentFilter: string
  currentSort: string
  currentSortDir: "asc" | "desc"
  locale: string
  t: NutritionistTranslations
}

type FilterType = "all" | "atRisk" | "highAdherence" | "lowAdherence" | "inactive"

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "all" },
  { value: "atRisk", label: "atRisk" },
  { value: "highAdherence", label: "highAdherence" },
  { value: "lowAdherence", label: "lowAdherence" },
  { value: "inactive", label: "inactive" },
]

export function ClientsFilterBar({
  currentFilter,
  currentSort,
  currentSortDir,
  locale,
  t,
}: ClientsFilterBarProps) {
  const getFilterLabel = (key: FilterType): string => {
    return t.clients.filters[key]
  }

  return (
    <div className="rounded-lg border border-border/50 bg-background/50 p-4 backdrop-blur-sm">
      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map((option) => (
          <Link
            key={option.value}
            href={`/${locale}/nutritionist/clients?filter=${option.value}&sortBy=${currentSort}&sort=${currentSortDir}`}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              currentFilter === option.value
                ? "bg-emerald-500/20 text-emerald-500"
                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
            )}
          >
            {getFilterLabel(option.value)}
          </Link>
        ))}
      </div>
    </div>
  )
}
