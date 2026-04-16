/**
 * MOCK DATA STRATEGY & DATABASE DESIGN
 * Execute - Nutritionist App
 * 
 * This document explains the mock data generation approach and how it informs
 * the future database/Supabase schema design.
 */

// ============================================================================
// OVERVIEW
// ============================================================================

/*

The mock data files (src/lib/data/mock-*.ts) serve TWO critical purposes:

1. PRODUCT VISUALIZATION
   - Show realistic product behavior
   - Help UI developers understand data shapes
   - Enable screens before backend exists
   - Provide test data for frontend iteration

2. DATABASE DESIGN REFERENCE
   - Reveal data relationships and cardinality
   - Identify which fields are persistence-critical
   - Show temporal aspects (history, trends)
   - Guide table schema design in Supabase

The mock data is NOT:
- Random or nonsensical
- Simplified for ease
- Just 3-5 entries per client

It IS:
- Realistic (6 clients with different real-world patterns)
- Comprehensive (10 weeks of history)
- Intentional (each datapoint contributes to narrative)
- Aligned with product decisions (MVP scope, status logic, etc)

*/

// ============================================================================
// MOCK DATA FILES & STRUCTURE
// ============================================================================

/*

FILE HIERARCHY:

src/lib/data/
├── mock-clients.ts
│   ├── MOCK_CLIENTS (base entity)
│   ├── MOCK_CLIENT_SUMMARIES (computed for list views)
│   └── MOCK_CLIENT_DETAILS (computed for detail pages)
│
├── mock-plans.ts
│   ├── WEEKLY_SCHEDULE_* (reusable plan templates)
│   ├── MOCK_PLANS (plan assignments)
│   └── helpers
│
├── mock-adherence.ts
│   ├── MOCK_ADHERENCE_ENTRIES (daily adherence records)
│   ├── helpers (getAdherenceByClientId, getAdherenceSummary)
│
├── mock-checkins.ts
│   ├── MOCK_WEIGHT_ENTRIES (weight history)
│   ├── MOCK_MEASUREMENT_ENTRIES (body measurements)
│   ├── MOCK_COMPLETED_CHECKINS (finished check-ins)
│   ├── MOCK_SCHEDULED_CHECKINS (upcoming)
│   ├── MOCK_MISSED_CHECKINS (overdue)
│   └── helpers
│
├── mock-notes.ts
│   ├── MOCK_PROFESSIONAL_NOTES (internal annotations)
│   └── helpers
│
└── mock-activity.ts
    ├── MOCK_ACTIVITY_FEED (dashboard events)
    └── helpers


TOTAL DATA POINTS:

Clients:              6
Adherence entries:    250+ (10 weeks × 6 clients)
Weight entries:       36 weekly recordings
Measurements:         24 recordings
Check-ins:            12 completed + 6 scheduled + 2 missed
Professional notes:   6 per client, varied types
Activity items:       20 recent activities
Plans:                6 (one per client)

This is HEAVY mock data. It's intentional.

*/

// ============================================================================
// DATA RELATIONSHIPS & CARDINALITY
// ============================================================================

/*

CLIENT-CENTRIC VIEW:

┌──────────────┐
│    Client    │ (6 entities)
│   (base)     │
└──────┬───────┘
       │
       ├─→ ClientSummary (computed from Client + latest Adherence + latest Weight)
       │   (list view representation)
       │
       ├─→ ClientDetail (computed from Client + Plan + Adherence + CheckIns + Notes)
       │   (detail view representation)
       │
       ├─→ Plan (1:1 active plan at a time)
       │   └─→ WeeklySchedule
       │       └─→ DailyPlan[] (7)
       │           └─→ PlanItem[] (3 per day = 21 total)
       │
       ├─→ AdherenceEntry[] (7-10 per week, ~70 per 10 weeks)
       │   └─→ computed into AdherenceSummary (weekly/monthly)
       │
       ├─→ CheckIn[] (completed)
       │   ├─→ WeightEntry (1 per check-in)
       │   └─→ MeasurementEntry[] (multiple types: waist, hips, chest, etc)
       │
       ├─→ ScheduledCheckIn[] (upcoming OR missed)
       │   └─→ can transition to CheckIn
       │
       ├─→ ProfessionalNote[] (annotations, internal)
       │   └─→ can link to CheckIn, Plan, Adherence, or Client
       │
       └─→ ActivityItem[] (feed entries, references to all above)


TEMPORAL ASPECTS:

AdherenceEntry
  └─→ recorded DAILY (or retroactively logged)
      └─→ each entry: date, clientId, completedItems/totalItems, adherencePercentage

WeightEntry
  └─→ recorded weekly (on check-in, usually)
      └─→ one per client per week × 10 weeks = 10 entries typical

MeasurementEntry
  └─→ recorded less frequently (monthly or per check-in)
      └─→ multiple types (waist, hips, chest, etc)

CheckIn
  └─→ scheduled weekly (for good clients) or irregular
      └─→ can be completed, missed, or pending

ProfessionalNote
  └─→ created ad-hoc by nutritionist
      └─→ can be linked to specific events or open observations


COMPUTED FIELDS (NOT persisted, derived on read):

ClientSummary.status
  = status: ClientStatus
  ← derived from adherencePercentage: >75% = OnTrack, 50-75% = Warning, <50% = AtRisk

ClientSummary.consecutiveDaysOnTrack
  ← count of recent days where adherencePercentage === 100

AdherenceSummary.averageAdherence
  ← avg(AdherenceEntry.adherencePercentage for period)

AdherenceSummary.trend
  ← compare(currentPeriodAdherence vs previousPeriodAdherence)

ActivityFeed items
  ← generated from events (CheckIn completion, adherence changes, notes added)
  ← NOT directly persisted (built on-demand from other tables)

*/

// ============================================================================
// CLIENT PROFILES & NARRATIVES
// ============================================================================

/*

MARCO ROSSI - "The Ideal Client"
├─ Status: OnTrack (92% adherence)
├─ Trend: Improving (up)
├─ Progress: 78kg → 76.3kg (-1.7kg in 2.5 months)
├─ Measurements: Declining in waist, hips, chest
├─ Check-ins: Weekly, consistent, always complete
├─ Notes: Positive feedback, ready for next phase
├─ Story: Strong motivation, steady execution, results-driven
└─ DB Model: Shows successful weight loss + adherence correlation


GIULIA BIANCHI - "The Struggling Client"
├─ Status: Warning (62% adherence)
├─ Trend: Down (-26% this week)
├─ Progress: 67kg → 69.8kg (+2.8kg in 3 months, gained back after temporary loss)
├─ Measurements: Stable but no improvement
├─ Check-ins: Irregular, sometimes missed
├─ Notes: Stress intervention needed, adherence dropped
├─ Story: Initial optimism, then stress/life events derail
└─ DB Model: Shows weight regain pattern + adherence correlation


ALESSANDRO FERMI - "The At-Risk Client"
├─ Status: AtRisk (31% adherence)
├─ Trend: Down
├─ Progress: 86kg → 86.2kg (no change, weight stable but not in good way)
├─ Check-ins: Multiple missed, very few completed
├─ Notes: Urgent intervention needed, consider program fit
├─ Story: Joined but not committed, no progress, no adherence
└─ DB Model: Shows stagnation pattern, identifies dropout risk


FRANCESCA CONTI - "The Maintainer"
├─ Status: OnTrack (88% adherence)
├─ Trend: Neutral (stable)
├─ Progress: 62kg maintained for 2 months
├─ Measurements: Very stable
├─ Check-ins: Weekly, always complete
├─ Notes: Perfect maintenance, ready for toning
├─ Story: Achieved goal weight, now locked into consistent routine
└─ DB Model: Shows maintenance vs active weight loss pattern


DAVIDE MORETTI - "The Improver"
├─ Status: Warning → Improving to OnTrack (71% adherence, up from 50%)
├─ Trend: Up (accelerating)
├─ Progress: 82.3kg → 79.5kg (-2.8kg in 3 weeks)
├─ Check-ins: Regular, completing
├─ Notes: Turnaround moment, maintaining support
├─ Story: Started struggling, found his rhythm, now winning
└─ DB Model: Shows recovery pattern, demonstrates intervention effectiveness


ELENA DE LUCA - "The Newcomer"
├─ Status: Warning (58% adherence)
├─ Trend: Neutral
├─ Progress: Baseline 74.2kg, 2.5 weeks in
├─ Check-ins: None yet scheduled regularly
├─ Notes: Habit-building phase, typical for new
├─ Story: Just started, learning rhythm
└─ DB Model: Shows onboarding phase, early habit formation

*/

// ============================================================================
// TEMPORAL DATA PATTERNS
// ============================================================================

/*

ADHERENCE TRENDS (show why status changes):

Marco (high adherence):
  Week 1: 80% (ramp-up)
  Week 2: 90% 
  Week 3-10: 94% average (stable high)
  Pattern: Learns system, then locks in

Giulia (declining):
  Week 1-2: 70-75% (decent start)
  Week 3-9: 60% average (consistent medium)
  Week 10: 62% (down)
  Pattern: Never builds momentum, stress causes drop

Alessandro (low):
  Week 1-4: 35-40% average
  Week 5: 31% 
  Pattern: Never improves, getting worse

Davide (improving):
  Week 1-6: 50% average (struggles)
  Week 7-10: 71% average (improving)
  Pattern: Inflection point visible → intervention worked


WEIGHT TRENDS (show outcome):

Marco:  Linear loss, -0.3kg/week sustainable
Giulia: Loss → gain cycle, stress visible
Alessandro: Flat, no trajectory
Francesca: Maintenance ±0.2kg variance
Davide: Steep drop early (probably started committed), now plateauing
Elena: Baseline only (too new)


CHECK-IN PATTERNS (show engagement):

Marco: Weekly ✓ (engaged)
Giulia: ~Biweekly, sometimes missed (disengaged)
Alessandro: 1 per month, often missed (very disengaged)
Francesca: Weekly ✓ (engaged)
Davide: Improving frequency over time (re-engaging)
Elena: None yet (just starting)

*/

// ============================================================================
// HOW MOCKS INFORM DATABASE DESIGN
// ============================================================================

/*

1. TABLE CARDINALITY

From the mock data, we can see:

Clients (base)
  → Plans (1:1 active, but N:N historical if we track old plans)
  → AdherenceEntry (1:many, ~1-3 per day)
  → WeightEntry (1:many, ~1 per week)
  → MeasurementEntry (1:many, multiple types, ~1-2 per week per type)
  → CheckIn (1:many, ~1 per week)
  → ProfessionalNote (1:many)
  → ActivityItem (1:many, derived/fed by other tables)

This tells us:
- AdherenceEntry will be the LARGEST table (250+ rows for 6 clients × 10 weeks)
- WeightEntry will be small but queried frequently
- CheckIn will be moderate (12 per client on average)
- Need efficient queries: "get adherence for last 7 days" → must be fast


2. DENORMALIZATION DECISIONS

Looking at ClientSummary and ClientDetail, we compute fields:

ClientSummary.adherencePercentage
  ← we could store this pre-computed (denormalized)
  ← OR compute on-the-fly from AdherenceEntry (normalized)
  ← MVP: compute on-read is fine, but later might denormalize

ClientDetail.weeklyAdherence + weeklyAdherenceTrend
  ← definitely computed (7-14 day aggregate)

ActivityItem (implied in feed)
  ← could be materialized table (easy to page)
  ← OR computed on-demand from CheckIn, AdherenceEntry, ProfessionalNote
  ← MVP: compute on-demand; later could materialize


3. INDEXING REQUIREMENTS (revealed by query patterns)

From mock-*.ts helpers, we see these queries MUST be fast:

getAdherenceByClientId(clientId) + sort by date
  → Index: AdherenceEntry(clientId, date DESC)

getCheckInsByClientId(clientId)
  → Index: CheckIn(clientId, completedAt DESC) OR (clientId, scheduledDate DESC)

getWeightHistoryByClientId(clientId)
  → Index: WeightEntry(clientId, recordedAt ASC)

getNotesByClientId(clientId)
  → Index: ProfessionalNote(clientId, createdAt DESC)

getActivityFeed(filter: type | severity | dateRange)
  → Index: ActivityItem(severity, type, timestamp DESC)


4. ROW-LEVEL SECURITY (RLS) REQUIREMENTS

From the data structure, RLS policies must enforce:

Professional can see:
  - All own clients' data
  - Own professional notes
  - Own activity

Client can see:
  - Own plan
  - Own adherence
  - Own check-ins
  - Own measurements
  - NOT professional notes (except completion feedback)

This shapes how we structure queries and policies.


5. REAL-TIME / REACTIVE REQUIREMENTS

From activity feed patterns:
  - New check-in completed → ActivityItem created immediately
  - Adherence drop detected → ActivityItem flagged as 'alert'
  - Professional note added → ActivityItem logged

This suggests:
  - Supabase Realtime subscriptions useful for dashboard
  - Activity feed should update live
  - Alerts should trigger notifications


6. AUDIT TRAIL REQUIREMENTS

Professional notes have timestamps and authorId:
  - We should track WHO made changes
  - Notes have createdAt + updatedAt
  - ActivityItem shows historical events

This suggests:
  - Each table should have created_at, updated_at, created_by columns
  - Supabase audit for sensitive changes


7. SOFT DELETES

Client has optional archivedAt:
  - Clients can be archived (not hard-deleted)
  - Plans can be marked inactive
  - This allows historical queries

Suggests:
  - Use soft deletes for Clients, Plans
  - Filter by active/archived in queries by default

*/

// ============================================================================
// SUPABASE SCHEMA (PRELIMINARY)
// ============================================================================

/*

Based on the mock data relationships, here's the preliminary schema:

-- Clients (base)
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  archived_at TIMESTAMP,
  professional_id UUID NOT NULL REFERENCES auth.users
);

-- Plans
CREATE TABLE plans (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  name VARCHAR NOT NULL,
  description TEXT,
  weekly_schedule JSONB NOT NULL, -- { days: [...] }
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  professional_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily Adherence
CREATE TABLE adherence_entries (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  plan_id UUID NOT NULL REFERENCES plans,
  date DATE NOT NULL,
  completed_items INTEGER NOT NULL,
  total_items INTEGER NOT NULL,
  adherence_percentage INTEGER NOT NULL,
  not_started BOOLEAN DEFAULT FALSE,
  notes TEXT,
  recorded_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(client_id, date) -- one entry per client per day
);

-- Weight Entries
CREATE TABLE weight_entries (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  value DECIMAL(5,1) NOT NULL,
  unit VARCHAR CHECK (unit IN ('kg', 'lbs')),
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Measurements
CREATE TABLE measurement_entries (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  type VARCHAR NOT NULL, -- waist, hips, chest, etc
  value DECIMAL(5,1) NOT NULL,
  unit VARCHAR CHECK (unit IN ('cm', 'in')),
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Check-Ins
CREATE TABLE check_ins (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  scheduled_date DATE NOT NULL,
  completed_at TIMESTAMP,
  status VARCHAR CHECK (status IN ('scheduled', 'completed', 'missed')),
  weight_id UUID REFERENCES weight_entries,
  notes TEXT,
  professional_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Professional Notes
CREATE TABLE professional_notes (
  id UUID PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients,
  content TEXT NOT NULL,
  type VARCHAR, -- observation, feedback, intervention, general
  related_entity_type VARCHAR, -- checkin, adherence, plan, client
  related_entity_id UUID,
  tags VARCHAR[],
  is_private BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  author_id UUID NOT NULL REFERENCES auth.users
);

-- Activity Feed
CREATE TABLE activity_items (
  id UUID PRIMARY KEY,
  type VARCHAR NOT NULL, -- client_added, plan_assigned, etc
  entity_type VARCHAR NOT NULL, -- client, plan, checkin, note, adherence
  entity_id VARCHAR,
  description TEXT NOT NULL,
  metadata JSONB,
  severity VARCHAR CHECK (severity IN ('info', 'warning', 'alert')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  professional_id UUID NOT NULL REFERENCES auth.users
);

-- Indexes (crucial for query performance)
CREATE INDEX adherence_entries_client_date ON adherence_entries(client_id, date DESC);
CREATE INDEX weight_entries_client_date ON weight_entries(client_id, recorded_at DESC);
CREATE INDEX check_ins_client_date ON check_ins(client_id, scheduled_date DESC);
CREATE INDEX professional_notes_client ON professional_notes(client_id, created_at DESC);
CREATE INDEX activity_items_severity ON activity_items(severity, created_at DESC);
CREATE INDEX activity_items_professional ON activity_items(professional_id, created_at DESC);

-- RLS Policies would go here (see AGENTS.md or security section)

*/

// ============================================================================
// NEXT STEPS
// ============================================================================

/*

Mock data is now complete and production-ready for:

✅ Page components (pages can query mock functions)
✅ UI components (can iterate on visual design)
✅ Chart components (have >100 data points to render)
✅ Database design (schema informed by relationships)

Next:
□ Build Supabase schema based on this design
□ Implement RLS policies
□ Set up migrations
□ Migrate mock query functions to real Supabase calls
□ (Later) Build admin seeding functions

NO CHANGES NEEDED to mock data structure.
It's intentional, comprehensive, realistic, and production-ready.

*/
