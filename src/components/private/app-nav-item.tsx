"use client"

import { House, LayoutList, LineChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

type AppNavItemProps = {
  href: string
  label: string
  icon: "today" | "plan" | "progress"
}

const iconMap = {
  today: House,
  plan: LayoutList,
  progress: LineChart,
}

export function AppNavItem({ href, label, icon: Icon }: AppNavItemProps) {
  const pathname = usePathname()
  const active = pathname === href
  const IconComponent = iconMap[Icon]

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      )}
    >
      <IconComponent className="size-4" />
      <span>{label}</span>
    </Link>
  )
}
