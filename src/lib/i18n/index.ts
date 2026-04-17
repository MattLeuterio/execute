import { marketingTranslations } from "./marketing"
import { nutritionistTranslations } from "./nutritionist"
import { clientTranslations } from "./client"

export type Locale = "it" | "en"
export type Category = "marketing" | "nutritionist" | "client"

type TranslationsByCategory = {
  marketing: typeof marketingTranslations
  nutritionist: typeof nutritionistTranslations
  client: typeof clientTranslations
}

export type CategoryTranslations<C extends Category> =
  TranslationsByCategory[C][Locale]

export { marketingTranslations, nutritionistTranslations, clientTranslations }
export type { NutritionistTranslations } from "./nutritionist"

/**
 * Get translations for a specific category and locale
 * @example getTranslations('nutritionist', 'it').dashboard.header
 */
export function getTranslations<C extends Category>(
  category: C,
  locale: Locale
): CategoryTranslations<C> {
  const translations: TranslationsByCategory = {
    marketing: marketingTranslations,
    nutritionist: nutritionistTranslations,
    client: clientTranslations,
  }
  return translations[category][locale]
}

export const supportedLocales = ["it", "en"] as const
export const defaultLocale: Locale = "it"

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}

// Backward compatibility
export const languageUi = {
  it: {
    switchAriaLabel: "Passa alla lingua italiana",
  },
  en: {
    switchAriaLabel: "Switch language to English",
  },
} as const
