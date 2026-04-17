/**
 * i18n.ts - Central i18n export with backward compatibility
 * 
 * New structure:
 * - src/lib/i18n/marketing.ts - Landing page translations
 * - src/lib/i18n/nutritionist.ts - App translations
 * - src/lib/i18n/client.ts - Client app (future)
 * - src/lib/i18n/index.ts - Helper functions
 * 
 * This file acts as main entry point for backward compatibility
 */

export {
  getTranslations,
  isLocale,
  supportedLocales,
  defaultLocale,
  languageUi,
  type Locale,
  type Category,
  type CategoryTranslations,
  type NutritionistTranslations,
  marketingTranslations,
  nutritionistTranslations,
  clientTranslations,
} from "./i18n/index"

// Re-export for backward compatibility with existing code that imports from lib/i18n
export { marketingContent, insightsContent, formContent } from "./legacy-marketing"

// Re-export translations as a keyed object for backward compatibility
export { marketingTranslations as translations } from "./i18n/marketing"

export type PreviewCardContent = {
  title: string
  subtitle: string
  completion: string
  meals: Array<{ label: string; done?: boolean }>
}

export type InterestedPlan = "starter" | "growth" | "studio"

export type PricingCardContent = {
  plan: InterestedPlan
  name: string
  price: string
  period: string
  description: string
  highlights: string[]
  featured?: boolean
}

export type Language = "it" | "en"
