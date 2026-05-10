/**
 * Centralized date/time formatting utility
 * Used across Marketing, Nutritionist, and App sections
 */

import type { NutritionistTranslations } from "@/lib/i18n"

export type TimeUnit = 'now' | 'hour' | 'day' | 'week' | 'month' | 'date'

export interface TimeAgoResult {
  value: number
  unit: TimeUnit
  key: string
  formatted: string
}

/**
 * Format a date as absolute time in the following format:
 * DD/MM/YYYY | HH:mm
 *
 * @param date - The date to format
 * @param format - Return format: 'string' (default) or 'object'
 * @param t - Kept for backward compatibility (unused)
 * @param locale - Kept for backward compatibility (unused)
 *
 * @example
 * formatTimeAgo(new Date('2026-04-24T14:54:00'))
 * // → "24/04/2026 | 14:54"
 *
 * formatTimeAgo(new Date('2026-04-24T14:54:00'), 'object')
 * // → { value: 0, unit: 'date', key: 'fullDate', formatted: '24/04/2026 | 14:54' }
 */

// Overload signatures
export function formatTimeAgo(
  date: Date,
  format?: 'string',
  t?: NutritionistTranslations,
  locale?: string
): string

export function formatTimeAgo(
  date: Date,
  format: 'object',
  t?: NutritionistTranslations,
  locale?: string
): TimeAgoResult

// Implementation
export function formatTimeAgo(
  date: Date,
  format: 'string' | 'object' = 'string',
  _t?: NutritionistTranslations,
  _locale?: string
): string | TimeAgoResult {
  void _t
  void _locale

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formatted = `${day}.${month}.${year} | ${hours}:${minutes}`

  if (format === 'object') {
    return {
      value: 0,
      unit: 'date',
      key: 'fullDate',
      formatted,
    }
  }

  return formatted
}

export function capitalizeFirstLetter(value: string) {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * Format a date for chart tooltips.
 * When a locale is provided, returns a long localized date (e.g. "8 Marzo 2026").
 * Falls back to the legacy compact format if no locale is supplied.
 */
export function formatChartTooltipDate(date: Date, locale?: string): string {
  if (locale) {
    return capitalizeFirstLetter(
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date)
    )
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  return `${day}.${month}.${year}`
}

/**
 * Filter chart data points to show only the last N months
 * Used to limit historical chart display to recent data
 *
 * @param data - Array of chart data points with a 'label' and optional 'sortValue' or date info
 * @param months - Number of months to keep (e.g., 3 for last 3 months)
 * @param getRawDate - Optional function to extract Date from each data point
 * @returns Filtered array containing only data from the last N months
 *
 * @example
 * const filtered = filterDataByMonthsRange(weightData, 3, (point) => new Date(point.date))
 * // Returns only weight data from the last 3 months
 */
export function filterDataByMonthsRange<T extends { label: string }>(
  data: T[],
  months: number,
  getRawDate?: (point: T) => Date
): T[] {
  if (!data.length || months < 0) return data
  
  // Special case: months = -1 means "all data"
  if (months < 0) return data

  const now = new Date()
  const cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())

  return data.filter((point) => {
    if (!getRawDate) {
      // Fallback: assume point might have a date field or use current date
      return true
    }
    
    const pointDate = getRawDate(point)
    return pointDate >= cutoffDate
  })
}
