/**
 * Professional notes domain types
 * Internal notes and annotations about a client
 */

/**
 * ProfessionalNote - Internal annotation by nutritionist about client
 * For tracking observations, feedback, and intervention history
 */
export interface ProfessionalNote {
  id: string;
  clientId: string;
  content: string;
  type: 'observation' | 'feedback' | 'intervention' | 'general';
  relatedEntity?: {
    type: 'checkin' | 'adherence' | 'plan' | 'client';
    id: string;
  };
  tags?: string[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

/**
 * Input for creating a professional note
 */
export interface CreateProfessionalNoteInput {
  clientId: string;
  content: string;
  type: 'observation' | 'feedback' | 'intervention' | 'general';
  relatedEntity?: {
    type: 'checkin' | 'adherence' | 'plan' | 'client';
    id: string;
  };
  tags?: string[];
  isPrivate?: boolean;
}

/**
 * NoteHistory - Collection of notes for a client
 */
export interface NoteHistory {
  clientId: string;
  notes: ProfessionalNote[];
  totalCount: number;
  byType: Record<string, number>;
}
