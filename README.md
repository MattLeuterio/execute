# Execute

Execute is a discipline-first product focused on nutritional plan adherence.

Core principle: people usually do not fail because the plan is bad, they fail because they do not follow it consistently.

## Product Direction

- Public brand name: Execute
- Domain: executebase.com
- Positioning: B2B SaaS for nutritionists and coaches, with client app included
- Brand line: Follow your plan. Step by step.
- Support line: The simplest way to help your clients stick to their diet.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/base-ui components
- Supabase (planned for auth, database, RLS)
- React Hook Form + Zod (planned for forms)

## Project Structure (Phase 1)

- `src/app/(marketing)`
	- Public landing page
- `src/app/(app)/app`
	- Private client area shell and MVP placeholders (`today`, `plan`, `progress`)
- `src/components/marketing`
	- Reusable landing components
- `src/components/private`
	- Reusable private app shell components

Route groups are used to keep marketing and private app concerns separated from day one.
Current private entry path is `/app`, with future split to `app.executebase.com` planned.

## Local Development

Run the development server:

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## MVP Scope Notes

Phase 1 focuses on:

1. Landing foundation and value proposition clarity.
2. Information architecture and route foundations.
3. Design system direction (dark premium baseline + calm green accent).

Out of scope in this phase:

- calorie databases
- barcode scanning
- advanced analytics
- AI plan generation
- payments and billing
- community/social features
