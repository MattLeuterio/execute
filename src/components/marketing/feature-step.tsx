import { Check } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FeatureStepProps = {
  step: string
  title: string
  description: string
}

export function FeatureStep({ step, title, description }: FeatureStepProps) {
  return (
    <Card className="border border-border/70 bg-card/70">
      <CardHeader className="gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/85">
          {step}
        </p>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Check className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
