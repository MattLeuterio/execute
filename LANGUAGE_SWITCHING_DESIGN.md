# Language Switching Design - Execute MVP

## Overview
Language switching allows users (nutritionists) to toggle between Italian (default) and English. The language preference is determined by the URL pathname (`/it/*` or `/en/*`) with optional user preference persistence.

## Current Architecture (Phase 1)

### Source of Truth: URL Pathname
- **No React Context** - Avoids over-engineering and unnecessary re-renders
- **Route-based**: Everything is in the `[locale]` dynamic segment
- Language extracted from `params.locale` in each async page component
- Example URLs:
  - `/it/nutritionist/dashboard` → Italian
  - `/en/nutritionist/dashboard` → English

### Data Flow
```
URL [/locale] Parameter
    ↓
Extracted in page.tsx (server)
    ↓
Passed to getTranslations(category, locale)
    ↓
Returns t object (translations)
    ↓
Threaded to child components (client)
```

## Settings Page Implementation (Phase 2)

### User Preference Model

Create `src/lib/data/mock-user.ts`:
```typescript
export type UserPreferences = {
  language: 'it' | 'en'
  theme?: 'dark' | 'light'  // Future
}

export type NutritionistUser = {
  id: string
  name: string
  email: string
  preferences: UserPreferences
}

export function getMockUser(): NutritionistUser {
  return {
    id: 'user-nutritionist-1',
    name: 'Dr. Maria Rossi',
    email: 'maria@execute.nutrition',
    preferences: {
      language: 'it',
    }
  }
}
```

### Settings Page Component

**File**: `src/app/[locale]/nutritionist/settings/page.tsx`

```typescript
import { getMockUser } from '@/lib/data/mock-user'
import { SettingsPageClient } from './_components/settings-page-client'
import { getTranslations, type Locale } from '@/lib/i18n'

interface SettingsPageProps {
  params: Promise<{ locale: string }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params
  const t = getTranslations('nutritionist', locale as Locale)
  const user = getMockUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.settings.header}</h1>
        <p className="mt-2 text-sm text-foreground/60">{t.settings.subtitle}</p>
      </div>

      <SettingsPageClient user={user} locale={locale} t={t} />
    </div>
  )
}
```

### Language Toggle Component

**File**: `src/app/[locale]/nutritionist/settings/_components/language-toggle.tsx`

```typescript
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  currentLocale: string
  t: any
}

export function LanguageToggle({ currentLocale, t }: LanguageToggleProps) {
  const pathname = usePathname()
  
  // Replace locale in pathname
  const getNewPath = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale // Replace /[locale]
    return segments.join('/')
  }

  const targetLocale = currentLocale === 'it' ? 'en' : 'it'
  const targetLabel = targetLocale === 'it' ? 'Italiano' : 'English'

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/30 bg-background/30 p-6">
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-foreground/70" />
        <div>
          <p className="font-medium text-foreground">{t.settings.language.label}</p>
          <p className="text-xs text-foreground/50">{t.settings.language.description}</p>
        </div>
      </div>

      <Link href={getNewPath(targetLocale)}>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {targetLabel}
        </Button>
      </Link>
    </div>
  )
}
```

### i18n Keys Needed

Add to `src/lib/i18n/nutritionist.ts`:

```typescript
settings: {
  header: "Impostazioni",
  subtitle: "Gestisci il tuo account e le preferenze",
  language: {
    label: "Lingua",
    description: "Scegli la lingua dell'interfaccia",
  },
},
```

## Navigation Flow

**Current (URL-only)**:
```
URL changes → [locale] param updates → page re-renders → new translations loaded
```

**Future (With Preference Persistence)**:
```
User clicks language toggle in Settings
    ↓
Save preference to database (optional)
    ↓
Navigate to new URL (/en/nutritionist/settings)
    ↓
Page loads in new language
```

## Phase 3: Middleware (Future)

When implementing user preference persistence, add middleware to auto-redirect:

**File**: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { isLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const localePattern = /^\/([a-z]{2})(\/|$)/
  const match = pathname.match(localePattern)

  // If no locale in URL, redirect to user's preferred language
  if (!match) {
    const locale = getUserPreferredLocale(request) // From cookies/auth
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|public|static).*)']
}
```

## Testing Checklist

- [ ] `/it/nutritionist/dashboard` renders Italian text
- [ ] `/en/nutritionist/dashboard` renders English text
- [ ] Settings page visible at `/it/nutritionist/settings`
- [ ] Language toggle button appears in Settings
- [ ] Clicking toggle navigates to `/en/nutritionist/settings` (or vice versa)
- [ ] All dashboard content responsive at mobile/tablet/desktop

## File Summary

### Files to Create (Phase 2)
1. `src/lib/data/mock-user.ts` - User model with preferences
2. `src/app/[locale]/nutritionist/settings/_components/language-toggle.tsx` - Toggle component
3. `src/app/[locale]/nutritionist/settings/_components/settings-page-client.tsx` - Settings wrapper
4. Update `src/lib/i18n/nutritionist.ts` - Add `settings` translations

### Translation Structure
```
nutritionist: {
  settings: {
    header: "...",
    subtitle: "...",
    language: {
      label: "...",
      description: "..."
    }
  }
}
```

## Notes

- ✅ **No React Context** - Language is URL-driven (decoupled, testable, no state management complexity)
- ✅ **Type-safe** - `getTranslations()` uses overloads, IDE autocompletion works
- ✅ **Scalable** - Adding new languages only requires duplicate i18n structure (`nutritionist.ts` grows horizontally)
- ⏳ **User Preference Persistence** - Deferred to Phase 3 when database is ready
- ⏳ **Middleware Auto-redirect** - Requires auth/cookie integration (Phase 3)

