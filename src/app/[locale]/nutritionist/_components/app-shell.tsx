import { ReactNode } from "react"
import { AppSidebar } from "./app-sidebar"
import { MobileTabBar } from "./mobile-tab-bar"

interface AppShellProps {
  children: ReactNode
  locale: string
  t: any
}

export function AppShell({ children, locale, t }: AppShellProps) {
  
  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar - desktop only */}
      <AppSidebar locale={locale} t={t} />

      {/* Main content area */}
      <main className="w-full flex-1 overflow-auto md:ml-64">
        <div className="w-full px-4 py-6 pb-20 sm:px-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>

      {/* Mobile tab bar + safe area spacer */}
      <MobileTabBar locale={locale} t={t} />
    </div>
  )
}
