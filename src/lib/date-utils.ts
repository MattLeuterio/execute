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
 * Format a date as relative time (e.g., "5 days ago", "poco fa", "3 ore fa")
 * Supports full granularity: hours → days → weeks → months → full date
 *
 * @param date - The date to format
 * @param format - Return format: 'string' (default) or 'object'
 * @param t - Translation object with common.time keys
 * @param locale - Locale code for full date formatting (e.g., 'it', 'en')
 *
 * @example
 * // String format (default)
 * formatTimeAgo(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 'string', t, 'it')
 * // → "2 giorni fa"
 *
 * // Object format
 * formatTimeAgo(new Date(Date.now() - 5 * 60 * 60 * 1000), 'object', t)
 * // → { value: 5, unit: 'hour', key: 'hoursAgo', formatted: '5 hours ago' }
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
  t?: NutritionistTranslations,
  locale?: string
): string | TimeAgoResult {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  // Calculate time units
  const ms = diff
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  // Determine unit and key
  let unit: TimeUnit
  let value: number
  let key: string
  let suffix: string

  if (seconds < 60) {
    unit = 'now'
    value = 0
    key = 'justNow'
    suffix = t?.common?.time?.justNow || 'just now'
  } else if (hours < 1) {
    unit = 'hour'
    value = minutes
    key = 'minutesAgo'
    suffix = t?.common?.time?.minutesAgo || 'minutes ago'
  } else if (days < 1) {
    unit = 'hour'
    value = hours
    key = 'hoursAgo'
    suffix = t?.common?.time?.hoursAgo || ' hours ago'
  } else if (days === 1) {
    unit = 'day'
    value = 1
    key = 'yesterday'
    suffix = t?.common?.time?.yesterday || 'yesterday'
  } else if (weeks < 1) {
    unit = 'day'
    value = days
    key = 'daysAgo'
    suffix = t?.common?.time?.daysAgo || ' days ago'
  } else if (months < 1) {
    unit = 'week'
    value = weeks
    key = 'weeksAgo'
    suffix = t?.common?.time?.weeksAgo || ' weeks ago'
  } else if (months < 12) {
    unit = 'month'
    value = months
    key = 'monthsAgo'
    suffix = t?.common?.time?.monthsAgo || ' months ago'
  } else {
    unit = 'date'
    value = 0
    key = 'fullDate'
    suffix = date.toLocaleDateString(
      locale === 'it' ? 'it-IT' : locale === 'en' ? 'en-US' : 'en-US'
    )
  }

  // Format the output string
  let formatted: string

  if (unit === 'now') {
    formatted = suffix
  } else if (unit === 'day' && key === 'yesterday') {
    formatted = suffix
  } else if (unit === 'date') {
    formatted = suffix
  } else {
    // For numeric values, concatenate value + suffix
    formatted = `${value}${suffix}`
  }

  if (format === 'object') {
    return {
      value,
      unit,
      key,
      formatted,
    }
  }

  return formatted
}
