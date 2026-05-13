import type { CSSProperties } from 'react'
import type { PlanTagColor } from '@/lib/types'

export interface PlanTagColorOption {
  key: PlanTagColor
  hex: string
}

export const PLAN_TAG_COLOR_OPTIONS: PlanTagColorOption[] = [
  { key: 'rose', hex: '#f6c1cb' },
  { key: 'coral', hex: '#f7c6bd' },
  { key: 'peach', hex: '#f8d4b1' },
  { key: 'apricot', hex: '#f8ddb0' },
  { key: 'amber', hex: '#f7dea1' },
  { key: 'gold', hex: '#efe0a6' },
  { key: 'lime', hex: '#e5edb3' },
  { key: 'mint', hex: '#d0ecd8' },
  { key: 'emerald', hex: '#c0e8d0' },
  { key: 'seafoam', hex: '#bbe9e2' },
  { key: 'teal', hex: '#b8e3e7' },
  { key: 'cyan', hex: '#c0e7f4' },
  { key: 'sky', hex: '#c2def5' },
  { key: 'blue', hex: '#c8d7f5' },
  { key: 'indigo', hex: '#cfd4f7' },
  { key: 'violet', hex: '#d9caf5' },
  { key: 'lavender', hex: '#e3d7f7' },
  { key: 'pink', hex: '#f3d0e6' },
  { key: 'sand', hex: '#ecdcc8' },
  { key: 'slate', hex: '#d8dde8' },
]

const PLAN_TAG_COLOR_MAP = new Map(
  PLAN_TAG_COLOR_OPTIONS.map((option) => [option.key, option])
)

function hexToRgba(hex: string, alpha: number): string {
  const normalizedHex = hex.replace('#', '')
  const isShort = normalizedHex.length === 3

  const parts = isShort
    ? normalizedHex.split('').map((part) => Number.parseInt(part + part, 16))
    : [
        Number.parseInt(normalizedHex.slice(0, 2), 16),
        Number.parseInt(normalizedHex.slice(2, 4), 16),
        Number.parseInt(normalizedHex.slice(4, 6), 16),
      ]

  return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`
}

export function getPlanTagColorOption(color?: PlanTagColor) {
  if (!color) {
    return undefined
  }

  return PLAN_TAG_COLOR_MAP.get(color)
}

export function getPlanTagColorStyle(color?: PlanTagColor): CSSProperties {
  const option = getPlanTagColorOption(color)

  if (!option) {
    return {}
  }

  return {
    backgroundColor: hexToRgba(option.hex, 0.14),
    borderColor: hexToRgba(option.hex, 0.28),
  }
}

export function getRandomPlanTagColor(): PlanTagColor {
  const randomIndex = Math.floor(Math.random() * PLAN_TAG_COLOR_OPTIONS.length)
  return PLAN_TAG_COLOR_OPTIONS[randomIndex]!.key
}