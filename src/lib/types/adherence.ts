/**
 * Adherence domain types
 * Tracks daily plan execution and completion
 */

import { Trend } from './common';

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

