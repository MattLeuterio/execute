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
