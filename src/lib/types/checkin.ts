/**
 * Check-in domain types
 * Tracks weight, measurements, and feedback
 */

import { CheckInStatus, MeasurementType } from './common';

/**
 * WeightEntry - A single weight measurement
 */
export interface WeightEntry {
  id: string;
  clientId: string;
  value: number;
  unit: 'kg' | 'lbs';
  recordedAt: Date;
  notes?: string;
}

/**
 * MeasurementEntry - A single body measurement
 * Records specific measurements (waist, hips, chest, etc)
 */
export interface MeasurementEntry {
  id: string;
  clientId: string;
  type: MeasurementType;
  value: number;
  unit: 'cm' | 'in';
  recordedAt: Date;
}

/**
 * CheckInData - The actual recorded data in a check-in
 */
export interface CheckInData {
  weight?: WeightEntry;
  measurements?: MeasurementEntry[];
  notes?: string;
}

/**
 * CheckIn - A completed check-in record
 * Stores weight, measurements, and professional feedback
 */
export interface CheckIn {
  id: string;
  clientId: string;
  scheduledDate: Date;
  completedAt: Date;
  data: CheckInData;
  professionalNotes?: string;
  status: Extract<CheckInStatus, 'completed'>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ScheduledCheckIn - A check-in that is scheduled but not yet completed
 * Can be missed or completed
 */
export interface ScheduledCheckIn {
  id: string;
  clientId: string;
  scheduledDate: Date;
  status: Exclude<CheckInStatus, 'completed'>;
  createdAt: Date;
  dueReminderSentAt?: Date;
}

/**
 * CheckInWithStatus - Union type for any check-in state
 */
export type CheckInWithStatus = CheckIn | ScheduledCheckIn;

/**
 * Input for scheduling a new check-in
 */
export interface ScheduleCheckInInput {
  clientId: string;
  scheduledDate: Date;
}

/**
 * Input for recording a completed check-in
 */
export interface CompleteCheckInInput {
  scheduledCheckInId: string;
  weight?: {
    value: number;
    unit: 'kg' | 'lbs';
  };
  measurements?: Array<{
    type: MeasurementType;
    value: number;
    unit: 'cm' | 'in';
  }>;
  notes?: string;
  professionalNotes?: string;
}

/**
 * CheckInHistory - Time-series check-in data
 * For analysis and charting
 */
export interface CheckInHistory {
  clientId: string;
  checkIns: CheckIn[];
  weightTrend?: {
    start: number;
    end: number;
    change: number;
    unit: 'kg' | 'lbs';
  };
}

