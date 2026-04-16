"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isCompact?: boolean
}

export function NavLink({ href, label, icon: Icon, isCompact = false }: NavLinkProps) {
  const pathname = usePathname()
  
  // Extract locale and current segment from pathname
  // Example: /it/nutritionist/dashboard -> locale='it', pathSegment='dashboard'
  const pathSegments = pathname.split("/").filter(Boolean)
  const locale = pathSegments[0] ?? "it"
  const pathSegment = pathSegments[pathSegments.length - 1] ?? ""
  
  // href comes without locale (e.g., "dashboard")
  const isActive = pathSegment === href
  
  // Build full href with locale
  const fullHref = `/${locale}/nutritionist/${href}`

  return (
    <Link
      href={fullHref}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        "text-sm font-medium text-foreground/70",
        "hover:text-foreground hover:bg-accent/10",
        isActive && "text-foreground bg-accent/15",
        isCompact && "justify-center gap-0 py-3"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={cn("h-4 w-4 flex-shrink-0", isCompact && "h-5 w-5")} />
      {!isCompact && <span>{label}</span>}
    </Link>
  )
}
