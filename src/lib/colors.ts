import { ClientStatus } from '@/lib/types/common'

/**
 * Color palette definitions for status indicators
 * Used across Marketing, Nutritionist, and App sections
 */

export interface StatusColorClass {
  bg: string
  text: string
}

/**
 * Chart palette definitions are intentionally separate from status colors.
 * Status colors communicate semantic risk. Chart colors identify data series.
 */

export type ChartSeriesKey =
  | 'adherence'
  | 'weight'
  | 'waist'
  | 'abdomen'
  | 'hips'
  | 'chest'
  | 'arm'
  | 'forearm'
  | 'wrist'
  | 'thighProximal'
  | 'thighMiddle'
  | 'thighDistal'
  | 'calf'
  | 'shin'
  | 'back'
  | 'thigh'
  | 'legs'
  | 'reference'

export interface ChartSeriesColor {
  stroke: string
  strokeOpacity: number
  fillOpacity: number
  legendDotClass: string
}

export interface ChartGradientStop {
  color: string
  opacity: number
}

export interface ChartGradientStops {
  start: ChartGradientStop
  end: ChartGradientStop
}

const CHART_SERIES_COLORS: Record<ChartSeriesKey, ChartSeriesColor> = {
  adherence: {
    stroke: '#5b8def',
    strokeOpacity: 0.9,
    fillOpacity: 0.16,
    legendDotClass: 'bg-[#5b8def]',
  },
  weight: {
    stroke: '#8b7fd1',
    strokeOpacity: 0.9,
    fillOpacity: 0.1,
    legendDotClass: 'bg-[#8b7fd1]',
  },
  waist: {
    stroke: '#4fa38a',
    strokeOpacity: 0.9,
    fillOpacity: 0.12,
    legendDotClass: 'bg-[#4fa38a]',
  },
  abdomen: {
    stroke: '#7a9d6f',
    strokeOpacity: 0.9,
    fillOpacity: 0.1,
    legendDotClass: 'bg-[#7a9d6f]',
  },
  hips: {
    stroke: '#c08a5b',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#c08a5b]',
  },
  chest: {
    stroke: '#a86c8a',
    strokeOpacity: 0.9,
    fillOpacity: 0.07,
    legendDotClass: 'bg-[#a86c8a]',
  },
  arm: {
    stroke: '#b98d6f',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#b98d6f]',
  },
  forearm: {
    stroke: '#c9a570',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#c9a570]',
  },
  wrist: {
    stroke: '#9b7db3',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#9b7db3]',
  },
  thighProximal: {
    stroke: '#6b9fb8',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#6b9fb8]',
  },
  thighMiddle: {
    stroke: '#8d9a7a',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#8d9a7a]',
  },
  thighDistal: {
    stroke: '#7ba08d',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#7ba08d]',
  },
  calf: {
    stroke: '#b89968',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#b89968]',
  },
  shin: {
    stroke: '#a09b78',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#a09b78]',
  },
  back: {
    stroke: '#8b8fa8',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#8b8fa8]',
  },
  thigh: {
    stroke: '#a47a8d',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#a47a8d]',
  },
  legs: {
    stroke: '#6f9c99',
    strokeOpacity: 0.9,
    fillOpacity: 0.08,
    legendDotClass: 'bg-[#6f9c99]',
  },
  reference: {
    stroke: 'var(--border)',
    strokeOpacity: 1,
    fillOpacity: 0,
    legendDotClass: 'bg-border',
  },
}

export function getChartSeriesColor(series: ChartSeriesKey): ChartSeriesColor {
  return CHART_SERIES_COLORS[series]
}

export function getChartGradientStops(series: ChartSeriesKey, startOpacity?: number): ChartGradientStops {
  const colorDef = getChartSeriesColor(series)
  const resolvedStartOpacity = startOpacity ?? colorDef.fillOpacity

  return {
    start: {
      color: colorDef.stroke,
      opacity: resolvedStartOpacity,
    },
    end: {
      color: colorDef.stroke,
      opacity: 0,
    },
  }
}

/**
 * Get status color classes based on ClientStatus enum, adherence percentage, or severity level
 *
 * @param value - ClientStatus enum, adherence percentage (0-100), or severity ('low'|'medium'|'high')
 * @param format - Return format: 'string' (default) or 'object'
 *
 * @example
 * // String format (default)
 * getStatusColors(85) // → 'bg-emerald-500/20 text-emerald-600'
 * getStatusColors(ClientStatus.AtRisk) // → 'bg-red-500/20 text-red-600'
 * getStatusColors('low') // → 'bg-emerald-500/10 text-emerald-600'
 * getStatusColors('high') // → 'bg-red-500/10 text-red-600'
 *
 * // Object format
 * getStatusColors(31, 'object') // → { bg: 'bg-red-500/20', text: 'text-red-600' }
 * getStatusColors(ClientStatus.Warning, 'object') // → { bg: 'bg-amber-500/20', text: 'text-amber-600' }
 * getStatusColors('medium', 'object') // → { bg: 'bg-amber-500/10', text: 'text-amber-600' }
 */

// Overload signatures
export function getStatusColors(
  value: number | ClientStatus | 'low' | 'medium' | 'high',
  format?: 'string'
): string

export function getStatusColors(
  value: number | ClientStatus | 'low' | 'medium' | 'high',
  format: 'object'
): StatusColorClass

// Implementation
export function getStatusColors(
  value: number | ClientStatus | 'low' | 'medium' | 'high',
  format: 'string' | 'object' = 'string'
): string | StatusColorClass {
  let status: ClientStatus

  // Handle ClientStatus enum values first since they are string enums at runtime.
  if (value === ClientStatus.OnTrack || value === ClientStatus.Warning || value === ClientStatus.AtRisk || value === ClientStatus.Inactive) {
    status = value
  } else if (typeof value === 'string') {
    // Handle severity strings
    if (value === 'low') {
      status = ClientStatus.OnTrack
    } else if (value === 'medium') {
      status = ClientStatus.Warning
    } else if (value === 'high') {
      status = ClientStatus.AtRisk
    } else {
      // Invalid severity value
      status = ClientStatus.Inactive
    }
  } else if (typeof value === 'number') {
    // Convert number (percentage) to ClientStatus
    if (value >= 75) {
      status = ClientStatus.OnTrack
    } else if (value >= 50) {
      status = ClientStatus.Warning
    } else {
      status = ClientStatus.AtRisk
    }
  } else {
    status = value
  }

  // Define color mappings
  const colorMap: Record<ClientStatus, StatusColorClass> = {
    [ClientStatus.OnTrack]: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-600',
    },
    [ClientStatus.Warning]: {
      bg: 'bg-amber-500/20',
      text: 'text-amber-600',
    },
    [ClientStatus.AtRisk]: {
      bg: 'bg-red-500/20',
      text: 'text-red-600',
    },
    [ClientStatus.Inactive]: {
      bg: 'bg-slate-500/20',
      text: 'text-slate-600',
    },
  }

  const colors = colorMap[status]

  if (format === 'object') {
    return colors
  }

  return `${colors.bg} ${colors.text}`
}
