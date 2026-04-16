import { LayoutDashboard, Users, CheckSquare2, Settings } from "lucide-react"

export type NavigationItem = {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
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
    id: "checkins",
    label: "Check-ins",
    href: "checkins",
    icon: CheckSquare2,
  },
  {
    id: "settings",
    label: "Settings",
    href: "settings",
    icon: Settings,
  },
] as const
