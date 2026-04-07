"use client"

import { AppPreviewCard } from "@/components/marketing/app-preview-card";
import { EarlyAccessDialog } from "@/components/marketing/early-access-dialog";
import { FeatureStep } from "@/components/marketing/feature-step";
import { LanguageSwitch } from "@/components/marketing/language-switch";
import { LandingSection } from "@/components/marketing/landing-section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function MarketingHomePage() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const stepLabel = language === "it" ? "Passo" : "Step"

  const steps = [
    {
      step: `${stepLabel} 01`,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      step: `${stepLabel} 02`,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      step: `${stepLabel} 03`,
      title: t.step3Title,
      description: t.step3Desc,
    },
  ]

  const previewCards =
    language === "it"
      ? [
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
        ]
      : [
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
        ]

  const pricingCards =
    language === "it"
      ? [
          {
            name: "Starter",
            price: "€9",
            period: "/mese",
            description: t.starterDesc,
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
            description: t.growthDesc,
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
            description: t.studioDesc,
            highlights: [
              "Fino a 120 clienti",
              "Accesso multi-professionista",
              "Supporto onboarding dedicato",
            ],
          },
        ]
      : [
          {
            name: "Starter",
            price: "€9",
            period: "/month",
            description: t.starterDesc,
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
            description: t.growthDesc,
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
            description: t.studioDesc,
            highlights: [
              "Up to 120 clients",
              "Multi-practitioner access",
              "Dedicated onboarding support",
            ],
          },
        ]

  return (
    <main className="flex flex-1 gap-34 mb-48 flex-col bg-background text-foreground">
      <LanguageSwitch language={language} setLanguage={setLanguage} />

      <div className="pt-56 sm:pt-80 space-y-12 max-w-5xl mx-auto">
        <p className="text-2xl text-center font-semibold tracking-tighter text-primary/85">
          {t.brand}
        </p>
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="max-w-2xl text-4xl text-center leading-tight font-semibold tracking-tighter sm:text-7xl ">
            {t.heroTitle1} <br className="hidden sm:block" /> {t.heroTitle2}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground tracking-tighter text-center sm:text-lg sm:leading-8">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      <LandingSection
        id="problem"
        eyebrow={t.problemLabel}
        title={t.problemText}
        flexAlignment="center"
        className={cn("text-center align-middle max-w-2xl mx-auto")}
      />
      <div>
        <LandingSection
          id="how-it-works"
          eyebrow={t.howItWorks}
          title={t.howTitle}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <FeatureStep
                key={step.title}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </LandingSection>

        <LandingSection
          id="preview"
          eyebrow={t.productPreview}
          title={t.productTitle}
          description={t.productDesc}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previewCards.map((card) => (
              <AppPreviewCard
                key={card.title}
                title={card.title}
                subtitle={card.subtitle}
                completion={card.completion}
                meals={card.meals}
              />
            ))}
          </div>
        </LandingSection>
        <LandingSection
          id="pricing"
          eyebrow={t.pricing}
          title={t.pricingTitle}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {pricingCards.map((card) => (
              <PricingCard
                key={card.name}
                name={card.name}
                price={card.price}
                period={card.period}
                description={card.description}
                highlights={card.highlights}
                featured={card.featured}
                language={language}
                ctaLabel={t.cta}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t.pricingNote}
          </p>
        </LandingSection>
      </div>

      <section className="px-4 pb-14 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className=" text-2xl leading-tight font-semibold sm:text-3xl">
              {t.finalTitle}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {t.finalDesc}
            </p>
          </div>
          <div>
            <EarlyAccessDialog language={language} triggerLabel={t.cta} />
          </div>
        </div>
      </section>
    </main>
  );
}
