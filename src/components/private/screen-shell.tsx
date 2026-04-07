import type { ReactNode } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ScreenShellProps = {
  title: string
  description: string
  children?: ReactNode
}

export function ScreenShell({ title, description, children }: ScreenShellProps) {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </header>
      <Card className="border border-border/70 bg-card/80">
        <CardHeader>
          <CardTitle className="text-base">MVP Placeholder</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}
