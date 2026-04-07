import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type LandingSectionProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
  flexAlignment?: "center"|"left"|"right"
}

export function LandingSection({
  id,
  eyebrow,
  title,
  description,
  children,
  flexAlignment = "left",
  className,
}: LandingSectionProps) {
  return (
    <section id={id} className={cn("px-4 py-12 sm:px-6 sm:py-16", className)}>
      <div className={cn("mx-auto flex w-full max-w-5xl flex-col gap-8", `items-${flexAlignment}`)}>
        <header className="space-y-3">
          {eyebrow ? (
            <p className="text-l font-medium tracking-tighter text-primary/85">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="max-w-2xl text-2xl leading-tight tracking-tighter font-semibold text-foreground sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}
