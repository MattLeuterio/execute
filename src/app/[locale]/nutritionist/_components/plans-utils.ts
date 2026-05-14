import { jsPDF } from 'jspdf'
import type { NutritionistTranslations } from '@/lib/i18n'
import { Plan, PlanStatus } from '@/lib/types'

export interface PlanTableItem extends Plan {
  assignedClients: number
}

function extractDocumentText(plan: Plan): string {
  const chunks: string[] = []

  const walk = (node: { text?: string; content?: Array<{ text?: string; content?: Array<unknown> }> }) => {
    if (typeof node.text === 'string' && node.text.trim().length > 0) {
      chunks.push(node.text.trim())
    }

    if (Array.isArray(node.content)) {
      node.content.forEach((child) => walk(child as { text?: string; content?: Array<{ text?: string; content?: Array<unknown> }> }))
    }
  }

  plan.contentJson.content.forEach((node) => walk(node as { text?: string; content?: Array<{ text?: string; content?: Array<unknown> }> }))

  return chunks.join('\n')
}

export function exportPlansToPdf(
  plans: PlanTableItem[],
  locale: string,
  t: NutritionistTranslations,
) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const marginX = 48
  const marginY = 56
  const contentWidth = pageWidth - marginX * 2
  const pdf = t.plans.pdf

  plans.forEach((plan, index) => {
    if (index > 0) {
      doc.addPage()
    }

    let cursorY = marginY

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(17)
    doc.text(plan.name, marginX, cursorY)
    cursorY += 28

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)

    const metaLines = [
      `${pdf.status}: ${plan.status}`,
      `${pdf.updated}: ${plan.updatedAt.toLocaleDateString(locale)}`,
      `${pdf.assignedClients}: ${plan.assignedClients}`,
      `${pdf.tags}: ${plan.tags.length > 0 ? plan.tags.map((tag) => tag.name).join(', ') : pdf.none}`,
      `${pdf.version}: ${plan.version}`,
    ]

    metaLines.forEach((line) => {
      doc.text(line, marginX, cursorY)
      cursorY += 18
    })

    const summary = plan.description ?? plan.summary ?? ''
    if (summary) {
      cursorY += 8
      doc.setFont('helvetica', 'bold')
      doc.text(pdf.summary, marginX, cursorY)
      cursorY += 18
      doc.setFont('helvetica', 'normal')

      const summaryLines = doc.splitTextToSize(summary, contentWidth)
      doc.text(summaryLines, marginX, cursorY)
      cursorY += summaryLines.length * 14
    }

    const textContent = extractDocumentText(plan)
    if (textContent) {
      cursorY += 10
      doc.setFont('helvetica', 'bold')
      doc.text(pdf.planDocument, marginX, cursorY)
      cursorY += 18
      doc.setFont('helvetica', 'normal')

      const contentLines = doc.splitTextToSize(textContent, contentWidth)
      const availableHeight = pageHeight - cursorY - marginY
      const maxLines = Math.max(1, Math.floor(availableHeight / 14))
      const visibleLines = contentLines.slice(0, maxLines)

      doc.text(visibleLines, marginX, cursorY)

      if (contentLines.length > maxLines) {
        doc.text('...', marginX, pageHeight - marginY)
      }
    }
  })

  const datePart = new Date().toISOString().split('T')[0]
  doc.save(`${pdf.filePrefix}_${datePart}.pdf`)
}

export async function updatePlansStatus(planIds: string[], status: PlanStatus): Promise<void> {
  console.log('Update plans status', { planIds, status })
  return Promise.resolve()
}

export async function deletePlans(planIds: string[]): Promise<void> {
  console.log('Delete plans', { planIds })
  return Promise.resolve()
}
