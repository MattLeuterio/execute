/**
 * Mock clients data
 * Realistic nutritionist's client base with diverse profiles
 * 
 * Clients:
 * - Marco Rossi: Strong adherence, consistent progress (78kg → 76.3kg)
 * - Giulia Bianchi: Medium adherence with ups/downs (67kg → 69.8kg, slight gain)
 * - Alessandro Fermi: Low adherence, inactive, no progress (86kg flat)
 * - Francesca Conti: Strong adherence, maintaining weight (62kg stable)
 * - Davide Moretti: Improving trend (82.3kg → 79.5kg, -2.8kg)
 * - Elena De Luca: Recently started, building routine (74.2kg baseline)
 */

import { Client, ClientSummary, ClientDetail, ClientStatus } from '../types';

// ============================================================================
// BASE CLIENTS
// ============================================================================

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'client-marco',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 333 1234567',
    currentPlanId: 'plan-marco-classic',
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-04-15'),
  },
  {
    id: 'client-giulia',
    name: 'Giulia Bianchi',
    email: 'giulia.b@example.com',
    phone: '+39 333 2345678',
    currentPlanId: 'plan-giulia-light',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-04-15'),
  },
  {
    id: 'client-alessandro',
    name: 'Alessandro Fermi',
    email: 'alex.fermi@example.com',
    phone: '+39 333 3456789',
    currentPlanId: 'plan-alessandro-reset',
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-04-12'),
  },
  {
    id: 'client-francesca',
    name: 'Francesca Conti',
    email: 'f.conti@example.com',
    currentPlanId: 'plan-francesca-maintenance',
    createdAt: new Date('2026-02-15'),
    updatedAt: new Date('2026-04-14'),
  },
  {
    id: 'client-davide',
    name: 'Davide Moretti',
    email: 'davide.m@example.com',
    phone: '+39 333 4567890',
    currentPlanId: 'plan-davide-standard',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-04-15'),
  },
  {
    id: 'client-elena',
    name: 'Elena De Luca',
    email: 'elena.deluca@example.com',
    phone: '+39 333 5678901',
    currentPlanId: 'plan-elena-starter',
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-04-13'),
  },
];

// ============================================================================
// CLIENT SUMMARIES (For list/table views)
// ============================================================================

export const MOCK_CLIENT_SUMMARIES: Record<string, ClientSummary> = {
  'client-marco': {
    id: 'client-marco',
    name: 'Marco Rossi',
    status: ClientStatus.OnTrack,
    adherencePercentage: 92,
    latestWeight: 76.3,
    weightUnit: 'kg',
    latestCheckInDate: new Date('2026-04-14'),
    consecutiveDaysOnTrack: 18,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-14T09:30:00'),
  },
  'client-giulia': {
    id: 'client-giulia',
    name: 'Giulia Bianchi',
    status: ClientStatus.Warning,
    adherencePercentage: 62,
    latestWeight: 69.8,
    weightUnit: 'kg',
    latestCheckInDate: new Date('2026-04-13'),
    consecutiveDaysOnTrack: 3,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-13T14:15:00'),
  },
  'client-alessandro': {
    id: 'client-alessandro',
    name: 'Alessandro Fermi',
    status: ClientStatus.AtRisk,
    adherencePercentage: 31,
    latestWeight: 86.2,
    weightUnit: 'kg',
    latestCheckInDate: new Date('2026-04-10'),
    consecutiveDaysOnTrack: 0,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-12T10:00:00'),
  },
  'client-francesca': {
    id: 'client-francesca',
    name: 'Francesca Conti',
    status: ClientStatus.OnTrack,
    adherencePercentage: 88,
    latestWeight: 61.8,
    weightUnit: 'kg',
    latestCheckInDate: new Date('2026-04-14'),
    consecutiveDaysOnTrack: 22,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-14T11:45:00'),
  },
  'client-davide': {
    id: 'client-davide',
    name: 'Davide Moretti',
    status: ClientStatus.Warning,
    adherencePercentage: 71,
    latestWeight: 79.5,
    weightUnit: 'kg',
    latestCheckInDate: new Date('2026-04-12'),
    consecutiveDaysOnTrack: 5,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-12T16:20:00'),
  },
  'client-elena': {
    id: 'client-elena',
    name: 'Elena De Luca',
    status: ClientStatus.Warning,
    adherencePercentage: 58,
    latestWeight: 74.2,
    weightUnit: 'kg',
    latestCheckInDate: undefined,
    consecutiveDaysOnTrack: 2,
    hasActivePlan: true,
    lastActivityDate: new Date('2026-04-13T13:00:00'),
  },
};

// ============================================================================
// CLIENT DETAILS (For detail pages)
// ============================================================================

export const MOCK_CLIENT_DETAILS: Record<string, ClientDetail> = {
  'client-marco': {
    id: 'client-marco',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 333 1234567',
    createdAt: new Date('2026-02-01'),
    status: ClientStatus.OnTrack,
    weeklyAdherence: 92,
    weeklyAdherenceTrend: 'up',
    consecutiveDaysOnTrack: 18,
    currentPlan: {
      id: 'plan-marco-classic',
      name: 'Piano Proteico Classico',
      startDate: new Date('2026-02-01'),
    },
    latestWeight: {
      value: 76.3,
      date: new Date('2026-04-14'),
      unit: 'kg',
    },
    latestMeasurements: {
      date: new Date('2026-04-14'),
      values: {
        waist: 82,
        hips: 94,
        chest: 98,
      },
    },
    lastCheckInDate: new Date('2026-04-14'),
    nextScheduledCheckInDate: new Date('2026-04-21'),
    lastNoteDate: new Date('2026-04-13T15:30:00'),
    lastNotePreview: 'Marco mostra grande coerenza. Peso sceso di 1.7kg in 2 settimane. Può aumentare intensità.',
    updatedAt: new Date('2026-04-14'),
  },
  'client-giulia': {
    id: 'client-giulia',
    name: 'Giulia Bianchi',
    email: 'giulia.b@example.com',
    createdAt: new Date('2026-01-15'),
    status: ClientStatus.Warning,
    weeklyAdherence: 62,
    weeklyAdherenceTrend: 'down',
    consecutiveDaysOnTrack: 3,
    currentPlan: {
      id: 'plan-giulia-light',
      name: 'Piano Leggero Ipocalorico',
      startDate: new Date('2026-01-15'),
    },
    latestWeight: {
      value: 69.8,
      date: new Date('2026-04-13'),
      unit: 'kg',
    },
    latestMeasurements: {
      date: new Date('2026-04-13'),
      values: {
        waist: 76,
        hips: 89,
      },
    },
    lastCheckInDate: new Date('2026-04-13'),
    nextScheduledCheckInDate: new Date('2026-04-20'),
    lastNoteDate: new Date('2026-04-13T09:00:00'),
    lastNotePreview: 'Aderenza calata questa settimana. Stress al lavoro? Raccomandato check-in settimanale.',
    updatedAt: new Date('2026-04-13'),
  },
  'client-alessandro': {
    id: 'client-alessandro',
    name: 'Alessandro Fermi',
    email: 'alex.fermi@example.com',
    createdAt: new Date('2026-03-10'),
    status: ClientStatus.AtRisk,
    weeklyAdherence: 31,
    weeklyAdherenceTrend: 'down',
    consecutiveDaysOnTrack: 0,
    currentPlan: {
      id: 'plan-alessandro-reset',
      name: 'Piano di Ripartenza',
      startDate: new Date('2026-03-10'),
    },
    latestWeight: {
      value: 86.2,
      date: new Date('2026-04-10'),
      unit: 'kg',
    },
    lastCheckInDate: new Date('2026-04-10'),
    nextScheduledCheckInDate: new Date('2026-04-17'),
    lastNoteDate: new Date('2026-04-12T14:30:00'),
    lastNotePreview: 'ATTENZIONE: Aderenza molto bassa. Non ha completato nemmeno un giorno questa settimana. Contatto diretto necessario.',
    updatedAt: new Date('2026-04-12'),
  },
  'client-francesca': {
    id: 'client-francesca',
    name: 'Francesca Conti',
    email: 'f.conti@example.com',
    createdAt: new Date('2026-02-15'),
    status: ClientStatus.OnTrack,
    weeklyAdherence: 88,
    weeklyAdherenceTrend: 'neutral',
    consecutiveDaysOnTrack: 22,
    currentPlan: {
      id: 'plan-francesca-maintenance',
      name: 'Piano Mantenimento Premium',
      startDate: new Date('2026-03-15'),
    },
    latestWeight: {
      value: 61.8,
      date: new Date('2026-04-14'),
      unit: 'kg',
    },
    latestMeasurements: {
      date: new Date('2026-04-14'),
      values: {
        waist: 64,
        hips: 82,
        chest: 88,
      },
    },
    lastCheckInDate: new Date('2026-04-14'),
    nextScheduledCheckInDate: new Date('2026-04-21'),
    lastNoteDate: new Date('2026-04-10T16:00:00'),
    lastNotePreview: 'Francesca sta mantenendo perfettamente il peso. Può iniziare programma corsa leggera per tonificazione.',
    updatedAt: new Date('2026-04-14'),
  },
  'client-davide': {
    id: 'client-davide',
    name: 'Davide Moretti',
    email: 'davide.m@example.com',
    createdAt: new Date('2026-01-10'),
    status: ClientStatus.Warning,
    weeklyAdherence: 71,
    weeklyAdherenceTrend: 'up',
    consecutiveDaysOnTrack: 5,
    currentPlan: {
      id: 'plan-davide-standard',
      name: 'Piano Standard Protein+',
      startDate: new Date('2026-02-22'),
    },
    latestWeight: {
      value: 79.5,
      date: new Date('2026-04-12'),
      unit: 'kg',
    },
    latestMeasurements: {
      date: new Date('2026-04-12'),
      values: {
        waist: 88,
        hips: 96,
        chest: 100,
      },
    },
    lastCheckInDate: new Date('2026-04-12'),
    nextScheduledCheckInDate: new Date('2026-04-19'),
    lastNoteDate: new Date('2026-04-11T11:15:00'),
    lastNotePreview: 'Davide sta migliorando! Peso sceso da 82.3 a 79.5kg in 3 settimane. Continuare così.',
    updatedAt: new Date('2026-04-12'),
  },
  'client-elena': {
    id: 'client-elena',
    name: 'Elena De Luca',
    email: 'elena.deluca@example.com',
    createdAt: new Date('2026-03-28'),
    status: ClientStatus.Warning,
    weeklyAdherence: 58,
    weeklyAdherenceTrend: 'neutral',
    consecutiveDaysOnTrack: 2,
    currentPlan: {
      id: 'plan-elena-starter',
      name: 'Piano Base - Abitudini',
      startDate: new Date('2026-03-28'),
    },
    latestWeight: {
      value: 74.2,
      date: new Date('2026-03-28'),
      unit: 'kg',
    },
    lastCheckInDate: undefined,
    nextScheduledCheckInDate: new Date('2026-04-18'),
    lastNoteDate: new Date('2026-04-13T10:30:00'),
    lastNotePreview: 'Nuovo cliente, solo 2-3 settimane. Focus su abitudini. Aderenza tipica per inizio.',
    updatedAt: new Date('2026-04-13'),
  },
};

// ============================================================================
// HELPERS
// ============================================================================

export function getClientById(id: string): Client | undefined {
  return MOCK_CLIENTS.find((client) => client.id === id);
}

export function getClientSummaryById(id: string): ClientSummary | undefined {
  return MOCK_CLIENT_SUMMARIES[id];
}

export function getClientDetailById(id: string): ClientDetail | undefined {
  return MOCK_CLIENT_DETAILS[id];
}

export function getAllClients(): Client[] {
  return MOCK_CLIENTS;
}

export function getAllClientSummaries(): ClientSummary[] {
  return Object.values(MOCK_CLIENT_SUMMARIES);
}

export function getClientsSorted(sortBy: 'name' | 'adherence' | 'lastActivity'): ClientSummary[] {
  const summaries = Object.values(MOCK_CLIENT_SUMMARIES);

  switch (sortBy) {
    case 'name':
      return [...summaries].sort((a, b) => a.name.localeCompare(b.name));
    case 'adherence':
      return [...summaries].sort((a, b) => b.adherencePercentage - a.adherencePercentage);
    case 'lastActivity':
      return [...summaries].sort((a, b) => b.lastActivityDate.getTime() - a.lastActivityDate.getTime());
    default:
      return summaries;
  }
}

export function getClientsByStatus(status: ClientStatus): ClientSummary[] {
  return Object.values(MOCK_CLIENT_SUMMARIES).filter((client) => client.status === status);
}
