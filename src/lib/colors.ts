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

  // Handle severity strings
  if (typeof value === 'string') {
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
