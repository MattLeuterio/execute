import { ReactNode } from "react"
import { AppSidebar } from "./app-sidebar"
import { MobileTabBar } from "./mobile-tab-bar"

interface AppShellProps {
  children: ReactNode
  locale: string
  t: (key: string) => string
}

export function AppShell({ children, locale, t }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - desktop only */}
      <AppSidebar locale={locale} t={t} />

      {/* Main content area */}
      <main className="w-full flex-1 md:ml-64">
        <div className="mx-auto w-full px-4 py-6 pb-20 sm:px-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile tab bar + safe area spacer */}
      <MobileTabBar locale={locale} t={t} />
    </div>
  )
}
