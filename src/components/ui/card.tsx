import * as React from "react"

import { cn } from "@/lib/utils"

const cardBaseClassName =
  "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl"

const cardSizeClassName = {
  default: "",
  sm: "gap-3 py-3 has-data-[slot=card-footer]:pb-0",
} as const

const cardAppearanceClassName = {
  default: "",
  glass:
    "relative isolate overflow-hidden border border-white/10 bg-card/85 ring-white/10 shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.14)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-white/12 before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(var(--radius-xl)-1px)] after:bg-linear-to-b after:from-white/8 after:to-transparent after:content-['']",
  "glass-subtle":
    "relative isolate overflow-hidden border border-white/8 bg-card/20 ring-white/8 shadow-[0_14px_30px_-24px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-b before:from-white/2 before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(var(--radius-xl)-1px)] after:bg-linear-to-b after:from-white/5 after:to-transparent after:content-['']",
} as const

function Card({
  className,
  size = "default",
  appearance = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  appearance?: "default" | "glass" | "glass-subtle"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-appearance={appearance}
      className={cn(
        cardBaseClassName,
        cardSizeClassName[size],
        cardAppearanceClassName[appearance],
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
