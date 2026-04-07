import type { ReactNode } from "react"

import { AppNavItem } from "@/components/private/app-nav-item"

const navItems = [
  {
    href: "/app/today",
    label: "Today",
    icon: "today",
  },
  {
    href: "/app/plan",
    label: "Plan",
    icon: "plan",
  },
  {
    href: "/app/progress",
    label: "Progress",
    icon: "progress",
  },
] as const

export default function PrivateAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-xl flex-1 flex-col border-x border-border/70 bg-background">
      <header className="border-b border-border/70 px-4 py-5 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/85">Execute</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Client App</h1>
      </header>

      <div className="flex-1 px-4 py-6 sm:px-6">{children}</div>

      <nav className="sticky bottom-0 border-t border-border/70 bg-card/95 px-4 py-3 backdrop-blur sm:px-6">
        <ul className="grid grid-cols-3 gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <AppNavItem href={item.href} label={item.label} icon={item.icon} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
