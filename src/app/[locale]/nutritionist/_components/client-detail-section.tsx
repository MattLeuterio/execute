import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientDetailSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  contentClassName?: string
  className?: string
}

export function ClientDetailSection({
  title,
  description,
  children,
  actions,
  contentClassName,
  className,
}: ClientDetailSectionProps) {
  return (
    <Card className={className ?? "border border-border/60 bg-background/60"}>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold tracking-tight text-foreground">{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}
