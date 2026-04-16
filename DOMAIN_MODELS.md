/**
 * DOMAIN MODELS - NUTRITIONIST APP
 * Complete TypeScript type definitions for Execute
 * 
 * This document explains the rationale behind each type and how they interact.
 */

// ============================================================================
// FILE ORGANIZATION
// ============================================================================

/*
src/lib/types/
├── common.ts           Shared enums and constants
├── client.ts           Client aggregates
├── plan.ts             Nutrition plans
├── checkin.ts          Weight & measurement tracking
├── adherence.ts        Plan adherence & execution
├── notes.ts            Professional annotations
├── activity.ts         Dashboard activity feed
└── index.ts            Central exports
*/

// ============================================================================
// DESIGN PRINCIPLES
// ============================================================================

/*
1. PRODUCT-FIRST TYPES
   Not modeled after database schema, but after product use cases.
   Example: ClientDetail includes computed fields (consecutiveDaysOnTrack),
   which are derived from adherence data but surfaced here because the UI
   needs them immediately.

2. CLARITY > DEDUPLICATION
   Some concepts appear in multiple types. That's intentional.
   - AdherenceEntry: Single day's record
   - AdherenceSummary: Weekly/monthly aggregate
   Both exist because the UI needs both.

3. REALISTIC SCOPE
   No premature fields for future features (multi-language, teams, etc).
   Focus on MVP: single professional, multiple clients, simple plans.

4. DISCRIMINATED UNIONS FOR STATUS
   CheckInStatus is split into CheckIn (completed) and ScheduledCheckIn
   (scheduled/missed). This prevents invalid state combinations.
   
   Example: You can't have a CheckIn without completedAt.
   The type system enforces this.

5. INPUT TYPES SEPARATE FROM MODELS
   CreateCheckInInput and CompleteCheckInInput are distinct.
   This makes API contracts explicit and prevents bugs.
*/

// ============================================================================
// TYPE CROSS-REFERENCE
// ============================================================================

/*

CLIENT RELATIONSHIPS:

   Client (base entity)
     ├── ClientSummary (list view)
     ├── ClientDetail (detail page)
     ├── CheckIn (weight/measurements)
     ├── AdherenceEntry (daily adherence)
     ├── ProfessionalNote (annotations)
     ├── ActivityItem (feed)
     └── Plan (active nutrition plan)


PLAN RELATIONSHIPS:

   Plan
     ├── WeeklySchedule
     │   └── DailyPlan[]
     │       └── PlanItem[] (meals/tasks)
     └── referenced by CheckIn & AdherenceEntry


TRACKING RELATIONSHIPS:

   CheckIn (completed weight + measurements)
     ├── WeightEntry
     └── MeasurementEntry[]

   ScheduledCheckIn (future check-in)
     └── Can become CheckIn


ADHERENCE RELATIONSHIPS:

   AdherenceEntry (single day)
     ├── Date
     ├── completedItems / totalItems
     └── adheres to Week of Plan

   AdherenceSummary (weekly/monthly)
     └── Multiple AdherenceEntry[]

   AdherenceTrend (compares periods)
     ├── current %
     ├── previous %
     └── direction


ACTIVITY RELATIONSHIPS:

   ActivityItem
     ├── ActivityType (what happened)
     └── ActivityEntity (what it relates to)
             ├── client
             ├── plan
             ├── checkin
             ├── note
             └── adherence


*/

// ============================================================================
// KEY TYPES EXPLAINED
// ============================================================================

/**
 * CLIENTSUMMARY
 * Purpose: Quick view in lists
 * Use cases: Clients list table, dashboard client cards
 * Key fields:
 *   - status: Derived from adherencePercentage (>75=onTrack, etc)
 *   - adherencePercentage: This week's average
 *   - consecutiveDaysOnTrack: Streak for motivation
 *   - latestWeight: Current weight
 *   - hasActivePlan: Can the client see their plan today?
 * 
 * Why this shape:
 *   Professional needs to scan 10+ clients and know:
 *   "Who needs my attention?" → status + adherence
 *   "Are they progressing?" → latestWeight + checkInDate
 *   "How recent?" → lastActivityDate
 */

/**
 * CLIENTDETAIL
 * Purpose: Complete view for decision-making
 * Use cases: Client detail page (the most important screen)
 * Key fields:
 *   - status + trends: Is this client improving or declining?
 *   - currentPlan: Which plan are they on?
 *   - weeklyAdherence + trend: Are they following the plan?
 *   - latestWeight + measurements: Are they making progress?
 *   - nextScheduledCheckIn: When is the next check-in?
 *   - lastNote: What was I observing about them?
 *
 * Why this shape:
 *   When professional opens a client detail, they need INSTANT clarity:
 *   1. Is this client on track?
 *   2. Are they making progress?
 *   3. Do I need to intervene?
 *   All data must be immediately visible without scrolling or fetching.
 */

/**
 * ADHERENCEENTRY
 * Purpose: Single day's execution record
 * Use cases: Charting, analytics, streak calculation
 * Key fields:
 *   - completedItems / totalItems: Did they do the meals?
 *   - adherencePercentage: Computed field (completedItems / totalItems * 100)
 *   - notStarted: Flag for "they didn't log anything today"
 *   - date: Which day
 *
 * Why this shape:
 *   This is granular, first-class data. Every feature depends on it:
 *   - Charts need 7+ days of entries
 *   - Trends are calculated by comparing entries
 *   - Streaks are counted by iterating entries
 *   - The client's status is derived from recent entries' percentages
 */

/**
 * CHECKIN
 * Purpose: A completed weight + measurement snapshot + professional feedback
 * Use cases: Weight chart, measurement table, check-in history
 * Key fields:
 *   - data: Actual weight & measurements recorded
 *   - status: Always 'completed' for CheckIn (never scheduled/missed)
 *   - completedAt: When they did it
 *   - professionalNotes: Professional's feedback
 *
 * Why discriminated union:
 *   A CheckIn and ScheduledCheckIn are fundamentally different:
 *   - CheckIn: MUST have completedAt and data
 *   - ScheduledCheckIn: MUST NOT have completedAt or data
 *   
 *   If we used a union status field, we'd have optional fields:
 *   ```
 *   data?: CheckInData  // might not exist
 *   ```
 *   
 *   But professional.ts with discriminated types:
 *   ```
 *   if (checkIn.status === 'completed') {
 *     checkIn.data  // TypeScript knows this exists
 *   }
 *   ```
 *   
 *   This prevents bugs where we try to render data that doesn't exist.
 */

/**
 * WEIGHENTRY & MEASUREMENTENTRY
 * Purpose: Individual measurement data points
 * Use cases: Charting weight/measurements over time
 * Why separate types:
 *   - Weight is singular (one value per recording)
 *   - Measurements are plural (waist, hips, chest, etc could be many)
 *   - They have different units and recording frequencies
 *   - Keeps data normalized and easy to query
 */

/**
 * PROFESSIONALNODE
 * Purpose: Internal annotations about a client
 * Use cases: Progress notes, intervention history, private observations
 * Key fields:
 *   - type: 'observation' | 'feedback' | 'intervention' | 'general'
 *   - relatedEntity: Links note to checkin/plan/adherence (optional)
 *   - tags: For filtering and searching
 *   - isPrivate: Professional-only (client doesn't see)
 *
 * Why this shape:
 *   Professional needs to record thoughts without:
 *   - Adding to formal check-in data
 *   - Having it visible to client
 *   - Losing context (what caused this thought?)
 *   
 *   Example note:
 *   {
 *     type: 'observation',
 *     content: 'Client mentioned stress about meal prep timing',
 *     relatedEntity: { type: 'checkin', id: '...' },
 *     tags: ['stress', 'meal-prep']
 *   }
 */

/**
 * PLANITEM
 * Purpose: Individual meal or task in a plan
 * Use cases: Rendering daily plan, checking off meals, 7-day view
 * Key fields:
 *   - type: 'meal' | 'task' (extensible for future: exercise, hydration, etc)
 *   - order: Position in the day (for rendering)
 *   - description: What is it? ("Grilled chicken with rice")
 *   
 * Why not complex:
 *   MVP is about adherence, not nutrition science.
 *   Plan items are just: names, descriptions, order.
 *   
 *   Future: Could add macros, ingredients, prep time, etc.
 *   No need now. Keeps schema simple.
 */

/**
 * ACTIVITYITEM
 * Purpose: Dashboard feed entry showing "what happened"
 * Use cases: Dashboard recent activity, alerting, timeline
 * Key fields:
 *   - type: What action? (client_added, checkin_completed, etc)
 *   - entity: What does it relate to? (client, plan, checkin, etc)
 *   - severity: 'info' | 'warning' | 'alert' (for color coding)
 *   - metadata: Change data (e.g., adherence dropped from 80% to 60%)
 *
 * Why this shape:
 *   Activity feed makes the system feel alive. The professional sees:
 *   - "Marco completed check-in: 78.5 kg"
 *   - "Giulia's adherence dropped to 40% this week" (alert)
 *   - "New client: Francesco" (info)
 *   
 *   This helps professional understand what's happening without deep diving.
 */

/**
 * SCHEDULEDCHECKIN
 * Purpose: Check-in that's on the calendar
 * Use cases: Upcoming check-ins list, reminders, due dates
 * Note:
 *   Separate from CheckIn because their states are mutually exclusive.
 *   ScheduledCheckIn never becomes CheckIn; we create a new CheckIn
 *   and mark ScheduledCheckIn as 'completed' or 'missed'.
 */

// ============================================================================
// ENUMS (IN common.ts)
// ============================================================================

/*

ClientStatus: Based on adherence %
  - OnTrack (>= 75%)      → Green
  - Warning (50-75%)      → Orange
  - AtRisk (< 50%)        → Red
  - Inactive (no activity) → Gray

Trend: Direction of change
  - Up:     getting better
  - Down:   getting worse
  - Neutral: stable

CheckInStatus: State of a check-in
  - Scheduled: waiting
  - Completed: recorded
  - Missed:    not done

PlanItemType: What is this item?
  - Meal: nutrition item
  - Task: non-nutrition task (future: exercise, hydration, etc)

ActivityType: What happened?
  - client_added
  - plan_assigned
  - checkin_completed
  - checkin_missed
  - note_added
  - adherence_drop
  - plan_updated

MeasurementType: Which measurement?
  - waist, hips, chest, thigh, arm, legs, back

*/

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

GETTING CLIENTS FOR DASHBOARD:

  const clients: ClientSummary[] = getAllClients()
  
  clients.map(c => ({
    name: c.name,
    status: c.status,  // onTrack, warning, or atRisk
    adherence: c.adherencePercentage,
    weight: c.latestWeight,
    lastCheckIn: c.latestCheckInDate
  }))


OPENING CLIENT DETAIL:

  const client: ClientDetail = getClientDetail(clientId)
  
  // Navbar
  render(client.name, client.status, client.weeklyAdherence)
  
  // Adherence chart
  render(client.weeklyAdherence, client.weeklyAdherenceTrend)
  
  // Weight chart
  render(client.latestWeight)
  
  // Current plan
  if (client.currentPlan) render(client.currentPlan)
  
  // Next check-in
  if (client.nextScheduledCheckInDate) render(client.nextScheduledCheckInDate)


RECORDING A CHECK-IN:

  const input: CompleteCheckInInput = {
    scheduledCheckInId: '...',
    weight: { value: 78.5, unit: 'kg' },
    measurements: [
      { type: 'waist', value: 85, unit: 'cm' },
      { type: 'hips', value: 95, unit: 'cm' }
    ],
    notes: 'Client feeling good about progress'
  }
  
  const checkIn: CheckIn = completeCheckIn(input)
  
  // Now checkIn.data.weight exists and is non-null


FILTERING ACTIVITIES:

  const feed = getActivityFeed({
    severity: 'alert',
    dateRange: { from: weekAgo, to: now }
  })
  
  feed.items.map(item => ({
    type: item.type,           // 'adherence_drop', 'checkin_missed'
    client: item.entity.name,
    description: item.description,
    isRead: item.isRead
  }))

*/

// ============================================================================
// MIGRATION NOTES (from first types)
// ============================================================================

/*

OLD → NEW:

Client.status → ClientStatus enum (moved to common.ts, now type safe)
Client.latestAdherence → ClientSummary.adherencePercentage (clearer name)
CreateClientInput.notes → Removed (notes live in ProfessionalNote table)

DailyAdherence → AdherenceEntry (clearer naming)
ClientAdherenceSummary → AdherenceSummary (removed "Client" prefix)

CheckIn with status: 'scheduled' | 'completed' | 'missed'
  → CheckIn (completed only) | ScheduledCheckIn (scheduled/missed)
  → Type-safe, prevents invalid combinations

Measurements object → MeasurementEntry[] (more flexible and normalizable)

NEW TYPES ADDED:

ClientSummary (for list views)
ClientDetail (for detail view)
WeightEntry (for charting)
ProfessionalNote (for annotations)
ActivityItem (for dashboard)
CreatePlanInput / UpdatePlanInput (for explicit API contracts)
CompleteCheckInInput (for check-in recording)

*/

// ============================================================================
// NEXT STEPS
// ============================================================================

/*

These types are now ready for:
1. Page components (importing ClientDetail, ClientSummary, etc)
2. Mock data generators (implementing getClientDetail(), etc)
3. Chart components (consuming AdherenceEntry[], WeightEntry[], etc)
4. Form components (using Create*Input types)
5. Supabase schema design (tables will match these types)

No changes to types needed until new features or product decisions warrant it.

*/
