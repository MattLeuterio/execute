'use client'

import { Fragment } from 'react'
import type { PlanDocument, PlanDocumentNode } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  getPlanDocumentNodes,
  getPlanLinkHref,
  getPlanNodeCalloutTone,
  getPlanNodeHeadingLevel,
  getPreviewItems,
  type PlanRenderOptions,
} from '@/lib/plan-document-utils'

interface PlanDocumentViewProps {
  content?: PlanDocument
  options?: PlanRenderOptions
  className?: string
}

function renderPlanTextNode(
  text: string,
  marks: Array<{ type: string; attrs?: Record<string, unknown> }> | undefined,
  key: string
) {
  let content = <Fragment key={key}>{text}</Fragment>

  const href = getPlanLinkHref(marks)
  if (href) {
    content = (
      <a
        key={`${key}-link`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {content}
      </a>
    )
  }

  for (const mark of marks ?? []) {
    if (mark.type === 'bold') {
      content = <strong key={`${key}-bold`}>{content}</strong>
    }

    if (mark.type === 'italic') {
      content = <em key={`${key}-italic`}>{content}</em>
    }
  }

  return content
}

function renderPlanNode(node: PlanDocumentNode, key: string, options?: PlanRenderOptions) {
  if (node.type === 'text') {
    return renderPlanTextNode(node.text ?? '', node.marks, key)
  }

  const rawChildren = (node.content ?? []).map((child, index) =>
    renderPlanNode(child, `${key}-${index}`, options)
  )

  const { items: previewListItems, isTruncated: isListTruncated } = getPreviewItems(rawChildren, options, 4)

  const listChildren = isListTruncated
    ? [...previewListItems, <li key={`${key}-ellipsis`}>...</li>]
    : previewListItems

  switch (node.type) {
    case 'heading': {
      const level = getPlanNodeHeadingLevel(node)

      if (level === 1) {
        return (
          <h3 key={key} className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {rawChildren}
          </h3>
        )
      }

      return (
        <h4 key={key} className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {rawChildren}
        </h4>
      )
    }
    case 'paragraph':
      return (
        <p key={key} className="text-sm leading-6 text-muted-foreground">
          {rawChildren}
        </p>
      )
    case 'bulletList':
      return (
        <ul key={key} className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {listChildren}
        </ul>
      )
    case 'orderedList':
      return (
        <ol key={key} className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {listChildren}
        </ol>
      )
    case 'listItem':
      return <li key={key}>{rawChildren}</li>
    case 'blockquote':
      return (
        <blockquote
          key={key}
          className="border-l-2 border-border/70 pl-3 text-sm leading-6 italic text-muted-foreground"
        >
          {rawChildren}
        </blockquote>
      )
    case 'horizontalRule':
      return <hr key={key} className="border-border/60" />
    case 'callout': {
      const tone = getPlanNodeCalloutTone(node)
      const toneClass =
        tone === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/10'
          : tone === 'warning'
            ? 'border-amber-500/30 bg-amber-500/10'
            : 'border-primary/25 bg-primary/10'

      return (
        <div key={key} className={cn('space-y-2 rounded-lg border p-3', toneClass)}>
          {rawChildren}
        </div>
      )
    }
    default:
      return (
        <div key={key} className="space-y-2">
          {rawChildren}
        </div>
      )
  }
}

export function PlanDocumentView({ content, options, className }: PlanDocumentViewProps) {
  const { nodes, isTruncated } = getPlanDocumentNodes(content, options)

  if (nodes.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      {nodes.map((node, index) => renderPlanNode(node, `plan-node-${index}`, options))}
      {isTruncated ? <p className="text-sm text-muted-foreground">...</p> : null}
    </div>
  )
}