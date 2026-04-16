/**
 * Plan domain types
 * Nutrition plans assigned to clients
 */

import { PlanItemType } from './common';

/**
 * PlanItem - A single meal or task in a daily plan
 */
export interface PlanItem {
  id: string;
  type: PlanItemType;
  name: string;
  description?: string;
  notes?: string;
  order: number; // Position in the day
}

/**
 * DailyPlan - All items for a specific day of week
 */
export interface DailyPlan {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  items: PlanItem[];
  notes?: string;
}

/**
 * WeeklySchedule - The 7-day plan template
 * Repeats for the duration of the plan
 */
export interface WeeklySchedule {
  days: DailyPlan[];
}

/**
 * Plan - Complete nutrition plan
 */
export interface Plan {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  weeklySchedule: WeeklySchedule;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  professionalNotes?: string;
}

/**
 * Input for creating a new plan
 */
export interface CreatePlanInput {
  clientId: string;
  name: string;
  description?: string;
  weeklySchedule: WeeklySchedule;
  startDate: Date;
  endDate?: Date;
  professionalNotes?: string;
}

/**
 * Input for updating an existing plan
 */
export interface UpdatePlanInput {
  name?: string;
  description?: string;
  weeklySchedule?: WeeklySchedule;
  endDate?: Date;
  isActive?: boolean;
  professionalNotes?: string;
}

