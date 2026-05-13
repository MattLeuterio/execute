import type { PlanDocument, PlanDocumentNode } from "@/lib/types"

export type PlanRenderOptions = {
  preview?: boolean
  maxNodes?: number
  maxListItems?: number
}

export type PlanCalloutTone = "info" | "warning" | "success"

export function getPlanDocumentNodes(
  document: PlanDocument | undefined,
  options?: PlanRenderOptions
): { nodes: PlanDocumentNode[]; isTruncated: boolean } {
  if (!document || !Array.isArray(document.content) || document.content.length === 0) {
    return { nodes: [], isTruncated: false }
  }

  const maxNodes = options?.maxNodes ?? 8
  const nodes = options?.preview ? document.content.slice(0, maxNodes) : document.content

  return {
    nodes,
    isTruncated: Boolean(options?.preview) && document.content.length > nodes.length,
  }
}

export function getPreviewItems<T>(
  items: T[],
  options: PlanRenderOptions | undefined,
  fallbackMax: number
): { items: T[]; isTruncated: boolean } {
  const maxItems = options?.maxListItems ?? fallbackMax

  if (!options?.preview || items.length <= maxItems) {
    return { items, isTruncated: false }
  }

  return {
    items: items.slice(0, maxItems),
    isTruncated: true,
  }
}

export function getPlanLinkHref(
  marks: Array<{ type: string; attrs?: Record<string, unknown> }> | undefined
): string | undefined {
  const linkMark = marks?.find((mark) => mark.type === "link")
  const href = linkMark?.attrs?.href
  return typeof href === "string" ? href : undefined
}

export function getPlanNodeHeadingLevel(node: PlanDocumentNode): number {
  const level = node.attrs?.level
  return typeof level === "number" ? level : 2
}

export function getPlanNodeCalloutTone(node: PlanDocumentNode): PlanCalloutTone {
  const tone = node.attrs?.tone
  if (tone === "warning" || tone === "success") {
    return tone
  }
  return "info"
}
