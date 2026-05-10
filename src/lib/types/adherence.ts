/**
 * Adherence domain types
 * Tracks daily plan execution and completion
 */

import { MeasurementType, Trend } from './common';

/**
 * AdherenceEntry - Single day's adherence record
 * Tracks how well a client followed their plan on a specific day
 */
export interface AdherenceEntry {
  id: string;
  clientId: string;
  planId: string;
  date: Date;
  completedItems: number;
  totalItems: number;
  adherencePercentage: number; // 0-100
  notStarted: boolean;
  notes?: string;
  recordedAt: Date;
}

/**
 * AdherenceTrend - Compares adherence between periods
 * Used to show if client is improving or declining
 */
export interface AdherenceTrend {
  current: number; // This period (e.g., this week)
  previous: number; // Last period (e.g., last week)
  direction: Trend;
  percentageChange: number; // e.g., +5, -10
}

/**
 * AdherenceSummary - Overview for a specific period
 */
export interface AdherenceSummary {
  clientId: string;
  period: 'week' | 'month' | 'all';
  startDate: Date;
  endDate: Date;
  averageAdherence: number;
  trend: AdherenceTrend;
  bestDay?: Date;
  worstDay?: Date;
  consecutivePerfectDays: number;
  daysTracked: number;
  daysNotTracked: number;
}

/**
 * AdherenceHistory - Time-series adherence data
 * For charting and trend analysis
 */
export interface AdherenceHistory {
  clientId: string;
  entries: AdherenceEntry[];
  summary: AdherenceSummary;
}

/**
 * Overview period selector for client detail adherence panels
 */
export type AdherenceOverviewPeriod = 'week' | 'month';

/**
 * Month window strategy for mock and future API alignment
 * - calendar: from first to last day of anchor month
 * - rolling30: last 30 days from anchor date
 */
export type AdherenceMonthWindowStrategy = 'calendar' | 'rolling30';

/**
 * Available day visualization modes in client detail
 */
export type AdherenceOverviewView = 'calendar' | 'chart';

/**
 * Daily adherence state used by the overview and day detail
 */
export type AdherenceDayState = 'completed' | 'partial' | 'not_started' | 'not_tracked';

/**
 * Aggregated day item for weekly/monthly adherence overview
 */
export interface DayOverviewItem {
  date: Date;
  plannedItems: number;
  completedItems: number;
  adherencePercentage: number | null;
  isTracked: boolean;
  dayState: AdherenceDayState;
  isPerfectDay: boolean;
  isInPerfectStreak: boolean;
  hasAnyCheck: boolean;
  hasComment: boolean;
  hasWeightCheck: boolean;
  hasMeasurementCheck: boolean;
  commentCount: number;
  measurementTypes: MeasurementType[];
  weightValue?: number;
  weightUnit?: 'kg' | 'lbs';
  streakLengthAtDay: number;
}

/**
 * Overview metrics for selected period
 */
export interface DayOverviewSummary {
  periodAdherence: number | null;
  trackingCoverage: number;
  currentStreak: number;
  bestStreak: number;
  trackedDays: number;
  plannedDays: number;
}

/**
 * Overview payload for client detail panel
 */
export interface AdherenceOverview {
  clientId: string;
  periodType: AdherenceOverviewPeriod;
  viewType: AdherenceOverviewView;
  monthWindowStrategy: AdherenceMonthWindowStrategy;
  startDate: Date;
  endDate: Date;
  days: DayOverviewItem[];
  summary: DayOverviewSummary;
}

/**
 * Timeline event type for day detail screen
 */
export type DayDetailEventType = 'adherence' | 'weight_check' | 'measurement_check' | 'comment';

/**
 * Generic timeline event in day detail
 */
export interface DayDetailEvent {
  id: string;
  type: DayDetailEventType;
  at: Date;
  label: string;
}

/**
 * Detailed day payload for drill-down screen
 */
export interface AdherenceDayDetail {
  clientId: string;
  date: Date;
  planId?: string;
  plannedItems: number;
  completedItems: number;
  adherencePercentage: number | null;
  dayState: AdherenceDayState;
  hasComment: boolean;
  hasWeightCheck: boolean;
  hasMeasurementCheck: boolean;
  notes: string[];
  weightValue?: number;
  measurementTypes: MeasurementType[];
  timeline: DayDetailEvent[];
}

