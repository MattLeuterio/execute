export const translations = {
  it: {
    brand: "Execute",

    heroTitle1: "Segui il tuo piano",
    heroTitle2: "Un passo alla volta",
    heroSubtitle:
      "Smetti di chiederti se i clienti seguono il piano. Vedi l’aderenza reale, ogni giorno.",

    problemLabel: "Problema",
    problemText:
      "Le persone non falliscono perché il piano è sbagliato. Falliscono perché smettono di seguirlo.",

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
      "People don’t fail because the plan is wrong. They fail because they stop following it.",

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

export type Language = keyof typeof translations;
