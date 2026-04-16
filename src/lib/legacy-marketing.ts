/**
 * legacy-marketing.ts - Keep old marketing content exports for backward compat
 * The main translations have moved to i18n/marketing.ts
 */

import { marketingTranslations } from "./i18n/marketing"

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

export const marketingContent = {
  it: {
    stepLabel: "Passo",
    previewCards: [
      {
        title: "Today",
        subtitle: "Cliente",
        completion: "75% completato",
        meals: [
          { label: "Colazione · completata", done: true },
          { label: "Pranzo · completato", done: true },
          { label: "Cena · in sospeso" },
        ],
      },
      {
        title: "Piano",
        subtitle: "Vista settimanale",
        completion: "7 giorni",
        meals: [
          { label: "Lunedì", done: true },
          { label: "Martedì", done: true },
          { label: "Mercoledì" },
        ],
      },
      {
        title: "Progressi",
        subtitle: "Aderenza",
        completion: "12 giorni di streak",
        meals: [
          { label: "Questa settimana · 83%" },
          { label: "Scorsa settimana · 79%" },
          { label: "Trend costanza · stabile" },
        ],
      },
    ] as PreviewCardContent[],
    pricingCards: [
      {
        plan: "starter",
        name: "Starter",
        price: "€9",
        period: "/mese",
        description: marketingTranslations.it.starterDesc,
        highlights: [
          "Fino a 10 clienti",
          "Schermate core app cliente",
          "Riepilogo aderenza settimanale",
        ],
      },
      {
        plan: "growth",
        name: "Growth",
        price: "€19",
        period: "/mese",
        description: marketingTranslations.it.growthDesc,
        highlights: [
          "Fino a 40 clienti",
          "Workspace cliente + nutrizionista",
          "Aggiornamenti prodotto prioritari",
        ],
        featured: true,
      },
      {
        plan: "studio",
        name: "Studio",
        price: "€39",
        period: "/mese",
        description: marketingTranslations.it.studioDesc,
        highlights: [
          "Fino a 120 clienti",
          "Accesso multi-professionista",
          "Supporto onboarding dedicato",
        ],
      },
    ] as PricingCardContent[],
  },
  en: {
    stepLabel: "Step",
    previewCards: [
      {
        title: "Today",
        subtitle: "Client",
        completion: "75% done",
        meals: [
          { label: "Breakfast · completed", done: true },
          { label: "Lunch · completed", done: true },
          { label: "Dinner · pending" },
        ],
      },
      {
        title: "Plan",
        subtitle: "Weekly view",
        completion: "7 days",
        meals: [
          { label: "Monday", done: true },
          { label: "Tuesday", done: true },
          { label: "Wednesday" },
        ],
      },
      {
        title: "Progress",
        subtitle: "Adherence",
        completion: "12-day streak",
        meals: [
          { label: "This week · 83%" },
          { label: "Last week · 79%" },
          { label: "Consistency trend · stable" },
        ],
      },
    ] as PreviewCardContent[],
    pricingCards: [
      {
        plan: "starter",
        name: "Starter",
        price: "€9",
        period: "/month",
        description: marketingTranslations.en.starterDesc,
        highlights: [
          "Up to 10 clients",
          "Client app core screens",
          "Weekly adherence summary",
        ],
      },
      {
        plan: "growth",
        name: "Growth",
        price: "€19",
        period: "/month",
        description: marketingTranslations.en.growthDesc,
        highlights: [
          "Up to 40 clients",
          "Client + nutritionist workspaces",
          "Priority product updates",
        ],
        featured: true,
      },
      {
        plan: "studio",
        name: "Studio",
        price: "€39",
        period: "/month",
        description: marketingTranslations.en.studioDesc,
        highlights: [
          "Up to 120 clients",
          "Multi-practitioner access",
          "Dedicated onboarding support",
        ],
      },
    ] as PricingCardContent[],
  },
} as const

export const insightsContent = {
  it: {
    weekPointPrefix: "S",
    tooltipLabelPrefix: "Settimana",
    adherenceLabel: "Aderenza",
    weightLabel: "Peso",
    waistLabel: "Vita",
    hipsLabel: "Fianchi",
    chestLabel: "Torace",
  },
  en: {
    weekPointPrefix: "W",
    tooltipLabelPrefix: "Week",
    adherenceLabel: "Adherence",
    weightLabel: "Weight",
    waistLabel: "Waist",
    hipsLabel: "Hips",
    chestLabel: "Chest",
  },
} as const

export const formContent = {
  it: {
    requiredOptionMessage: "Seleziona un'opzione.",
    minNameMessage: "Il nome deve avere almeno 2 caratteri.",
    invalidEmailMessage: "Inserisci un'email valida.",
    namePlaceholder: "Mario Rossi",
    submittingLabel: "Accesso in corso...",
    consentLabel: "Accetto la Privacy Policy e i Termini",
    consentRequiredMessage: "Devi accettare la Privacy Policy e i Termini",
  },
  en: {
    requiredOptionMessage: "Please choose an option.",
    minNameMessage: "Name must be at least 2 characters.",
    invalidEmailMessage: "Please enter a valid email.",
    namePlaceholder: "John Doe",
    submittingLabel: "Getting early access...",
    consentLabel: "I agree to the Privacy Policy and Terms",
    consentRequiredMessage: "You must accept the Privacy Policy and Terms",
  },
} as const
