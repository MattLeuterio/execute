import { ReactNode } from "react"
import type { NutritionistTranslations } from "@/lib/i18n"
import Image from "next/image"

import { AppSidebar } from "./app-sidebar"
import { MobileTabBar } from "./mobile-tab-bar"
import { MobileSecondaryMenu } from "./mobile-secondary-menu"
import logoLockupHorizontal from "@/components/ui/image/logo-lockup-horizontal.svg"

interface AppShellProps {
  children: ReactNode
  locale: string
  t: NutritionistTranslations
}

export function AppShell({ children, locale, t }: AppShellProps) {
  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar - desktop only */}
      <AppSidebar locale={locale} t={t} />

      {/* Main content area */}
      <main className="w-full flex-1 overflow-auto md:ml-48">
        <header className="flex h-14 items-center justify-between border-b border-border/50 px-4 md:hidden">
          <Image src={logoLockupHorizontal} alt={t.brand} className="h-auto w-24" priority />
          <MobileSecondaryMenu locale={locale} t={t} />
        </header>

        <div className="w-full px-4 py-6 pb-20 sm:px-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile tab bar + safe area spacer */}
      <MobileTabBar locale={locale} t={t} />
    </div>
  )
}
