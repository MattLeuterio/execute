/**
 * Mock activity feed
 * Dashboard activity that tells the story of what's happening
 */

import { ActivityItem, ActivityType, ActivityFilter } from '../types';

export const MOCK_ACTIVITY_FEED: ActivityItem[] = [
  // ========================================================================
  // RECENT ACTIVITIES (most recent first)
  // ========================================================================

  // April 14
  {
    id: 'act-001',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-marco-010', clientId: 'client-marco', weight: 76.3 },
    description: 'Marco Rossi completed check-in: 76.3 kg',
    clientName: 'Marco Rossi',
    clientId: 'client-marco',
    timestamp: new Date('2026-04-14T09:30:00'),
    metadata: { fromValue: 76.5, toValue: 76.3, change: -0.2 },
    isRead: false,
    severity: 'info',
  },
  {
    id: 'act-002',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-francesca-009', clientId: 'client-francesca', weight: 61.8 },
    description: 'Francesca Conti completed check-in: 61.8 kg (maintaining)',
    clientName: 'Francesca Conti',
    clientId: 'client-francesca',
    timestamp: new Date('2026-04-14T11:45:00'),
    metadata: { fromValue: 62.0, toValue: 61.8, change: -0.2 },
    isRead: false,
    severity: 'info',
  },
  {
    id: 'act-003',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-giulia-011', clientId: 'client-giulia', weight: 69.8 },
    description: 'Giulia Bianchi completed check-in: 69.8 kg',
    clientName: 'Giulia Bianchi',
    clientId: 'client-giulia',
    timestamp: new Date('2026-04-13T14:15:00'),
    metadata: { fromValue: 69.5, toValue: 69.8, change: 0.3 },
    isRead: false,
    severity: 'info',
  },
  {
    id: 'act-004',
    type: ActivityType.AdhererenceDrop,
    entity: { type: 'adherence', clientId: 'client-giulia', date: new Date('2026-04-13') },
    description: 'Giulia Bianchi adherence dropped to 62% (was 88% last week)',
    clientName: 'Giulia Bianchi',
    clientId: 'client-giulia',
    timestamp: new Date('2026-04-13T09:00:00'),
    metadata: { fromValue: 88, toValue: 62, change: -26 },
    isRead: false,
    severity: 'alert',
  },
  {
    id: 'act-005',
    type: ActivityType.NoteAdded,
    entity: { type: 'note', id: 'note-elena-001', clientId: 'client-elena' },
    description: 'Added note to Elena De Luca: "New client, habit building phase"',
    clientName: 'Elena De Luca',
    clientId: 'client-elena',
    timestamp: new Date('2026-04-13T10:30:00'),
    metadata: {},
    isRead: false,
    severity: 'info',
  },
  {
    id: 'act-006',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-davide-009', clientId: 'client-davide', weight: 79.5 },
    description: 'Davide Moretti completed check-in: 79.5 kg (down 2.8 kg)',
    clientName: 'Davide Moretti',
    clientId: 'client-davide',
    timestamp: new Date('2026-04-12T16:20:00'),
    metadata: { fromValue: 82.3, toValue: 79.5, change: -2.8 },
    isRead: false,
    severity: 'info',
  },
  {
    id: 'act-007',
    type: ActivityType.AdhererenceDrop,
    entity: { type: 'adherence', clientId: 'client-alessandro', date: new Date('2026-04-12') },
    description: 'Alessandro Fermi adherence at risk: 31% (no improvement in 2 weeks)',
    clientName: 'Alessandro Fermi',
    clientId: 'client-alessandro',
    timestamp: new Date('2026-04-12T10:00:00'),
    metadata: { change: 0 },
    isRead: false,
    severity: 'alert',
  },
  {
    id: 'act-008',
    type: ActivityType.CheckInMissed,
    entity: { type: 'checkin', id: 'sci-alessandro-003', clientId: 'client-alessandro' },
    description: 'Alessandro Fermi missed scheduled check-in (Apr 10)',
    clientName: 'Alessandro Fermi',
    clientId: 'client-alessandro',
    timestamp: new Date('2026-04-10T18:00:00'),
    metadata: {},
    isRead: true,
    severity: 'warning',
  },
  {
    id: 'act-009',
    type: ActivityType.CheckInMissed,
    entity: { type: 'checkin', id: 'sci-giulia-010', clientId: 'client-giulia' },
    description: 'Giulia Bianchi missed scheduled check-in (Apr 6)',
    clientName: 'Giulia Bianchi',
    clientId: 'client-giulia',
    timestamp: new Date('2026-04-06T20:00:00'),
    metadata: {},
    isRead: true,
    severity: 'warning',
  },
  {
    id: 'act-010',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-marco-006', clientId: 'client-marco', weight: 76.6 },
    description: 'Marco Rossi completed check-in: 76.6 kg',
    clientName: 'Marco Rossi',
    clientId: 'client-marco',
    timestamp: new Date('2026-04-05T09:15:00'),
    metadata: { fromValue: 76.9, toValue: 76.6, change: -0.3 },
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-011',
    type: ActivityType.CheckInMissed,
    entity: { type: 'checkin', id: 'sci-alessandro-002', clientId: 'client-alessandro' },
    description: 'Alessandro Fermi missed scheduled check-in (Apr 3)',
    clientName: 'Alessandro Fermi',
    clientId: 'client-alessandro',
    timestamp: new Date('2026-04-03T20:00:00'),
    metadata: {},
    isRead: true,
    severity: 'warning',
  },
  {
    id: 'act-012',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-marco-008', clientId: 'client-marco', weight: 76.3 },
    description: 'Marco Rossi completed check-in: 76.3 kg',
    clientName: 'Marco Rossi',
    clientId: 'client-marco',
    timestamp: new Date('2026-03-29T09:00:00'),
    metadata: { fromValue: 76.4, toValue: 76.3 },
    isRead: true,
    severity: 'info',
  },

  // March 28
  {
    id: 'act-013',
    type: ActivityType.ClientAdded,
    entity: { type: 'client', id: 'client-elena', name: 'Elena De Luca' },
    description: 'Added new client: Elena De Luca (baseline 74.2 kg)',
    clientName: 'Elena De Luca',
    clientId: 'client-elena',
    timestamp: new Date('2026-03-28T13:30:00'),
    metadata: {},
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-014',
    type: ActivityType.PlanAssigned,
    entity: { type: 'plan', id: 'plan-francesca-maintenance', name: 'Piano Mantenimento Premium', clientId: 'client-francesca' },
    description: 'Assigned new plan to Francesca Conti: Piano Mantenimento Premium',
    clientName: 'Francesca Conti',
    clientId: 'client-francesca',
    timestamp: new Date('2026-03-15T10:00:00'),
    metadata: {},
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-015',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-davide-004', clientId: 'client-davide', weight: 80.5 },
    description: 'Davide Moretti completed check-in: 80.5 kg',
    clientName: 'Davide Moretti',
    clientId: 'client-davide',
    timestamp: new Date('2026-03-01T11:00:00'),
    metadata: { fromValue: 81.8, toValue: 80.5, change: -1.3 },
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-016',
    type: ActivityType.PlanAssigned,
    entity: { type: 'plan', id: 'plan-davide-standard', name: 'Piano Standard Protein+', clientId: 'client-davide' },
    description: 'Assigned new plan to Davide Moretti: Piano Standard Protein+',
    clientName: 'Davide Moretti',
    clientId: 'client-davide',
    timestamp: new Date('2026-02-22T14:15:00'),
    metadata: {},
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-017',
    type: ActivityType.ClientAdded,
    entity: { type: 'client', id: 'client-francesca', name: 'Francesca Conti' },
    description: 'Added new client: Francesca Conti (baseline 62.1 kg)',
    clientName: 'Francesca Conti',
    clientId: 'client-francesca',
    timestamp: new Date('2026-02-15T09:30:00'),
    metadata: {},
    isRead: true,
    severity: 'info',
  },
  {
    id: 'act-018',
    type: ActivityType.CheckInCompleted,
    entity: { type: 'checkin', id: 'ci-marco-002', clientId: 'client-marco', weight: 77.8 },
    description: 'Marco Rossi completed check-in: 77.8 kg (good start)',
    clientName: 'Marco Rossi',
    clientId: 'client-marco',
    timestamp: new Date('2026-02-08T10:00:00'),
    metadata: { fromValue: 78.0, toValue: 77.8, change: -0.2 },
    isRead: true,
    severity: 'info',
  },

  // February 01
  {
    id: 'act-019',
    type: ActivityType.ClientAdded,
    entity: { type: 'client', id: 'client-marco', name: 'Marco Rossi' },
    description: 'Added new client: Marco Rossi (baseline 78 kg)',
    clientName: 'Marco Rossi',
    clientId: 'client-marco',
    timestamp: new Date('2026-02-01T08:00:00'),
    metadata: {},
    isRead: true,
    severity: 'info',
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getActivityFeed(filter?: ActivityFilter, limit: number = 20): ActivityItem[] {
  let filtered = [...MOCK_ACTIVITY_FEED];

  if (filter?.types && filter.types.length > 0) {
    filtered = filtered.filter((item) => filter.types!.includes(item.type));
  }

  if (filter?.severity) {
    filtered = filtered.filter((item) => item.severity === filter.severity);
  }

  if (filter?.clientId) {
    filtered = filtered.filter((item) => {
      const entity = item.entity as Record<string, unknown>;
      return entity.clientId === filter.clientId;
    });
  }

  if (filter?.unreadOnly) {
    filtered = filtered.filter((item) => !item.isRead);
  }

  if (filter?.dateRange) {
    filtered = filtered.filter(
      (item) => item.timestamp >= filter.dateRange!.from && item.timestamp <= filter.dateRange!.to,
    );
  }

  return filtered.slice(0, limit);
}

export function getUnreadActivityCount(): number {
  return MOCK_ACTIVITY_FEED.filter((item) => !item.isRead).length;
}

export function getAlertActivities(): ActivityItem[] {
  return MOCK_ACTIVITY_FEED.filter((item) => item.severity === 'alert');
}

export function getRecentActivityByType(type: ActivityType, limit: number = 5): ActivityItem[] {
  return MOCK_ACTIVITY_FEED
    .filter((item) => item.type === type)
    .slice(0, limit);
}
