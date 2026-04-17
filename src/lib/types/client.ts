/**
 * Client domain types
 * Core entity representing a nutritionist's client
 */

import { ClientStatus } from './common';

/**
 * Core Client aggregate
 * Contains all persistent client data
 */
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  currentPlanId?: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
}

/**
 * ClientSummary - Quick overview for list/table views
 * Shows key metrics at a glance
 */
export interface ClientSummary {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: ClientStatus;
  adherencePercentage: number; // 0-100
  latestWeight?: number;
  weightUnit: 'kg' | 'lbs';
  latestCheckInDate?: Date;
  consecutiveDaysOnTrack: number;
  hasActivePlan: boolean;
  lastActivityDate: Date;
}

/**
 * ClientDetail - Comprehensive view for detail page
 * Includes all data needed for the client dashboard
 */
export interface ClientDetail {
  // Base client info
  id: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  
  // Status & metrics
  status: ClientStatus;
  weeklyAdherence: number; // 0-100
  weeklyAdherenceTrend: 'up' | 'down' | 'neutral';
  consecutiveDaysOnTrack: number;
  
  // Plan
  currentPlan?: {
    id: string;
    name: string;
    startDate: Date;
  };
  
  // Latest measurements
  latestWeight?: {
    value: number;
    date: Date;
    unit: 'kg' | 'lbs';
  };
  
  latestMeasurements?: {
    date: Date;
    values: Record<string, number>; // waist, hips, chest, etc
  };
  
  // Check-in history
  lastCheckInDate?: Date;
  nextScheduledCheckInDate?: Date;
  
  // Notes
  lastNoteDate?: Date;
  lastNotePreview?: string;
  
  // Metadata
  updatedAt: Date;
}

/**
 * Input for creating a new client
 */
export interface CreateClientInput {
  name: string;
  email?: string;
  phone?: string;
}

/**
 * Input for updating client info
 */
export interface UpdateClientInput {
  name?: string;
  email?: string;
  phone?: string;
}
