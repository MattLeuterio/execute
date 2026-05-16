"use client"

import { usePathname, useRouter } from "next/navigation"

import { ActionDropdownMenu } from "@/components/common/action-dropdown-menu"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { NutritionistTranslations } from "@/lib/i18n"
import { SECONDARY_MENU_ITEMS } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface MobileSecondaryMenuProps {
  locale: string
  t: NutritionistTranslations
}

export function MobileSecondaryMenu({ locale, t }: MobileSecondaryMenuProps) {
  const pathname = usePathname()
  const router = useRouter()

  const getNavLabel = (href: string): string => {
    const labelMap: Record<string, string> = {
      settings: t.nav.settings,
      archive: t.nav.archive,
    }
    return labelMap[href] || href
  }

  return (
    <ActionDropdownMenu
      ariaLabel="Open secondary menu"
      triggerSize="sm"
      align="end"
      contentClassName="w-48 min-w-48"
      actions={SECONDARY_MENU_ITEMS.map((item) => {
        const fullHref = `/${locale}/nutritionist/${item.href}`
        const isActive = pathname.includes(`/${item.href}`)

        return (
          <DropdownMenuItem
            key={item.id}
            className={cn("cursor-pointer", isActive && "bg-accent/20 text-foreground")}
            onClick={() => router.push(fullHref)}
          >
            <item.icon className="h-4 w-4" />
            <span>{getNavLabel(item.href)}</span>
          </DropdownMenuItem>
        )
      })}
    />
  )
}