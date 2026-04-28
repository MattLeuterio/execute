import type { MeasurementType } from "@/lib/types"

export interface MeasurementDefinition {
  key: MeasurementType
  i18nKey: MeasurementType
  defaultInChart: boolean
  legacy?: boolean
}

export const MEASUREMENT_DEFINITIONS: readonly MeasurementDefinition[] = [
  { key: "waist", i18nKey: "waist", defaultInChart: true },
  { key: "abdomen", i18nKey: "abdomen", defaultInChart: true },
  { key: "hips", i18nKey: "hips", defaultInChart: true },
  { key: "chest", i18nKey: "chest", defaultInChart: true },
  { key: "arm", i18nKey: "arm", defaultInChart: true },
  { key: "forearm", i18nKey: "forearm", defaultInChart: true },
  { key: "wrist", i18nKey: "wrist", defaultInChart: true },
  { key: "thighProximal", i18nKey: "thighProximal", defaultInChart: true },
  { key: "thighMiddle", i18nKey: "thighMiddle", defaultInChart: true },
  { key: "thighDistal", i18nKey: "thighDistal", defaultInChart: true },
  { key: "calf", i18nKey: "calf", defaultInChart: true },
  { key: "shin", i18nKey: "shin", defaultInChart: true },
  { key: "back", i18nKey: "back", defaultInChart: true },
  { key: "thigh", i18nKey: "thigh", defaultInChart: false, legacy: true },
  { key: "legs", i18nKey: "legs", defaultInChart: false, legacy: true },
] as const

export const MEASUREMENT_CHART_KEYS = MEASUREMENT_DEFINITIONS.map((item) => item.key)

export type MeasurementChartKey = (typeof MEASUREMENT_CHART_KEYS)[number]

export function isMeasurementChartKey(value: string): value is MeasurementChartKey {
  return MEASUREMENT_CHART_KEYS.includes(value as MeasurementChartKey)
}
