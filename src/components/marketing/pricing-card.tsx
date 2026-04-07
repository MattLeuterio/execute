import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PricingCardProps = {
  name: string
  price: string
  period?: string
  description: string
  highlights: string[]
  featured?: boolean
}

export function PricingCard({
  name,
  price,
  period = "/month",
  description,
  highlights,
  featured,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/70 bg-card/80",
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
        <Button className="w-full" variant={featured ? "default" : "outline"}>
          Request early access
        </Button>
      </CardFooter>
    </Card>
  )
}
