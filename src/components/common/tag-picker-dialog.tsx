'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Plus, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { PlanTag } from '@/lib/types'

interface TagPickerDialogLabels {
  title: string
  description: string
  searchPlaceholder: string
  emptyState: string
  selectedEmptyState: string
  selectedSummary: string
  create: string
  add: string
  cancel: string
  confirm: string
}

interface TagPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  labels: TagPickerDialogLabels
  availableTags: PlanTag[]
  initialSelectedTags: PlanTag[]
  onCreateTag: (name: string) => PlanTag
  onConfirmTags: (tags: PlanTag[]) => void
}

export function TagPickerDialog({
  open,
  onOpenChange,
  labels,
  availableTags,
  initialSelectedTags,
  onCreateTag,
  onConfirmTags,
}: TagPickerDialogProps) {
  const [query, setQuery] = useState('')
  const [draftSelectedTags, setDraftSelectedTags] = useState<PlanTag[]>(initialSelectedTags)
  const normalizedQuery = query.trim().toLowerCase()

  useEffect(() => {
    if (open) {
      setDraftSelectedTags(initialSelectedTags)
      setQuery('')
      return
    }

    setQuery('')
  }, [initialSelectedTags, open])

  const handleClose = () => {
    setQuery('')
    onOpenChange(false)
  }

  const handleCancel = () => {
    setDraftSelectedTags(initialSelectedTags)
    handleClose()
  }

  const handleConfirm = () => {
    onConfirmTags(draftSelectedTags)
    setQuery('')
    onOpenChange(false)
  }

  const toggleTag = (tag: PlanTag) => {
    setDraftSelectedTags((current) => {
      if (current.some((item) => item.id === tag.id)) {
        return current.filter((item) => item.id !== tag.id)
      }

      return [...current, tag]
    })
  }

  const createAndSelectTag = () => {
    const createdTag = onCreateTag(query.trim())
    setDraftSelectedTags((current) => {
      if (current.some((item) => item.id === createdTag.id)) {
        return current
      }

      return [...current, createdTag]
    })
    setQuery('')
  }

  const removeSelectedTag = (tagId: string) => {
    setDraftSelectedTags((current) => current.filter((tag) => tag.id !== tagId))
  }

  const selectedCount = draftSelectedTags.length

  const selectedTagIds = useMemo(() => draftSelectedTags.map((tag) => tag.id), [draftSelectedTags])

  const selectableTags = useMemo(() => {
    const selectedIdsSet = new Set(selectedTagIds)

    return availableTags.filter((tag) => {
      if (selectedIdsSet.has(tag.id)) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      return [tag.name, tag.slug].join(' ').toLowerCase().includes(normalizedQuery)
    })
  }, [availableTags, normalizedQuery, selectedTagIds])

  const exactMatch = useMemo(
    () => availableTags.find((tag) => tag.name.trim().toLowerCase() === normalizedQuery),
    [availableTags, normalizedQuery],
  )

  const canCreateTag = normalizedQuery.length > 0 && !exactMatch

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? onOpenChange(true) : handleCancel())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.searchPlaceholder} />

          <div className="space-y-2 rounded-lg border border-border/50 bg-background/50 p-3">
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <p>{labels.selectedSummary.replace('{count}', String(selectedCount))}</p>
            </div>

            {selectedCount === 0 ? (
              <p className="text-sm text-muted-foreground">{labels.selectedEmptyState}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {draftSelectedTags.map((tag) => (
                  <Button
                    key={tag.id}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => removeSelectedTag(tag.id)}
                  >
                    {tag.name}
                    <X className="size-3.5 opacity-60" />
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="max-h-72 overflow-auto rounded-lg border border-border/50 bg-background/50">
            {selectableTags.length === 0 ? (
              <p className="p-3 text-sm text-muted-foreground">{labels.emptyState}</p>
            ) : (
              <div className="divide-y divide-border/50">
                {selectableTags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between gap-3 p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{tag.name}</p>
                      <p className="text-xs text-muted-foreground">{tag.slug}</p>
                    </div>
                    <Button type="button" className="cursor-pointer" size="sm" variant="outline" onClick={() => toggleTag(tag)}>
                      {labels.add}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {canCreateTag ? (
            <Button type="button" variant="secondary" className="w-full justify-center gap-2" onClick={createAndSelectTag}>
              <Plus className="size-4" />
              {labels.create}: {query.trim()}
            </Button>
          ) : null}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            {labels.cancel}
          </Button>
          <Button type="button" onClick={handleConfirm}>
            {labels.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
