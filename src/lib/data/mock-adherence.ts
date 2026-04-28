/**
 * Mock adherence data
 * Daily adherence records for 10 weeks
 * 
 * Each entry represents one client's adherence for that day.
 * totalItems = 3 (breakfast, lunch, dinner in each plan)
 * completedItems = how many they actually logged/completed
 */

import { AdherenceEntry, AdherenceSummary, Trend } from '../types';

/**
 * Helper to create adherence entries
 */
function createAdherenceEntry(
  id: string,
  clientId: string,
  planId: string,
  date: Date,
  completedItems: number,
  totalItems: number = 3,
): AdherenceEntry {
  return {
    id,
    clientId,
    planId,
    date,
    completedItems,
    totalItems,
    adherencePercentage: Math.round((completedItems / totalItems) * 100),
    notStarted: completedItems === 0,
    recordedAt: date,
  };
}

/**
 * 10 weeks of adherence history for all clients
 * Data spans from Feb 1 to Apr 15, 2026
 */
export const MOCK_ADHERENCE_ENTRIES: AdherenceEntry[] = [
  // ========================================================================
  // MARCO ROSSI - 2.2 anni di aderenza coerente con timeline peso/misure
  // Fase 1 (feb-ott 2024): Crescita 70% → 92% (motivazione alta, perdita rapida)
  // Fase 2 (nov 2024-dic 2025): Stabile ~90% (plateau, disciplina mantenuta)
  // Fase 3 (gen-apr 2026): 88-95% (ripartenza, nuova motivazione)
  // ========================================================================
  // Feb 2024: Inizio motivato, 70-75% aderenza
  ...Array.from({ length: 14 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${i + 1}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2024, 1, 1 + i * 1.5), // ~14 giorni in feb
      [2, 2, 3][Math.floor(Math.random() * 3)] // Mix: 67% 3/3, 33% 2/3
    )
  ),
  // Mar 2024: Aderenza 75-80%, motivazione crescente
  ...Array.from({ length: 20 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${15 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2024, 2, 1 + i * 1.5),
      [2, 2, 3, 3][Math.floor(Math.random() * 4)] // Mix: 50% 3/3, 50% 2/3
    )
  ),
  // Apr 2024: Aderenza 80-85%, momentum building
  ...Array.from({ length: 20 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${35 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2024, 3, 1 + i * 1.5),
      [2, 2, 3, 3, 3][Math.floor(Math.random() * 5)] // Mix: 60% 3/3, 40% 2/3
    )
  ),
  // Mag-ott 2024: Aderenza 85-92%, picco durante perdita rapida
  ...Array.from({ length: 130 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${55 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2024, 4 + Math.floor(i / 22), 1 + (i % 22) * 1.3),
      Math.random() > 0.1 ? 3 : 2 // 90% chance 3/3
    )
  ),
  // Nov 2024-dic 2025: Plateau, aderenza stabile 88-92%
  ...Array.from({ length: 200 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${185 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2024, 10 + Math.floor(i / 67), 1 + (i % 22) * 1.3),
      Math.random() > 0.11 ? 3 : 2 // 89% chance 3/3, 11% chance 2/3
    )
  ),
  // Gen-apr 2026: Ripartenza, 88-95% aderenza
  // Gen: Recovery phase, 88% aderenza
  ...Array.from({ length: 23 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${385 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2026, 0, 1 + i * 1.3),
      Math.random() > 0.12 ? 3 : 2 // 88% chance
    )
  ),
  // Feb 2026: Momentum building, 92% aderenza
  ...Array.from({ length: 20 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${408 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2026, 1, 1 + i * 1.4),
      Math.random() > 0.08 ? 3 : 2 // 92% chance
    )
  ),
  // Mar-apr 2026: Final push, 95% aderenza
  ...Array.from({ length: 44 }, (_, i) => 
    createAdherenceEntry(
      `adh-marco-${428 + i}`,
      'client-marco',
      'plan-marco-classic',
      new Date(2026, 2 + Math.floor(i / 22), 1 + (i % 22) * 1.3),
      Math.random() > 0.05 ? 3 : 2 // 95% chance
    )
  ),

  // ========================================================================
  // GIULIA BIANCHI - Medium adherence, inconsistent, declining
  // Week 1 (Jan 15-21): 70% avg - decent start
  // ========================================================================
  createAdherenceEntry('adh-giulia-001', 'client-giulia', 'plan-giulia-light', new Date('2026-01-15'), 3),
  createAdherenceEntry('adh-giulia-002', 'client-giulia', 'plan-giulia-light', new Date('2026-01-16'), 2),
  createAdherenceEntry('adh-giulia-003', 'client-giulia', 'plan-giulia-light', new Date('2026-01-17'), 3),
  createAdherenceEntry('adh-giulia-004', 'client-giulia', 'plan-giulia-light', new Date('2026-01-18'), 1),
  createAdherenceEntry('adh-giulia-005', 'client-giulia', 'plan-giulia-light', new Date('2026-01-19'), 2),
  createAdherenceEntry('adh-giulia-006', 'client-giulia', 'plan-giulia-light', new Date('2026-01-20'), 2),
  createAdherenceEntry('adh-giulia-007', 'client-giulia', 'plan-giulia-light', new Date('2026-01-21'), 3),
  // Week 2 (Jan 22-28): 60% avg - declining
  createAdherenceEntry('adh-giulia-008', 'client-giulia', 'plan-giulia-light', new Date('2026-01-22'), 2),
  createAdherenceEntry('adh-giulia-009', 'client-giulia', 'plan-giulia-light', new Date('2026-01-23'), 1),
  createAdherenceEntry('adh-giulia-010', 'client-giulia', 'plan-giulia-light', new Date('2026-01-24'), 2),
  createAdherenceEntry('adh-giulia-011', 'client-giulia', 'plan-giulia-light', new Date('2026-01-25'), 1),
  createAdherenceEntry('adh-giulia-012', 'client-giulia', 'plan-giulia-light', new Date('2026-01-26'), 2),
  createAdherenceEntry('adh-giulia-013', 'client-giulia', 'plan-giulia-light', new Date('2026-01-27'), 1),
  createAdherenceEntry('adh-giulia-014', 'client-giulia', 'plan-giulia-light', new Date('2026-01-28'), 3),
  // Fluctuating through Feb-Apr: high stress period, lots of 1-2 days
  ...Array.from({ length: 76 }, (_, i) => 
    createAdherenceEntry(
      `adh-giulia-${15 + i}`,
      'client-giulia',
      'plan-giulia-light',
      new Date(2026, 0, 29 + i % 31), 
      [1, 1, 2, 2, 3][Math.floor(Math.random() * 5)] // Mix: 40% 1, 40% 2, 20% 3
    )
  ),

  // ========================================================================
  // ALESSANDRO FERMI - Low adherence, no improvement
  // Started: Mar 10, 2026
  // ========================================================================
  ...Array.from({ length: 36 }, (_, i) => 
    createAdherenceEntry(
      `adh-alessandro-${i + 1}`,
      'client-alessandro',
      'plan-alessandro-reset',
      new Date(2026, 2, 10 + i),
      [0, 0, 1, 1, 2][Math.floor(Math.random() * 5)] // Mix: 40% 0, 40% 1, 20% 2
    )
  ),

  // ========================================================================
  // FRANCESCA CONTI - Strong adherence, maintaining weight
  // Started: Feb 15, 2026
  // ========================================================================
  ...Array.from({ length: 59 }, (_, i) => 
    createAdherenceEntry(
      `adh-francesca-${i + 1}`,
      'client-francesca',
      'plan-francesca-maintenance',
      new Date(2026, 1, 15 + i),
      Math.random() > 0.12 ? 3 : 2 // 88% chance of 3/3
    )
  ),

  // ========================================================================
  // DAVIDE MORETTI - Improving trend
  // Early weeks (Jan 10 - Feb 20): 50-60% avg, struggling
  // Recent weeks (Feb 21 - Apr 15): 70-80% avg, improving
  // ========================================================================
  // Weeks 1-6: Low adherence
  ...Array.from({ length: 42 }, (_, i) => 
    createAdherenceEntry(
      `adh-davide-${i + 1}`,
      'client-davide',
      'plan-davide-standard',
      new Date(2026, 0, 10 + i),
      [0, 1, 1, 2, 2][Math.floor(Math.random() * 5)]
    )
  ),
  // Weeks 7-10: Improving
  ...Array.from({ length: 28 }, (_, i) => 
    createAdherenceEntry(
      `adh-davide-${43 + i}`,
      'client-davide',
      'plan-davide-standard',
      new Date(2026, 2, 1 + i),
      Math.random() > 0.3 ? 3 : 2 // 70% chance of 3/3
    )
  ),

  // ========================================================================
  // ELENA DE LUCA - New client, building routine
  // Started: Mar 28, 2026 (only 2.5 weeks of history)
  // Typical new client: inconsistent, building habit
  // ========================================================================
  ...Array.from({ length: 18 }, (_, i) => 
    createAdherenceEntry(
      `adh-elena-${i + 1}`,
      'client-elena',
      'plan-elena-starter',
      new Date(2026, 2, 28 + i),
      [1, 1, 2, 2, 3][Math.floor(Math.random() * 5)] // Mix: typical for new client
    )
  ),
];

// ============================================================================
// HELPERS
// ============================================================================

export function getAdherenceByClientId(clientId: string, limit?: number): AdherenceEntry[] {
  const entries = MOCK_ADHERENCE_ENTRIES
    .filter((e) => e.clientId === clientId)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return limit ? entries.slice(0, limit) : entries;
}

export function getAdherenceSummary(clientId: string): AdherenceSummary {
  const thisWeek = getAdherenceByClientId(clientId, 7);
  const lastWeek = MOCK_ADHERENCE_ENTRIES
    .filter((e) => e.clientId === clientId && e.date.getTime() < thisWeek[thisWeek.length - 1].date.getTime())
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 7);

  const thisWeekAvg = thisWeek.length
    ? Math.round(thisWeek.reduce((sum, e) => sum + e.adherencePercentage, 0) / thisWeek.length)
    : 0;

  const lastWeekAvg = lastWeek.length
    ? Math.round(lastWeek.reduce((sum, e) => sum + e.adherencePercentage, 0) / lastWeek.length)
    : 0;

  const direction: Trend = thisWeekAvg > lastWeekAvg ? Trend.Up : thisWeekAvg < lastWeekAvg ? Trend.Down : Trend.Neutral;

  const consecutivePerfectDays = thisWeek
    .reverse()
    .findIndex((e) => e.completedItems !== e.totalItems);

  return {
    clientId,
    period: 'week',
    startDate: thisWeek[thisWeek.length - 1]?.date || new Date(),
    endDate: thisWeek[0]?.date || new Date(),
    averageAdherence: thisWeekAvg,
    trend: {
      current: thisWeekAvg,
      previous: lastWeekAvg,
      direction,
      percentageChange: thisWeekAvg - lastWeekAvg,
    },
    bestDay: thisWeek[0]?.date,
    worstDay: thisWeek[thisWeek.length - 1]?.date,
    consecutivePerfectDays: consecutivePerfectDays === -1 ? thisWeek.length : consecutivePerfectDays,
    daysTracked: thisWeek.length,
    daysNotTracked: 0,
  };
}
