/**
 * Mock professional notes
 * Internal annotations by the nutritionist
 */

import { ProfessionalNote } from '../types';

export const MOCK_PROFESSIONAL_NOTES: ProfessionalNote[] = [
  {
    id: 'note-marco-001',
    clientId: 'client-marco',
    content: 'Marco mostra grande coerenza e dedizione. Ha perso 1.7kg in 2.5 mesi con 92% aderenza. Peso sceso da 78kg a 76.3kg. Può aumentare l\'intensità dell\'allenamento se interessato.',
    type: 'observation',
    relatedEntity: { type: 'checkin', id: 'ci-marco-010' },
    tags: ['progress', 'consistent', 'ready-for-next-phase'],
    isPrivate: true,
    createdAt: new Date('2026-04-13T15:30:00'),
    updatedAt: new Date('2026-04-13T15:30:00'),
    authorId: 'prof-1',
  },
  {
    id: 'note-marco-002',
    clientId: 'client-marco',
    content: 'Client inizia bene, molto motivato. Ha aderito perfettamente la prima settimana. Set weekly check-ins per mantenere momentum.',
    type: 'feedback',
    relatedEntity: { type: 'checkin', id: 'ci-marco-001' },
    tags: ['motivation', 'weekly-tracking'],
    isPrivate: true,
    createdAt: new Date('2026-02-01T10:00:00'),
    updatedAt: new Date('2026-02-01T10:00:00'),
    authorId: 'prof-1',
  },

  {
    id: 'note-giulia-001',
    clientId: 'client-giulia',
    content: 'ATTENZIONE: Aderenza calata questa settimana da 88% a 62%. Guadagnato 2.8kg in 3 mesi (67kg → 69.8kg). Cliente ha menzionato stress al lavoro. Raccomandato check-in settimanale e supporto psicologico.',
    type: 'intervention',
    relatedEntity: { type: 'adherence', clientId: 'client-giulia', date: new Date('2026-04-13') },
    tags: ['adherence-drop', 'stress', 'weight-gain', 'intervention-scheduled'],
    isPrivate: true,
    createdAt: new Date('2026-04-13T09:00:00'),
    updatedAt: new Date('2026-04-13T09:00:00'),
    authorId: 'prof-1',
  },

  {
    id: 'note-alessadro-001',
    clientId: 'client-alessandro',
    content: 'Cliente ha mancato 2 check-ins su 4 programmati. Aderenza 31%, nessun progresso (86kg stabile). Ha completato solo 1 giorno perfetto in ultime 2 settimane. Conversazione urgente necessaria. Consider se è pronto per il piano.',
    type: 'intervention',
    relatedEntity: { type: 'adherence', clientId: 'client-alessandro', date: new Date('2026-04-12') },
    tags: ['at-risk', 'low-adherence', 'no-progress', 'urgent-contact'],
    isPrivate: true,
    createdAt: new Date('2026-04-12T14:30:00'),
    updatedAt: new Date('2026-04-12T14:30:00'),
    authorId: 'prof-1',
  },

  {
    id: 'note-francesca-001',
    clientId: 'client-francesca',
    content: 'Francesca sta mantenendo perfettamente il peso target (62kg stabile per 2 mesi). Aderenza 88%, sempre coerente. Pronto per fase di tonificazione. Suggest light running program 2x/week.',
    type: 'feedback',
    relatedEntity: { type: 'checkin', id: 'ci-francesca-009' },
    tags: ['maintenance', 'perfect-adherence', 'ready-for-toning'],
    isPrivate: true,
    createdAt: new Date('2026-04-10T16:00:00'),
    updatedAt: new Date('2026-04-10T16:00:00'),
    authorId: 'prof-1',
  },

  {
    id: 'note-davide-001',
    clientId: 'client-davide',
    content: 'Davide sta migliorando! Peso sceso da 82.3kg a 79.5kg in 3 settimane. Aderenza passata da 50% a 71%. Sembra aver trovato momentum e motivazione. Continuare con supporto settimanale.',
    type: 'observation',
    relatedEntity: { type: 'checkin', id: 'ci-davide-009' },
    tags: ['improving', 'accelerating', 'encouraging'],
    isPrivate: true,
    createdAt: new Date('2026-04-11T11:15:00'),
    updatedAt: new Date('2026-04-11T11:15:00'),
    authorId: 'prof-1',
  },

  {
    id: 'note-elena-001',
    clientId: 'client-elena',
    content: 'Nuovo cliente, solo 2-3 settimane. Aderenza 58% è tipica per inizio. Focus su costruzione abitudini, non su risultati veloci. Baseline weight 74.2kg. Motivazione buona, explain 4-week ramp-up period.',
    type: 'general',
    relatedEntity: { type: 'client', id: 'client-elena' },
    tags: ['new-client', 'habit-building', 'baseline'],
    isPrivate: false,
    createdAt: new Date('2026-04-13T10:30:00'),
    updatedAt: new Date('2026-04-13T10:30:00'),
    authorId: 'prof-1',
  },
];

export function getNotesByClientId(clientId: string): ProfessionalNote[] {
  return MOCK_PROFESSIONAL_NOTES
    .filter((n) => n.clientId === clientId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getNotesByType(type: string): ProfessionalNote[] {
  return MOCK_PROFESSIONAL_NOTES.filter((n) => n.type === type);
}

export function getRecentNotes(limit: number = 10): ProfessionalNote[] {
  return MOCK_PROFESSIONAL_NOTES
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}
