export type AdherencePoint = {
  label: string
  value: number
}

export type WeightPoint = {
  label: string
  value: number
}

export type MeasurementsPoint = {
  label: string
  waist: number
  hips: number
  chest: number
}

export const adherenceData: AdherencePoint[] = [
  { label: "W1", value: 62 },
  { label: "W2", value: 66 },
  { label: "W3", value: 71 },
  { label: "W4", value: 69 },
  { label: "W5", value: 74 },
  { label: "W6", value: 78 },
]

export const weightData: WeightPoint[] = [
  { label: "W1", value: 78.6 },
  { label: "W2", value: 78.1 },
  { label: "W3", value: 77.9 },
  { label: "W4", value: 77.4 },
  { label: "W5", value: 77.1 },
  { label: "W6", value: 76.8 },
]

export const measurementsData: MeasurementsPoint[] = [
  { label: "W1", waist: 86, hips: 98, chest: 94 },
  { label: "W2", waist: 85.6, hips: 97.8, chest: 93.8 },
  { label: "W3", waist: 85.2, hips: 97.4, chest: 93.5 },
  { label: "W4", waist: 84.7, hips: 97.1, chest: 93.2 },
  { label: "W5", waist: 84.3, hips: 96.9, chest: 93 },
  { label: "W6", waist: 84, hips: 96.5, chest: 92.8 },
]

export function localizeWeekLabels<T extends { label: string }>(data: T[], weekPointPrefix: string): T[] {
  return data.map((item) => ({
    ...item,
    label: `${weekPointPrefix}${item.label.replace(/^\D+/, "")}`,
  }))
}

export function formatTooltipWeekLabel(label: string | number, tooltipLabelPrefix: string) {
  const value = String(label)
  const weekNumber = value.replace(/^\D+/, "")

  return weekNumber ? `${tooltipLabelPrefix} ${weekNumber}` : `${tooltipLabelPrefix} ${value}`
}