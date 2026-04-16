/**
 * PROJECT STRUCTURE & ARCHITECTURE
 * Execute - Nutritionist App
 * 
 * This document outlines the folder structure, naming conventions, and design rationale.
 */

// ============================================================================
// OVERVIEW
// ============================================================================
//
// The project follows a domain-driven, feature-based structure with clear
// separation between:
// - Route pages (Next.js App Router)
// - Feature components (route-specific UI)
// - Shared UI components (shadcn-style, reusable)
// - Domain logic (types, data, utilities)

// ============================================================================
// FOLDER STRUCTURE
// ============================================================================

src/
├── app/                                   Main application routes
│   ├── layout.tsx                         Root layout
│   ├── page.tsx                           Root page (redirect to /dashboard)
│   ├── globals.css                        Global styles
│   │
│   ├── (auth)/                            Auth group - login pages
│   │   ├── layout.tsx
│   │   └── login/
│   │       ├── page.tsx
│   │       └── _components/               Auth-specific components (if needed)
│   │
│   └── (app)/                             App group - main nutritionist interface
│       ├── layout.tsx                     App layout (sidebar/nav, wrapper)
│       ├── _components/                   Shared layout components
│       │   ├── app-sidebar.tsx            Desktop sidebar navigation
│       │   ├── app-bottom-nav.tsx         Mobile bottom tab bar
│       │   ├── app-header.tsx             Top header (mobile)
│       │   └── responsive-layout.tsx      Layout wrapper for responsive
│       │
│       ├── dashboard/
│       │   ├── page.tsx                   Dashboard page
│       │   └── _components/
│       │       ├── kpi-card.tsx           Individual KPI card
│       │       ├── clients-at-risk.tsx    At-risk clients section
│       │       └── recent-activity.tsx    Recent activity feed
│       │
│       ├── clients/
│       │   ├── page.tsx                   Clients list page
│       │   ├── new/
│       │   │   └── page.tsx               Add client page
│       │   ├── _components/
│       │   │   ├── clients-table.tsx      Desktop table view
│       │   │   ├── clients-list.tsx       Mobile list view
│       │   │   └── client-filter.tsx      Filter controls
│       │   │
│       │   └── [clientId]/
│       │       ├── page.tsx               Client detail page
│       │       ├── _components/
│       │       │   ├── client-header.tsx       Client name, status, adherence
│       │       │   ├── adherence-section.tsx   Adherence chart + trend
│       │       │   ├── checkins-section.tsx    List of check-ins
│       │       │   ├── notes-section.tsx       Notes + history
│       │       │   ├── weights-chart.tsx       Weight tracking chart
│       │       │   └── measurements-section.tsx Measurements table
│       │       │
│       │       ├── plan/
│       │       │   └── page.tsx           Edit plan page
│       │       │
│       │       └── checkins/
│       │           └── new/
│       │               └── page.tsx       Schedule/add check-in page
│       │
│       ├── checkins/
│       │   ├── page.tsx                   Check-ins overview page
│       │   ├── new/
│       │   │   └── page.tsx               Schedule new check-in
│       │   └── _components/
│       │       └── checkins-list.tsx      Split upcoming/past check-ins
│       │
│       └── settings/
│           ├── page.tsx                   Settings page
│           └── _components/
│               └── settings-form.tsx      Settings form
│
├── components/                            Shared, reusable components
│   ├── ui/                                Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   ├── separator.tsx
│   │   ├── checkbox.tsx
│   │   └── [other shadcn components...]
│   │
│   ├── charts/                            Chart components (Recharts)
│   │   ├── adherence-chart.tsx           Weekly adherence line/bar
│   │   ├── weight-chart.tsx              Weight trend over time
│   │   ├── measurement-chart.tsx         Measurements trend
│   │   └── chart-utils.ts                Shared chart utilities
│   │
│   ├── forms/                             Complex form components
│   │   ├── add-client-form.tsx           New client form
│   │   ├── edit-plan-form.tsx            Edit plan form
│   │   ├── add-checkin-form.tsx          Record check-in
│   │   └── schedule-checkin-form.tsx     Schedule check-in
│   │
│   └── common/                            Common UI elements
│       ├── empty-state.tsx                Empty state placeholder
│       ├── loading-skeleton.tsx           Skeleton loaders
│       └── status-badge.tsx               Status badge (onTrack/warning/atRisk)
│
├── lib/                                   Business logic, types, data
│   ├── types/                             Domain types
│   │   ├── client.ts                     Client domain model
│   │   ├── plan.ts                       Plan domain model
│   │   ├── checkin.ts                    Check-in domain model
│   │   ├── adherence.ts                  Adherence domain model
│   │   └── index.ts                      Centralized export
│   │
│   ├── data/                              Mock data (development)
│   │   ├── mock-clients.ts               Mock client data + queries
│   │   ├── mock-plans.ts                 Mock plan data + queries
│   │   ├── mock-checkins.ts              Mock check-in data + queries
│   │   └── mock-adherence.ts             Mock adherence data + queries
│   │
│   ├── utils.ts                           General utilities
│   ├── constants.ts                       App constants (colors, dates, etc)
│   │
│   └── supabase/                          Supabase integration (future)
│       ├── client.ts                     Supabase client setup
│       └── admin.ts                      Admin/service role setup
│
└── hooks/                                 Custom React hooks
    └── use-language.ts                   (existing)


// ============================================================================
// NAMING CONVENTIONS
// ============================================================================

Route Pages:
- /app/(app)/dashboard/page.tsx
  → Component exports "Dashboard" or unnamed export
  → Keep minimal; mostly container
  → Delegates to _components for actual UI

Route-specific Components (inside _components/):
- Use descriptive names: client-header.tsx, adherence-section.tsx
- These live as siblings to page.tsx in _components/
- They are re-exported or directly used by their page
- Example: clients-table.tsx (desktop table for clients list)

Shared Components (components/):
- Use descriptive, generic names
- chart-utils.ts (utilities for charts)
- status-badge.tsx (reusable status display)
- add-client-form.tsx (the form itself, reusable anywhere)

Domain Types (lib/types/):
- One file per domain: client.ts, plan.ts, checkin.ts, adherence.ts
- Named as PascalCase for interfaces/types
- Export from lib/types/index.ts

Mock Data (lib/data/):
- One file per domain
- MOCK_ prefix for arrays
- Helper functions for queries (getClientById, getAdherenceByClientId, etc)
- Simulate realistic data patterns


// ============================================================================
// COMPONENT CATEGORIZATION
// ============================================================================

TYPE 1: PAGE COMPONENTS
Location: src/app/*/page.tsx
Purpose: Route entry point, minimal logic
Rules:
  - Import from _components for display logic
  - Keep thin; mostly data fetching and layout
  - Use Server Components where possible

TYPE 2: ROUTE FEATURE COMPONENTS (_components/)
Location: src/app/*/[route]/_components/
Purpose: UI logic specific to a route/feature
Rules:
  - Focused on a single feature or view
  - Can be quite complex
  - Not reused outside their route
  - Example: client-header.tsx (only used in client detail)

TYPE 3: SHARED UI COMPONENTS
Location: src/components/ui/
Purpose: Base UI primitives from shadcn
Rules:
  - Highly reusable, minimal logic
  - Styled with Tailwind
  - No business logic
  - Example: badge.tsx, button.tsx

TYPE 4: DOMAIN-SPECIFIC COMPONENTS
Location: src/components/charts/, src/components/forms/, src/components/common/
Purpose: Reusable components that are business-aware but not route-specific
Rules:
  - Can be used in multiple routes
  - Can contain business logic (but not route-specific)
  - Example: adherence-chart.tsx (used in dashboard and client detail)

TYPE 5: LAYOUT COMPONENTS (_components/ inside (app) group)
Location: src/app/(app)/_components/
Purpose: App-wide layout structure
Rules:
  - app-sidebar.tsx (desktop navigation)
  - app-bottom-nav.tsx (mobile tabs)
  - These wrap all pages in the (app) group


// ============================================================================
// DATA FLOW
// ============================================================================

Current Development Phase (Mock Data):

┌─────────────────────┐
│   page.tsx          │  Route page (thin)
│                     │  Imports data from lib/data
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   _components/      │  Feature components
│   - client-header   │  Use data in props
│   - section-x       │  Handle UI state
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   components/       │  Shared UI
│   - ui/*            │  Dumb components
│   - charts/*        │  Business-aware but generic
└─────────────────────┘

┌─────────────────────┐
│   lib/data/         │  Mock data
│   mock-*.ts         │  Queries (getClientById, etc)
└─────────────────────┘

┌─────────────────────┐
│   lib/types/        │  Domain types
│   - client.ts       │  Shared interfaces
│   - plan.ts         │  Used everywhere
└─────────────────────┘


Future Integration with Supabase:

Page → _components → Shared UI
                ▲
                │
    ┌───────────┴────────────┐
    │                        │
┌───────────┐        ┌──────────────┐
│ lib/data/ │        │ Supabase API │
│  (cached) │        │ (real data)  │
└───────────┘        └──────────────┘

No change to component structure. Data layer swaps.


// ============================================================================
// RATIONALE: WHY THIS STRUCTURE?
// ============================================================================

1. CLEAR SEPARATION OF CONCERNS
   - Routes own their pages but delegate display to _components
   - _components focus on presentation, not routing
   - Shared components are business-aware but generic
   - Types and data are centralized for consistency

2. SCALABILITY WITHOUT OVERENGINEERING
   - Not too many layers; 3-4 max (page → feature → shared → ui)
   - Easy to find code: route → _components location
   - Easy to refactor: component is where it's used
   - Mock data modules are drop-in replaceable with real API

3. PRODUCTION-FRIENDLY
   - Folder names match their purpose (customers understand _components)
   - No premature abstraction (no /features folder until needed)
   - Type-safe from day one (TypeScript + centralized types)
   - Clear boundaries prevent spaghetti code

4. NEXT.JS APP ROUTER BEST PRACTICES
   - (auth) and (app) route groups separate concerns
   - _components folders are sibling to pages, not a separate layer
   - _components are private convention (not exported from layout)
   - Types and lib are shared, not duplicated

5. MOBILE-FIRST RESPONSIVE
   - Components accept responsive props
   - No separate mobile components folder; same component, different styles
   - Chart components reduce graph count on mobile via Recharts
   - Lists exist in both desktop (table) and mobile (cards) variants


// ============================================================================
// WORKING WITH THIS STRUCTURE
// ============================================================================

Adding a new route:

1. Create src/app/(app)/[feature]/page.tsx (thin)
2. Create src/app/(app)/[feature]/_components/ folder
3. Create feature-specific components in _components/
4. Import data from lib/data/mock-*.ts
5. Use types from lib/types/index.ts
6. Use shared UI from components/ui/, charts/, forms/

Adding a new shared component:

1. Is it a form? → src/components/forms/[name].tsx
2. Is it a chart? → src/components/charts/[name].tsx
3. Is it a common pattern? → src/components/common/[name].tsx
4. Is it base UI? → src/components/ui/[name].tsx (shadcn)

Adding a new type:

1. Belongs to a domain? → src/lib/types/[domain].ts
2. Export from index.ts
3. Add mock data to src/lib/data/mock-[domain].ts

Adding mock data queries:

1. Add to src/lib/data/mock-[domain].ts
2. Follow naming: getClientById(), getAdherenceByClientId()
3. Sort/filter as needed
4. Export and import in pages/components


// ============================================================================
// CURRENT STATUS
// ============================================================================

✅ Directories created
✅ Type definitions (client, plan, checkin, adherence)
✅ Mock data generators and query functions
✅ Route structure in place

⏳ Next:
□ Page components (page.tsx files)
□ Feature components (_components/)
□ Layout wrapper (app-sidebar, app-bottom-nav)
□ Shared UI components (from shadcn)
□ Chart components (Recharts-based)
□ Form components
□ Responsive design & styling

