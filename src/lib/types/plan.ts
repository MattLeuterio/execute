/**
 * Plan domain types
 * Nutrition plans and assignments
 */

import { PlanItemType } from './common';

export type PlanStatus = 'draft' | 'published' | 'archived';

export type PlanAssignmentStatus = 'active' | 'ended' | 'cancelled';

export type PlanTagColor =
  | 'rose'
  | 'coral'
  | 'peach'
  | 'apricot'
  | 'amber'
  | 'gold'
  | 'lime'
  | 'mint'
  | 'emerald'
  | 'seafoam'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'lavender'
  | 'pink'
  | 'sand'
  | 'slate';

export interface PlanDocumentNode {
  type: string;
  attrs?: Record<string, unknown>;
  text?: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, unknown>;
  }>;
  content?: PlanDocumentNode[];
}

export interface PlanDocument {
  type: 'doc';
  version: number;
  content: PlanDocumentNode[];
}

export interface PlanTag {
  id: string;
  nutritionistId: string;
  name: string;
  slug: string;
  color?: PlanTagColor;
  createdAt: Date;
  updatedAt: Date;
}

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
 * Plan - Reusable plan template owned by a nutritionist
 */
export interface Plan {
  id: string;
  nutritionistId: string;
  name: string;
  description?: string;
  summary?: string;
  status: PlanStatus;
  contentJson: PlanDocument;
  contentText?: string;
  tags: PlanTag[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  archivedAt?: Date;
  lastEditedBy?: string;
  version: number;

  // Temporary compatibility while UI still renders the old weekly plan card.
  weeklySchedule?: WeeklySchedule;
  professionalNotes?: string;
}

export interface PlanAssignment {
  id: string;
  planId: string;
  clientId: string;
  nutritionistId: string;
  status: PlanAssignmentStatus;
  assignedAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  unassignedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignedPlan extends Plan {
  assignment: PlanAssignment;

  // Temporary compatibility fields for the current UI.
  clientId: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

/**
 * Input for creating a new plan
 */
export interface CreatePlanInput {
  nutritionistId: string;
  name: string;
  description?: string;
  summary?: string;
  contentJson: PlanDocument;
  contentText?: string;
  tags?: string[];
  status?: PlanStatus;

  // Temporary compatibility while the app still uses legacy plan cards.
  weeklySchedule?: WeeklySchedule;
  professionalNotes?: string;
}

/**
 * Input for updating an existing plan
 */
export interface UpdatePlanInput {
  name?: string;
  description?: string;
  summary?: string;
  contentJson?: PlanDocument;
  contentText?: string;
  status?: PlanStatus;
  tags?: string[];
  weeklySchedule?: WeeklySchedule;
  publishedAt?: Date;
  archivedAt?: Date;
  professionalNotes?: string;
}

export interface AssignPlanInput {
  planId: string;
  clientId: string;
  nutritionistId: string;
  assignedAt?: Date;
  startedAt?: Date;
}

