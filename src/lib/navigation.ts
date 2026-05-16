import { LayoutDashboard, Users, FileText, CheckSquare2, Settings, Archive } from "lucide-react"

export type NavigationItem = {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const MAIN_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "clients",
    label: "Clients",
    href: "clients",
    icon: Users,
  },
  {
    id: "plans",
    label: "Plans",
    href: "plans",
    icon: FileText,
  },
  {
    id: "checkins",
    label: "Check-ins",
    href: "checkins",
    icon: CheckSquare2,
  },
] as const

export const SECONDARY_MENU_ITEMS: NavigationItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "settings",
    icon: Settings,
  },
  {
    id: "archive",
    label: "Archive",
    href: "archive",
    icon: Archive,
  },
] as const

export const NAVIGATION_ITEMS: NavigationItem[] = [
  ...MAIN_NAVIGATION_ITEMS,
  ...SECONDARY_MENU_ITEMS,
]
