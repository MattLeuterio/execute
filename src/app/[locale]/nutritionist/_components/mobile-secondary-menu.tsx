"use client"

import { MoreVertical } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Open secondary menu" />}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 min-w-48">
        {SECONDARY_MENU_ITEMS.map((item) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}