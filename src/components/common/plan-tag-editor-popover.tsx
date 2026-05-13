'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, PencilLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PLAN_TAG_COLOR_OPTIONS, getPlanTagColorOption, getPlanTagColorStyle } from '@/lib/plan-tag-colors'
import type { PlanTag, PlanTagColor } from '@/lib/types'
import { cn } from '@/lib/utils'

type DraftTag = {
  name: string
  color: PlanTag['color']
}

interface PlanTagEditorPopoverItemProps {
  tag: PlanTag
  labels: {
    title: string
    description: string
    name: string
    color: string
    colors: Record<PlanTagColor, string>
    save: string
    cancel: string
    saved: string
  }
  onChange: (nextTag: PlanTag) => void
}

function createDraft(tag: PlanTag): DraftTag {
  return {
    name: tag.name,
    color: tag.color ?? PLAN_TAG_COLOR_OPTIONS[0]?.key,
  }
}

function PlanTagEditorPopoverItem({ tag, labels, onChange }: PlanTagEditorPopoverItemProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DraftTag>(() => createDraft(tag))

  const selectedColorOption = useMemo(() => getPlanTagColorOption(draft.color), [draft.color])

  const handleSave = () => {
    const normalizedName = draft.name.trim()
    if (!normalizedName) {
      return
    }

    onChange({
      ...tag,
      name: normalizedName,
      color: draft.color ?? tag.color ?? PLAN_TAG_COLOR_OPTIONS[0]?.key,
      updatedAt: new Date(),
      slug: normalizedName.toLowerCase().replace(/\s+/g, '-'),
    })
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) {
          setDraft(createDraft(tag))
        } else {
          setDraft(createDraft(tag))
        }
      }}
    >
      <PopoverTrigger
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150',
          'cursor-pointer hover:-translate-y-px hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
          'text-foreground/90'
        )}
        style={getPlanTagColorStyle(tag.color)}
        aria-label={`${labels.title}: ${tag.name}`}
      >
        {tag.name}
        <PencilLine className="size-3.5 opacity-70" />
      </PopoverTrigger>

      <PopoverContent className="w-80 p-3" align="start">
        <PopoverHeader>
          <PopoverTitle className="text-xl">{labels.title}</PopoverTitle>
          <PopoverDescription>{labels.description}</PopoverDescription>
        </PopoverHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{labels.name}</label>
            <Input
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              placeholder={labels.name}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{labels.color}</label>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {PLAN_TAG_COLOR_OPTIONS.map((option) => {
                const isActive = option.key === draft.color

                return (
                  <Button
                    key={option.key}
                    type="button"
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-medium transition-transform hover:scale-[1.02]',
                      isActive ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : 'border-border/60'
                    )}
                    style={{ backgroundColor: option.hex }}
                    onClick={() => setDraft((current) => ({ ...current, color: option.key }))}
                    aria-label={labels.colors[option.key]}
                  >
                    {isActive ? <Check className="size-3.5" /> : null}
                  </Button>
                )
              })}
            </div>

            {selectedColorOption ? (
              <p className="text-xs text-muted-foreground">{labels.colors[selectedColorOption.key]}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">{labels.saved}</p>
            <div className="flex items-end justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
                {labels.cancel}
              </Button>
              <Button type="button" size="sm" onClick={handleSave}>
                {labels.save}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface PlanTagEditorPopoverListProps {
  tags: PlanTag[]
  emptyLabel: string
  labels: PlanTagEditorPopoverItemProps['labels']
  onTagsChange?: (tags: PlanTag[]) => void
  className?: string
}

export function PlanTagEditorPopoverList({
  tags,
  emptyLabel,
  labels,
  onTagsChange,
  className,
}: PlanTagEditorPopoverListProps) {
  const [internalTags, setInternalTags] = useState(tags)

  useEffect(() => {
    setInternalTags(tags)
  }, [tags])

  const handleTagChange = (nextTag: PlanTag) => {
    setInternalTags((current) => {
      const nextTags = current.map((tag) => (tag.id === nextTag.id ? nextTag : tag))
      onTagsChange?.(nextTags)
      return nextTags
    })
  }

  if (internalTags.length === 0) {
    return <p className={cn('text-xs text-muted-foreground', className)}>{emptyLabel}</p>
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {internalTags.map((tag) => (
        <PlanTagEditorPopoverItem key={tag.id} tag={tag} labels={labels} onChange={handleTagChange} />
      ))}
    </div>
  )
}