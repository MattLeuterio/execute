export interface ChartGridColor {
  stroke: string
  strokeOpacity: number
}

export type ChartAxisDomain = [string, string]

export function getChartGridColor(strokeOpacity: number): ChartGridColor {
  return {
    stroke: 'var(--border)',
    strokeOpacity,
  }
}

export function getChartTooltipContentStyle() {
  return {
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
  }
}

export function getChartAxisDomainWithOffset(offset = 5): ChartAxisDomain {
  return [`dataMin - ${offset}`, `dataMax + ${offset}`]
}