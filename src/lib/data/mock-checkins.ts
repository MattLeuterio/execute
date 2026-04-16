/**
 * Mock check-in data
 * Realistic weight and measurement history for all clients
 * 
 * Check-ins typically weekly for committed clients, irregular for less committed
 */

import { CheckIn, ScheduledCheckIn, WeightEntry, MeasurementEntry, CheckInStatus, MeasurementType } from '../types';

// ============================================================================
// WEIGHT ENTRIES
// ============================================================================

export const MOCK_WEIGHT_ENTRIES: WeightEntry[] = [
  // ========================================================================
  // MARCO ROSSI - Consistent weight loss (78kg → 76.3kg in 2.5 months, -1.7kg)
  // ========================================================================
  { id: 'we-marco-001', clientId: 'client-marco', value: 78.0, unit: 'kg', recordedAt: new Date('2026-02-01') },
  { id: 'we-marco-002', clientId: 'client-marco', value: 77.8, unit: 'kg', recordedAt: new Date('2026-02-08') },
  { id: 'we-marco-003', clientId: 'client-marco', value: 77.5, unit: 'kg', recordedAt: new Date('2026-02-15') },
  { id: 'we-marco-004', clientId: 'client-marco', value: 77.2, unit: 'kg', recordedAt: new Date('2026-02-22') },
  { id: 'we-marco-005', clientId: 'client-marco', value: 76.9, unit: 'kg', recordedAt: new Date('2026-03-01') },
  { id: 'we-marco-006', clientId: 'client-marco', value: 76.6, unit: 'kg', recordedAt: new Date('2026-03-08') },
  { id: 'we-marco-007', clientId: 'client-marco', value: 76.4, unit: 'kg', recordedAt: new Date('2026-03-15') },
  { id: 'we-marco-008', clientId: 'client-marco', value: 76.3, unit: 'kg', recordedAt: new Date('2026-03-22') },
  { id: 'we-marco-009', clientId: 'client-marco', value: 76.3, unit: 'kg', recordedAt: new Date('2026-03-29') },
  { id: 'we-marco-010', clientId: 'client-marco', value: 76.3, unit: 'kg', recordedAt: new Date('2026-04-05') },
  { id: 'we-marco-011', clientId: 'client-marco', value: 76.3, unit: 'kg', recordedAt: new Date('2026-04-14') },

  // ========================================================================
  // GIULIA BIANCHI - Minimal progress, slight gain (67kg → 69.8kg)
  // Lost 1kg then gained 2.8kg back
  // ========================================================================
  { id: 'we-giulia-001', clientId: 'client-giulia', value: 67.0, unit: 'kg', recordedAt: new Date('2026-01-15') },
  { id: 'we-giulia-002', clientId: 'client-giulia', value: 66.8, unit: 'kg', recordedAt: new Date('2026-01-22') },
  { id: 'we-giulia-003', clientId: 'client-giulia', value: 66.5, unit: 'kg', recordedAt: new Date('2026-01-29') },
  { id: 'we-giulia-004', clientId: 'client-giulia', value: 66.8, unit: 'kg', recordedAt: new Date('2026-02-05') },
  { id: 'we-giulia-005', clientId: 'client-giulia', value: 67.1, unit: 'kg', recordedAt: new Date('2026-02-12') },
  { id: 'we-giulia-006', clientId: 'client-giulia', value: 67.5, unit: 'kg', recordedAt: new Date('2026-02-19') },
  { id: 'we-giulia-007', clientId: 'client-giulia', value: 68.0, unit: 'kg', recordedAt: new Date('2026-02-26') },
  { id: 'we-giulia-008', clientId: 'client-giulia', value: 68.5, unit: 'kg', recordedAt: new Date('2026-03-05') },
  { id: 'we-giulia-009', clientId: 'client-giulia', value: 69.2, unit: 'kg', recordedAt: new Date('2026-03-12') },
  { id: 'we-giulia-010', clientId: 'client-giulia', value: 69.5, unit: 'kg', recordedAt: new Date('2026-03-19') },
  { id: 'we-giulia-011', clientId: 'client-giulia', value: 69.8, unit: 'kg', recordedAt: new Date('2026-04-13') },

  // ========================================================================
  // ALESSANDRO FERMI - No progress, stagnant (85-86kg flat line)
  // ========================================================================
  { id: 'we-alex-001', clientId: 'client-alessandro', value: 86.0, unit: 'kg', recordedAt: new Date('2026-03-10') },
  { id: 'we-alex-002', clientId: 'client-alessandro', value: 86.1, unit: 'kg', recordedAt: new Date('2026-03-17') },
  { id: 'we-alex-003', clientId: 'client-alessandro', value: 86.0, unit: 'kg', recordedAt: new Date('2026-03-24') },
  { id: 'we-alex-004', clientId: 'client-alessandro', value: 86.2, unit: 'kg', recordedAt: new Date('2026-04-10') },

  // ========================================================================
  // FRANCESCA CONTI - Maintaining weight (62kg stable)
  // ========================================================================
  { id: 'we-francesca-001', clientId: 'client-francesca', value: 62.1, unit: 'kg', recordedAt: new Date('2026-02-15') },
  { id: 'we-francesca-002', clientId: 'client-francesca', value: 62.0, unit: 'kg', recordedAt: new Date('2026-02-22') },
  { id: 'we-francesca-003', clientId: 'client-francesca', value: 62.2, unit: 'kg', recordedAt: new Date('2026-03-01') },
  { id: 'we-francesca-004', clientId: 'client-francesca', value: 61.9, unit: 'kg', recordedAt: new Date('2026-03-08') },
  { id: 'we-francesca-005', clientId: 'client-francesca', value: 62.0, unit: 'kg', recordedAt: new Date('2026-03-15') },
  { id: 'we-francesca-006', clientId: 'client-francesca', value: 62.1, unit: 'kg', recordedAt: new Date('2026-03-22') },
  { id: 'we-francesca-007', clientId: 'client-francesca', value: 61.9, unit: 'kg', recordedAt: new Date('2026-03-29') },
  { id: 'we-francesca-008', clientId: 'client-francesca', value: 62.0, unit: 'kg', recordedAt: new Date('2026-04-05') },
  { id: 'we-francesca-009', clientId: 'client-francesca', value: 61.8, unit: 'kg', recordedAt: new Date('2026-04-14') },

  // ========================================================================
  // DAVIDE MORETTI - Good weight loss (82.3kg → 79.5kg, -2.8kg)
  // ========================================================================
  { id: 'we-davide-001', clientId: 'client-davide', value: 82.3, unit: 'kg', recordedAt: new Date('2026-01-10') },
  { id: 'we-davide-002', clientId: 'client-davide', value: 82.1, unit: 'kg', recordedAt: new Date('2026-01-24') },
  { id: 'we-davide-003', clientId: 'client-davide', value: 81.9, unit: 'kg', recordedAt: new Date('2026-02-07') },
  { id: 'we-davide-004', clientId: 'client-davide', value: 81.8, unit: 'kg', recordedAt: new Date('2026-02-22') },
  { id: 'we-davide-005', clientId: 'client-davide', value: 80.5, unit: 'kg', recordedAt: new Date('2026-03-01') },
  { id: 'we-davide-006', clientId: 'client-davide', value: 80.1, unit: 'kg', recordedAt: new Date('2026-03-08') },
  { id: 'we-davide-007', clientId: 'client-davide', value: 79.8, unit: 'kg', recordedAt: new Date('2026-03-15') },
  { id: 'we-davide-008', clientId: 'client-davide', value: 79.6, unit: 'kg', recordedAt: new Date('2026-03-29') },
  { id: 'we-davide-009', clientId: 'client-davide', value: 79.5, unit: 'kg', recordedAt: new Date('2026-04-12') },

  // ========================================================================
  // ELENA DE LUCA - Baseline only (just started)
  // ========================================================================
  { id: 'we-elena-001', clientId: 'client-elena', value: 74.2, unit: 'kg', recordedAt: new Date('2026-03-28') },
];

// ============================================================================
// MEASUREMENT ENTRIES
// ============================================================================

export const MOCK_MEASUREMENT_ENTRIES: MeasurementEntry[] = [
  // Marco Rossi - measurements correlate with weight loss
  { id: 'me-marco-001', clientId: 'client-marco', type: 'waist', value: 85, unit: 'cm', recordedAt: new Date('2026-02-01') },
  { id: 'me-marco-002', clientId: 'client-marco', type: 'waist', value: 84, unit: 'cm', recordedAt: new Date('2026-02-15') },
  { id: 'me-marco-003', clientId: 'client-marco', type: 'waist', value: 83, unit: 'cm', recordedAt: new Date('2026-03-01') },
  { id: 'me-marco-004', clientId: 'client-marco', type: 'waist', value: 82, unit: 'cm', recordedAt: new Date('2026-04-14') },
  { id: 'me-marco-005', clientId: 'client-marco', type: 'hips', value: 97, unit: 'cm', recordedAt: new Date('2026-02-01') },
  { id: 'me-marco-006', clientId: 'client-marco', type: 'hips', value: 96, unit: 'cm', recordedAt: new Date('2026-02-15') },
  { id: 'me-marco-007', clientId: 'client-marco', type: 'hips', value: 95, unit: 'cm', recordedAt: new Date('2026-03-01') },
  { id: 'me-marco-008', clientId: 'client-marco', type: 'hips', value: 94, unit: 'cm', recordedAt: new Date('2026-04-14') },
  { id: 'me-marco-009', clientId: 'client-marco', type: 'chest', value: 100, unit: 'cm', recordedAt: new Date('2026-02-01') },
  { id: 'me-marco-010', clientId: 'client-marco', type: 'chest', value: 99, unit: 'cm', recordedAt: new Date('2026-04-14') },

  // Giulia Bianchi - minimal measurement change
  { id: 'me-giulia-001', clientId: 'client-giulia', type: 'waist', value: 76, unit: 'cm', recordedAt: new Date('2026-01-15') },
  { id: 'me-giulia-002', clientId: 'client-giulia', type: 'waist', value: 76, unit: 'cm', recordedAt: new Date('2026-04-13') },
  { id: 'me-giulia-003', clientId: 'client-giulia', type: 'hips', value: 90, unit: 'cm', recordedAt: new Date('2026-01-15') },
  { id: 'me-giulia-004', clientId: 'client-giulia', type: 'hips', value: 89, unit: 'cm', recordedAt: new Date('2026-04-13') },

  // Francesca Conti - stable measurements (maintaining)
  { id: 'me-francesca-001', clientId: 'client-francesca', type: 'waist', value: 64, unit: 'cm', recordedAt: new Date('2026-02-15') },
  { id: 'me-francesca-002', clientId: 'client-francesca', type: 'waist', value: 64, unit: 'cm', recordedAt: new Date('2026-04-14') },
  { id: 'me-francesca-003', clientId: 'client-francesca', type: 'hips', value: 82, unit: 'cm', recordedAt: new Date('2026-02-15') },
  { id: 'me-francesca-004', clientId: 'client-francesca', type: 'hips', value: 82, unit: 'cm', recordedAt: new Date('2026-04-14') },
  { id: 'me-francesca-005', clientId: 'client-francesca', type: 'chest', value: 88, unit: 'cm', recordedAt: new Date('2026-02-15') },
  { id: 'me-francesca-006', clientId: 'client-francesca', type: 'chest', value: 88, unit: 'cm', recordedAt: new Date('2026-04-14') },

  // Davide Moretti - measurements improving with weight loss
  { id: 'me-davide-001', clientId: 'client-davide', type: 'waist', value: 91, unit: 'cm', recordedAt: new Date('2026-01-10') },
  { id: 'me-davide-002', clientId: 'client-davide', type: 'waist', value: 89, unit: 'cm', recordedAt: new Date('2026-04-12') },
  { id: 'me-davide-003', clientId: 'client-davide', type: 'hips', value: 99, unit: 'cm', recordedAt: new Date('2026-01-10') },
  { id: 'me-davide-004', clientId: 'client-davide', type: 'hips', value: 96, unit: 'cm', recordedAt: new Date('2026-04-12') },
];

// ============================================================================
// COMPLETED CHECK-INS
// ============================================================================

export const MOCK_COMPLETED_CHECKINS: CheckIn[] = [
  // Marco - weekly check-ins, very good adherence
  {
    id: 'ci-marco-001',
    clientId: 'client-marco',
    scheduledDate: new Date('2026-02-01'),
    completedAt: new Date('2026-02-01T09:15:00'),
    data: {
      weight: { id: 'we-marco-001', clientId: 'client-marco', value: 78.0, unit: 'kg', recordedAt: new Date('2026-02-01') },
      measurements: [
        { id: 'me-marco-001', clientId: 'client-marco', type: 'waist', value: 85, unit: 'cm', recordedAt: new Date('2026-02-01') },
        { id: 'me-marco-005', clientId: 'client-marco', type: 'hips', value: 97, unit: 'cm', recordedAt: new Date('2026-02-01') },
      ],
      notes: 'Inizia bene, motivato',
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'Marco molto motivato. Peso di partenza 78kg. Let\'s track weekly.',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
  },
  {
    id: 'ci-marco-002',
    clientId: 'client-marco',
    scheduledDate: new Date('2026-02-08'),
    completedAt: new Date('2026-02-08T10:00:00'),
    data: {
      weight: { id: 'we-marco-002', clientId: 'client-marco', value: 77.8, unit: 'kg', recordedAt: new Date('2026-02-08') },
      notes: '-0.2kg, good start',
    },
    status: CheckInStatus.Completed,
    createdAt: new Date('2026-02-08'),
    updatedAt: new Date('2026-02-08'),
  },
  {
    id: 'ci-marco-010',
    clientId: 'client-marco',
    scheduledDate: new Date('2026-04-14'),
    completedAt: new Date('2026-04-14T09:30:00'),
    data: {
      weight: { id: 'we-marco-011', clientId: 'client-marco', value: 76.3, unit: 'kg', recordedAt: new Date('2026-04-14') },
      measurements: [
        { id: 'me-marco-004', clientId: 'client-marco', type: 'waist', value: 82, unit: 'cm', recordedAt: new Date('2026-04-14') },
        { id: 'me-marco-008', clientId: 'client-marco', type: 'hips', value: 94, unit: 'cm', recordedAt: new Date('2026-04-14') },
      ],
      notes: 'Continuando perfettamente',
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'Eccellente: -1.7kg in 2.5 mesi. Aderenza 92%. Continue.',
    createdAt: new Date('2026-04-14'),
    updatedAt: new Date('2026-04-14'),
  },

  // Giulia - irregular check-ins
  {
    id: 'ci-giulia-001',
    clientId: 'client-giulia',
    scheduledDate: new Date('2026-01-15'),
    completedAt: new Date('2026-01-15T14:20:00'),
    data: {
      weight: { id: 'we-giulia-001', clientId: 'client-giulia', value: 67.0, unit: 'kg', recordedAt: new Date('2026-01-15') },
      measurements: [
        { id: 'me-giulia-001', clientId: 'client-giulia', type: 'waist', value: 76, unit: 'cm', recordedAt: new Date('2026-01-15') },
      ],
    },
    status: CheckInStatus.Completed,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'ci-giulia-011',
    clientId: 'client-giulia',
    scheduledDate: new Date('2026-04-13'),
    completedAt: new Date('2026-04-13T14:15:00'),
    data: {
      weight: { id: 'we-giulia-011', clientId: 'client-giulia', value: 69.8, unit: 'kg', recordedAt: new Date('2026-04-13') },
      measurements: [
        { id: 'me-giulia-002', clientId: 'client-giulia', type: 'waist', value: 76, unit: 'cm', recordedAt: new Date('2026-04-13') },
      ],
      notes: 'Stress last weeks',
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'Concerned: +2.8kg in 3 months. Aderenza down to 62%. Need intervention.',
    createdAt: new Date('2026-04-13'),
    updatedAt: new Date('2026-04-13'),
  },

  // Alessandro - very few check-ins, inconsistent
  {
    id: 'ci-alex-004',
    clientId: 'client-alessandro',
    scheduledDate: new Date('2026-04-10'),
    completedAt: new Date('2026-04-10T11:30:00'),
    data: {
      weight: { id: 'we-alex-004', clientId: 'client-alessandro', value: 86.2, unit: 'kg', recordedAt: new Date('2026-04-10') },
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'No progress. Multiple missed check-ins. Client must commit or reconsider program.',
    createdAt: new Date('2026-04-10'),
    updatedAt: new Date('2026-04-10'),
  },

  // Francesca - consistent, weekly
  {
    id: 'ci-francesca-001',
    clientId: 'client-francesca',
    scheduledDate: new Date('2026-02-15'),
    completedAt: new Date('2026-02-15T08:45:00'),
    data: {
      weight: { id: 'we-francesca-001', clientId: 'client-francesca', value: 62.1, unit: 'kg', recordedAt: new Date('2026-02-15') },
      measurements: [
        { id: 'me-francesca-001', clientId: 'client-francesca', type: 'waist', value: 64, unit: 'cm', recordedAt: new Date('2026-02-15') },
      ],
    },
    status: CheckInStatus.Completed,
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-02-15'),
  },
  {
    id: 'ci-francesca-009',
    clientId: 'client-francesca',
    scheduledDate: new Date('2026-04-14'),
    completedAt: new Date('2026-04-14T11:45:00'),
    data: {
      weight: { id: 'we-francesca-009', clientId: 'client-francesca', value: 61.8, unit: 'kg', recordedAt: new Date('2026-04-14') },
      measurements: [
        { id: 'me-francesca-002', clientId: 'client-francesca', type: 'waist', value: 64, unit: 'cm', recordedAt: new Date('2026-04-14') },
      ],
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'Perfect maintenance. 62kg stable. Ready for toning phase.',
    createdAt: new Date('2026-04-14'),
    updatedAt: new Date('2026-04-14'),
  },

  // Davide - improving
  {
    id: 'ci-davide-001',
    clientId: 'client-davide',
    scheduledDate: new Date('2026-01-10'),
    completedAt: new Date('2026-01-10T16:00:00'),
    data: {
      weight: { id: 'we-davide-001', clientId: 'client-davide', value: 82.3, unit: 'kg', recordedAt: new Date('2026-01-10') },
      measurements: [
        { id: 'me-davide-001', clientId: 'client-davide', type: 'waist', value: 91, unit: 'cm', recordedAt: new Date('2026-01-10') },
      ],
    },
    status: CheckInStatus.Completed,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'ci-davide-009',
    clientId: 'client-davide',
    scheduledDate: new Date('2026-04-12'),
    completedAt: new Date('2026-04-12T16:20:00'),
    data: {
      weight: { id: 'we-davide-009', clientId: 'client-davide', value: 79.5, unit: 'kg', recordedAt: new Date('2026-04-12') },
      measurements: [
        { id: 'me-davide-002', clientId: 'client-davide', type: 'waist', value: 89, unit: 'cm', recordedAt: new Date('2026-04-12') },
      ],
      notes: 'Progresso buono',
    },
    status: CheckInStatus.Completed,
    professionalNotes: 'Excellent turnaround! -2.8kg in 3 months. Aderenza now 71%. Keep momentum.',
    createdAt: new Date('2026-04-12'),
    updatedAt: new Date('2026-04-12'),
  },
];

// ============================================================================
// SCHEDULED CHECK-INS
// ============================================================================

export const MOCK_SCHEDULED_CHECKINS: ScheduledCheckIn[] = [
  {
    id: 'sci-marco-011',
    clientId: 'client-marco',
    scheduledDate: new Date('2026-04-21'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 'sci-giulia-012',
    clientId: 'client-giulia',
    scheduledDate: new Date('2026-04-20'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 'sci-alessandro-005',
    clientId: 'client-alessandro',
    scheduledDate: new Date('2026-04-17'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 'sci-francesca-010',
    clientId: 'client-francesca',
    scheduledDate: new Date('2026-04-21'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 'sci-davide-010',
    clientId: 'client-davide',
    scheduledDate: new Date('2026-04-19'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 'sci-elena-001',
    clientId: 'client-elena',
    scheduledDate: new Date('2026-04-18'),
    status: CheckInStatus.Scheduled,
    createdAt: new Date('2026-04-15'),
  },
];

// ============================================================================
// MISSED CHECK-INS
// ============================================================================

export const MOCK_MISSED_CHECKINS: ScheduledCheckIn[] = [
  {
    id: 'sci-alessandro-003',
    clientId: 'client-alessandro',
    scheduledDate: new Date('2026-04-03'),
    status: CheckInStatus.Missed,
    createdAt: new Date('2026-03-27'),
  },
  {
    id: 'sci-giulia-010',
    clientId: 'client-giulia',
    scheduledDate: new Date('2026-04-06'),
    status: CheckInStatus.Missed,
    createdAt: new Date('2026-03-30'),
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getCheckInsByClientId(clientId: string): CheckIn[] {
  return MOCK_COMPLETED_CHECKINS.filter((ci) => ci.clientId === clientId).sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
  );
}

export function getUpcomingScheduledCheckIns(): ScheduledCheckIn[] {
  const now = new Date();
  return MOCK_SCHEDULED_CHECKINS
    .filter((sci) => sci.scheduledDate >= now)
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
}

export function getScheduledCheckInsByClientId(clientId: string): ScheduledCheckIn[] {
  return MOCK_SCHEDULED_CHECKINS.filter((sci) => sci.clientId === clientId);
}

export function getWeightHistoryByClientId(clientId: string): WeightEntry[] {
  return MOCK_WEIGHT_ENTRIES
    .filter((we) => we.clientId === clientId)
    .sort((a, b) => a.recordedAt.getTime() - b.recordedAt.getTime());
}
