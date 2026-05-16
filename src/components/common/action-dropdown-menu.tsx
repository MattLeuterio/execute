"use client"

import type { ReactNode } from "react"
import { MoreVertical } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type TriggerSize = "sm" | "md"

interface ActionDropdownMenuProps {
  ariaLabel: string
  actions: ReactNode
  icon?: ReactNode
  triggerSize?: TriggerSize
  align?: React.ComponentProps<typeof DropdownMenuContent>["align"]
  contentClassName?: string
  triggerClassName?: string
}

const triggerSizeClassMap: Record<TriggerSize, string> = {
  sm: "size-7",
  md: "size-8",
}

export function ActionDropdownMenu({
  ariaLabel,
  actions,
  icon,
  triggerSize = "md",
  align = "end",
  contentClassName,
  triggerClassName,
}: ActionDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center cursor-pointer justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          triggerSizeClassMap[triggerSize],
          triggerClassName,
        )}
        aria-label={ariaLabel}
      >
        {icon ?? <MoreVertical className="size-4" />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={contentClassName}>
        {actions}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}