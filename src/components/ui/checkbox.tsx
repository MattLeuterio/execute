"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxProps = Omit<CheckboxPrimitive.Root.Props, "onCheckedChange"> & {
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({ className, onCheckedChange, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "inline-flex size-4 items-center justify-center rounded border border-input bg-transparent text-primary outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary data-checked:bg-primary/20",
        className
      )}
      onCheckedChange={(checked) => onCheckedChange?.(Boolean(checked))}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="inline-flex items-center justify-center text-primary">
        <Check className="size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }