"use client"

import Image from "next/image"

import { AppPreviewCard } from "@/components/marketing/app-preview-card"
import { EarlyAccessDialog } from "@/components/marketing/early-access-dialog"
import { FeatureStep } from "@/components/marketing/feature-step"
import { InsightsPreviewSection } from "@/components/marketing/insights-preview-section"
import { LanguageSwitch } from "@/components/marketing/language-switch"
import { LandingSection } from "@/components/marketing/landing-section"
import { PricingCard } from "@/components/marketing/pricing-card"
import logoLockup from "@/components/ui/image/logo-lockup.svg"
import type { Language } from "@/lib/i18n"
import { marketingContent, translations } from "@/lib/i18n"

type MarketingHomePageProps = {
  language: Language
}

export function MarketingHomePage({ language }: MarketingHomePageProps) {
  const t = translations[language]
  const localizedMarketingContent = marketingContent[language]
  const stepLabel = localizedMarketingContent.stepLabel

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

  const previewCards = localizedMarketingContent.previewCards
  const pricingCards = localizedMarketingContent.pricingCards

  return (
    <main className="pb-48 flex flex-1 flex-col gap-34">
      <LanguageSwitch language={language} />

      <div className="mx-auto max-w-5xl space-y-12 pt-56 sm:pt-80">
        <div className="flex justify-center">
          <Image src={logoLockup} alt={t.brand} className="h-auto w-24 sm:w-32" priority />
        </div>
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="max-w-2xl text-center text-4xl leading-tight font-semibold tracking-tighter sm:text-7xl">
            {t.heroTitle1} <br className="hidden sm:block" /> {t.heroTitle2}
          </h1>
          <p className="max-w-2xl text-center text-sm leading-6 tracking-tighter text-muted-foreground sm:text-lg sm:leading-8">
            {t.heroSubtitle}
          </p>
        </div>
      </div>

      <LandingSection
        id="problem"
        eyebrow={t.problemLabel}
        title={t.problemText}
        flexAlignment="center"
        className="text-center"
        description={t.problemDescription}
      >
        <p className="text-2xl leading-tight font-semibold tracking-tight text-center text-primary/85 sm:text-3xl">
          {t.problemHighlight}
        </p>
      </LandingSection>
      <div>
        <LandingSection id="how-it-works" eyebrow={t.howItWorks} title={t.howTitle}>
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

        <InsightsPreviewSection language={language} />

        <LandingSection id="pricing" eyebrow={t.pricing} title={t.pricingTitle}>
          <div className="grid gap-4 sm:grid-cols-3">
            {pricingCards.map((card) => (
              <PricingCard
                key={card.name}
                plan={card.plan}
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
          <p className="mt-2 text-xs text-muted-foreground">{t.pricingNote}</p>
        </LandingSection>
      </div>

      <section className="px-4 pb-14 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl leading-tight font-semibold sm:text-5xl">{t.finalTitle}</h2>
            <p className="text-sm text-center leading-6 text-muted-foreground sm:text-xl">{t.finalDesc}</p>
          </div>
          <div className="mt-6">
            <EarlyAccessDialog language={language} triggerLabel={t.cta} triggerSize={"xl"} initialPlan="growth" />
          </div>
        </div>
      </section>
    </main>
  )
}
