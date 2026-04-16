/**
 * Shared types and enums used across domains
 */

/**
 * Client status indicators based on adherence
 * - onTrack: >= 75% adherence
 * - warning: 50-75% adherence
 * - atRisk: < 50% adherence
 */
export enum ClientStatus {
  OnTrack = 'onTrack',
  Warning = 'warning',
  AtRisk = 'atRisk',
  Inactive = 'inactive',
}

/**
 * Trend direction
 */
export enum Trend {
  Up = 'up',
  Down = 'down',
  Neutral = 'neutral',
}

/**
 * Check-in status
 */
export enum CheckInStatus {
  Scheduled = 'scheduled',
  Completed = 'completed',
  Missed = 'missed',
}

/**
 * Plan item types
 */
export enum PlanItemType {
  Meal = 'meal',
  Task = 'task',
}

/**
 * Activity types for the feed
 */
export enum ActivityType {
  ClientAdded = 'client_added',
  PlanAssigned = 'plan_assigned',
  CheckInCompleted = 'checkin_completed',
  CheckInMissed = 'checkin_missed',
  NoteAdded = 'note_added',
  AdhererenceDrop = 'adherence_drop',
  PlanUpdated = 'plan_updated',
}

/**
 * Measurement types
 */
export type MeasurementType = 'waist' | 'hips' | 'chest' | 'thigh' | 'arm' | 'legs' | 'back';

/**
 * Sort direction
 */
export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Date range presets for dashboard/reports
 */
export enum DateRange {
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
  All = 'all',
}
