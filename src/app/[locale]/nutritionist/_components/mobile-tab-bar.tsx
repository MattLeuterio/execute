"use client"

import { NAVIGATION_ITEMS } from "@/lib/navigation"
import type { NutritionistTranslations } from "@/lib/i18n"
import { NavLink } from "./nav-link"

interface MobileTabBarProps {
  locale: string
  t: NutritionistTranslations
}

export function MobileTabBar({ locale, t }: MobileTabBarProps) {
  const getNavLabel = (href: string): string => {
    const labelMap: Record<string, string> = {
      dashboard: t.nav.dashboard,
      clients: t.nav.clients,
      checkins: t.nav.checkins,
      settings: t.nav.settings,
    }
    return labelMap[href] || href
  }

  return (
    <>
      {/* Mobile Tab Bar - visible on mobile, hidden on md and up */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border/50 bg-background md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            href={item.href}
            label={getNavLabel(item.href)}
            icon={item.icon}
            isCompact={true}
          />
        ))}
      </nav>

      {/* Spacer for mobile - prevents content from being hidden behind tab bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}
