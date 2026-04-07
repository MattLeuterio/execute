import { Circle, CircleCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Meal = {
  label: string
  done?: boolean
}

type AppPreviewCardProps = {
  title: string
  subtitle: string
  completion: string
  meals: Meal[]
}

export function AppPreviewCard({
  title,
  subtitle,
  completion,
  meals,
}: AppPreviewCardProps) {
  return (
    <Card className="border border-border/70 bg-card/80">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{subtitle}</p>
          <CardTitle className="mt-1 text-lg">{title}</CardTitle>
        </div>
        <Badge variant="outline" className="border-primary/60 text-primary">
          {completion}
        </Badge>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {meals.map((meal) => (
            <li key={meal.label} className="flex items-center gap-2 text-sm text-foreground/90">
              {meal.done ? (
                <CircleCheck className="size-4 text-primary" />
              ) : (
                <Circle className="size-4 text-muted-foreground" />
              )}
              <span>{meal.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
