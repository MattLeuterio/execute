import { Check } from "lucide-react"

import { EarlyAccessDialog } from "@/components/marketing/early-access-dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { InterestedPlan, Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type PricingCardProps = {
  plan: InterestedPlan
  name: string
  price: string
  period?: string
  description: string
  highlights: string[]
  featured?: boolean
  language: Language
  ctaLabel: string
}

export function PricingCard({
  plan,
  name,
  price,
  period = "/month",
  description,
  highlights,
  featured,
  language,
  ctaLabel,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/70 bg-card/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md hover:ring-1 hover:ring-primary/15 motion-reduce:transform-none motion-reduce:transition-none",
        featured && "border-primary/70 ring-1 ring-primary/30"
      )}
    >
      <CardHeader className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {name}
        </p>
        <CardTitle className="text-3xl font-semibold text-foreground">
          {price}
          <span className="ml-1 text-sm font-normal text-muted-foreground">{period}</span>
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
              <Check className="mt-0.5 size-4 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-border/70 bg-transparent">
        <EarlyAccessDialog
          triggerLabel={ctaLabel}
          triggerVariant={featured ? "default" : "outline"}
          triggerSize="default"
          triggerClassName="w-full"
          language={language}
          initialPlan={plan}
        />
      </CardFooter>
    </Card>
  )
}
