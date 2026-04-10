export const translations = {
  it: {
    brand: "Execute",

    heroTitle1: "Segui il tuo piano",
    heroTitle2: "Un passo alla volta",
    heroSubtitle:
      "Smetti di chiederti se i clienti seguono il piano. Vedi l’aderenza reale, ogni giorno.",

    problemLabel: "Problema",
    problemText:
      "Le persone non falliscono perché il piano è sbagliato.",
    problemDescription:
      "Falliscono perché, giorno dopo giorno, perdono continuità nell’esecuzione.",
    problemHighlight: "Pensato per professionisti della nutrizione.",

    howItWorks: "Come funziona",
    howTitle: "Un ciclo semplice per la costanza",

    step1Title: "Crea un piano semplice",
    step1Desc:
      "I nutrizionisti assegnano pasti chiari, senza inserimenti complessi o configurazioni inutili.",

    step2Title: "Seguilo ogni giorno",
    step2Desc:
      "I clienti aprono Today, vedono cosa hanno fatto e completano ciò che manca in pochi tocchi.",

    step3Title: "Monitora l’aderenza reale",
    step3Desc:
      "I progressi si misurano sulla costanza di esecuzione, così i professionisti possono intervenire presto.",

    productPreview: "Anteprima",
    productTitle: "Progettato per il completamento quotidiano",
    productDesc:
      "Today, piano e progressi mostrano cosa fare ora e quanto manca per completare la giornata.",

    insightsLabel: "Insight",
    insightsTitle: "Vedi cosa sta succedendo davvero",
    insightsDesc:
      "Non solo piani. Visibilità reale su aderenza, progresso e andamento.",

    adherenceOverTimeTitle: "Aderenza nel tempo",
    adherenceOverTimeDesc:
      "Vedi se i clienti sono costanti, stanno migliorando o stanno perdendo continuità.",

    weightTrendTitle: "Andamento del peso",
    weightTrendDesc:
      "Monitora le variazioni di peso tra check-in ed esecuzione quotidiana.",

    bodyMeasurementsTitle: "Misure corporee",
    bodyMeasurementsDesc:
      "Confronta i cambiamenti del corpo oltre al solo peso.",

    pricing: "Prezzi",
    pricingTitle: "Piani semplici per professionisti della nutrizione",
    pricingNote: "Prezzi in anteprima. I piani finali potrebbero cambiare.",

    starterDesc:
      "Per professionisti che vogliono validare un flusso di aderenza semplice.",
    growthDesc:
      "Per la gestione quotidiana di più clienti attivi e del loro progresso.",
    studioDesc: "Per team che gestiscono un numero più ampio di piani.",

    cta: "Richiedi accesso anticipato",

    finalTitle: "Inizia a costruire aderenza, un giorno alla volta.",
    finalDesc:
      "Execute aiuta i tuoi clienti a fare ciò che conta: seguire con costanza il piano che hanno già.",

    modalTitle: "Accedi in anticipo a Execute",
    modalDesc: "Tra i primi professionisti della nutrizione a provare Execute.",

    name: "Nome",
    email: "Email",
    areYouPro: "Sei un professionista della nutrizione?",
    yes: "Sì",
    no: "No",

    message: "Messaggio (opzionale)",
    messagePlaceholder: "Se vuoi, lasciaci una nota",

    requestFieldsObligatory: "I campi contrassegnati con * sono obbligatori.",

    submit: "Accedi in anticipo",

    success: "Sei dentro. Ti contatteremo presto per l’accesso.",
    error: "Qualcosa non ha funzionato. Riprova.",
  },
  en: {
    brand: "Execute",

    heroTitle1: "Follow your plan",
    heroTitle2: "Step by step",
    heroSubtitle:
      "Stop guessing if your clients are following the plan. See real adherence, every day.",

    problemLabel: "Problem",
    problemText:
      "People don’t fail because the plan is wrong.",
    problemDescription:
      "They fail because, day by day, they lose consistency in execution.",
    problemHighlight: "Built for nutrition professionals.",

    howItWorks: "How it works",
    howTitle: "A simple loop for consistency",

    step1Title: "Create a simple plan",
    step1Desc:
      "Nutritionists assign clear daily meals without complex data entry or distracting setup.",

    step2Title: "Follow it every day",
    step2Desc:
      "Clients open Today, check what is done, and complete what is missing in a few taps.",

    step3Title: "Track real adherence",
    step3Desc:
      "Progress is measured by execution consistency so professionals can intervene early.",

    productPreview: "Product preview",
    productTitle: "Built for daily completion",
    productDesc:
      "Today, plan and progress are designed to answer what to do now and how close the day is to completion.",

    insightsLabel: "Insights",
    insightsTitle: "See what’s really happening",
    insightsDesc:
      "Not just plans. Real visibility on adherence, progress, and trends.",

    adherenceOverTimeTitle: "Adherence over time",
    adherenceOverTimeDesc:
      "See if clients are consistent, improving, or slowly dropping off.",

    weightTrendTitle: "Weight trend",
    weightTrendDesc:
      "Track weight changes across check-ins and daily execution.",

    bodyMeasurementsTitle: "Body measurements",
    bodyMeasurementsDesc: "Compare body changes beyond weight alone.",

    pricing: "Pricing",
    pricingTitle: "Simple plans for nutrition professionals",
    pricingNote: "Early pricing preview. Final plans may evolve.",

    starterDesc: "For professionals validating a focused adherence workflow.",
    growthDesc: "For daily operations with more active clients and workflows.",
    studioDesc: "For teams managing a larger portfolio of plans.",

    cta: "Request early access",

    finalTitle: "Start building adherence, one day at a time.",
    finalDesc:
      "Execute helps your clients do what matters most: follow the plan they already have.",

    modalTitle: "Get early access to Execute",
    modalDesc: "Be among the first nutrition professionals testing Execute.",

    name: "Name",
    email: "Email",
    areYouPro: "Are you a nutrition professional?",
    yes: "Yes",
    no: "No",
    message: "Message",
    messagePlaceholder: "Anything you'd like us to know",

    requestFieldsObligatory: "Fields marked with * are required.",

    submit: "Get early access",

    success: "You're in. We’ll reach out soon with early access.",
    error: "Something went wrong. Please try again.",
  },
} as const;

export type PreviewCardContent = {
  title: string
  subtitle: string
  completion: string
  meals: Array<{ label: string; done?: boolean }>
}

export type PricingCardContent = {
  name: string
  price: string
  period: string
  description: string
  highlights: string[]
  featured?: boolean
}

export const languageUi = {
  it: {
    switchAriaLabel: "Passa alla lingua italiana",
  },
  en: {
    switchAriaLabel: "Switch language to English",
  },
} as const

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
        name: "Starter",
        price: "€9",
        period: "/mese",
        description: translations.it.starterDesc,
        highlights: [
          "Fino a 10 clienti",
          "Schermate core app cliente",
          "Riepilogo aderenza settimanale",
        ],
      },
      {
        name: "Growth",
        price: "€19",
        period: "/mese",
        description: translations.it.growthDesc,
        highlights: [
          "Fino a 40 clienti",
          "Workspace cliente + nutrizionista",
          "Aggiornamenti prodotto prioritari",
        ],
        featured: true,
      },
      {
        name: "Studio",
        price: "€39",
        period: "/mese",
        description: translations.it.studioDesc,
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
        name: "Starter",
        price: "€9",
        period: "/month",
        description: translations.en.starterDesc,
        highlights: [
          "Up to 10 clients",
          "Client app core screens",
          "Weekly adherence summary",
        ],
      },
      {
        name: "Growth",
        price: "€19",
        period: "/month",
        description: translations.en.growthDesc,
        highlights: [
          "Up to 40 clients",
          "Client + nutritionist workspaces",
          "Priority product updates",
        ],
        featured: true,
      },
      {
        name: "Studio",
        price: "€39",
        period: "/month",
        description: translations.en.studioDesc,
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
  },
  en: {
    requiredOptionMessage: "Please choose an option.",
    minNameMessage: "Name must be at least 2 characters.",
    invalidEmailMessage: "Please enter a valid email.",
    namePlaceholder: "John Doe",
    submittingLabel: "Getting early access...",
  },
} as const

export type Language = keyof typeof translations;

export const supportedLocales = ["it", "en"] as const
export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = "it"

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale)
}
