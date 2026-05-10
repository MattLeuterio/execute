/**
 * Mock adherence QA scenarios
 * Static fixtures to quickly validate FE rendering logic before API integration.
 */

import type { AdherenceDayDetail, DayOverviewItem } from "../types"

export interface MockAdherenceQaCase {
  id: string
  title: string
  day: DayOverviewItem
}

const qaBaseDate = new Date("2026-04-14T00:00:00")

export const MOCK_ADHERENCE_QA_OVERVIEW_CASES: MockAdherenceQaCase[] = [
  {
    id: "qa-completed-streak-multi-events",
    title: "Completed day in streak with all event icons",
    day: {
      date: qaBaseDate,
      plannedItems: 4,
      completedItems: 4,
      adherencePercentage: 100,
      isTracked: true,
      dayState: "completed",
      isPerfectDay: true,
      isInPerfectStreak: true,
      hasAnyCheck: true,
      hasComment: true,
      hasWeightCheck: true,
      hasMeasurementCheck: true,
    },
  },
  {
    id: "qa-partial",
    title: "Partial tracked day",
    day: {
      date: new Date("2026-04-13T00:00:00"),
      plannedItems: 4,
      completedItems: 2,
      adherencePercentage: 50,
      isTracked: true,
      dayState: "partial",
      isPerfectDay: false,
      isInPerfectStreak: false,
      hasAnyCheck: true,
      hasComment: false,
      hasWeightCheck: false,
      hasMeasurementCheck: false,
    },
  },
  {
    id: "qa-not-started",
    title: "Tracked but not started",
    day: {
      date: new Date("2026-04-12T00:00:00"),
      plannedItems: 3,
      completedItems: 0,
      adherencePercentage: 0,
      isTracked: true,
      dayState: "not_started",
      isPerfectDay: false,
      isInPerfectStreak: false,
      hasAnyCheck: false,
      hasComment: false,
      hasWeightCheck: false,
      hasMeasurementCheck: false,
    },
  },
  {
    id: "qa-not-tracked",
    title: "Planned but not tracked",
    day: {
      date: new Date("2026-04-11T00:00:00"),
      plannedItems: 5,
      completedItems: 0,
      adherencePercentage: null,
      isTracked: false,
      dayState: "not_tracked",
      isPerfectDay: false,
      isInPerfectStreak: false,
      hasAnyCheck: false,
      hasComment: false,
      hasWeightCheck: false,
      hasMeasurementCheck: false,
    },
  },
]

export const MOCK_ADHERENCE_QA_DAY_DETAIL: AdherenceDayDetail = {
  clientId: "qa-client",
  date: qaBaseDate,
  planId: "qa-plan",
  plannedItems: 4,
  completedItems: 4,
  adherencePercentage: 100,
  dayState: "completed",
  hasComment: true,
  hasWeightCheck: true,
  hasMeasurementCheck: true,
  notes: ["Commento di esempio QA"],
  weightValue: 71.2,
  measurementTypes: ["waist", "hips"],
  timeline: [
    {
      id: "qa-event-1",
      type: "adherence",
      at: new Date("2026-04-14T08:00:00"),
      label: "Aderenza registrata: 4/4",
    },
    {
      id: "qa-event-2",
      type: "weight_check",
      at: new Date("2026-04-14T08:10:00"),
      label: "Check peso: 71.2kg",
    },
    {
      id: "qa-event-3",
      type: "measurement_check",
      at: new Date("2026-04-14T08:12:00"),
      label: "Check misure: 2 voci registrate",
    },
    {
      id: "qa-event-4",
      type: "comment",
      at: new Date("2026-04-14T08:20:00"),
      label: "Commento check-in: energia ottima",
    },
  ],
}
