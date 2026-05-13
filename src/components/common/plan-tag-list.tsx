import { Badge } from '@/components/ui/badge'
import type { PlanTag } from '@/lib/types'
import { cn } from '@/lib/utils'
import { getPlanTagColorStyle } from '@/lib/plan-tag-colors'

interface PlanTagListProps {
  tags: PlanTag[]
  className?: string
  emptyLabel?: string
}

export function PlanTagList({ tags, className, emptyLabel = 'No tags' }: PlanTagListProps) {
  if (tags.length === 0) {
    return <p className={cn('text-xs text-muted-foreground', className)}>{emptyLabel}</p>
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant="outline"
          className="font-normal text-foreground/90"
          style={getPlanTagColorStyle(tag.color)}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  )
}