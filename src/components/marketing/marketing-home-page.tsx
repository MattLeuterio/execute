"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { AppPreviewCard } from "@/components/marketing/app-preview-card";
import { EarlyAccessDialog } from "@/components/marketing/early-access-dialog";
import { FeatureStep } from "@/components/marketing/feature-step";
import { InsightsPreviewSection } from "@/components/marketing/insights-preview-section";
import { LanguageSwitch } from "@/components/marketing/language-switch";
import { LandingSection } from "@/components/marketing/landing-section";
import { getRevealInViewProps, getSoftFloatAnimation } from "@/components/marketing/motion";
import { PricingCard } from "@/components/marketing/pricing-card";
import logoLockup from "@/components/ui/image/logo-lockup.svg";
import type { Language } from "@/lib/i18n";
import { marketingContent, translations } from "@/lib/i18n";

type MarketingHomePageProps = {
  language: Language;
};

export function MarketingHomePage({ language }: MarketingHomePageProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const t = translations[language];
  const localizedMarketingContent = marketingContent[language];
  const stepLabel = localizedMarketingContent.stepLabel;

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
  ];

  const previewCards = localizedMarketingContent.previewCards;
  const pricingCards = localizedMarketingContent.pricingCards;

  return (
    <main className="pb-48 flex flex-1 flex-col gap-34">
      <LanguageSwitch language={language} />

      <div className="mx-auto max-w-5xl space-y-12 pt-56 sm:pt-80">
        <div className="flex justify-center">
          <motion.div {...getSoftFloatAnimation(reducedMotion)}>
            <Image
              src={logoLockup}
              alt={t.brand}
              className="h-auto w-24 sm:w-32"
              priority
            />
          </motion.div>
        </div>
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="max-w-2xl text-center text-4xl leading-tight font-semibold tracking-tighter sm:text-7xl">
            {t.heroTitle1} <br className="hidden sm:block" /> {t.heroTitle2}
          </h1>
          <motion.p
            className="max-w-2xl text-center text-sm leading-6 tracking-tighter text-muted-foreground sm:text-lg sm:leading-8"
            {...getRevealInViewProps({ reducedMotion })}
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </div>

      <LandingSection
        id="problem"
        eyebrow={t.problemLabel}
        title={t.problemText}
        flexAlignment="center"
        className="text-center"
        description={t.problemDescription}
      />

      <div>
        <p className="text-2xl leading-tight font-semibold tracking-tight text-center text-primary/85 sm:text-4xl">
          {t.problemHighlightFirstLine}
        </p>
        <p className="text-2xl leading-tight font-semibold tracking-tight text-center text-primary/85 sm:text-4xl">
          {t.problemHighlightSecondLine}
        </p>
      </div>
      <div>
        <LandingSection
          id="how-it-works"
          eyebrow={t.howItWorks}
          title={t.howTitle}
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                {...getRevealInViewProps({
                  delay: index * 0.08,
                  reducedMotion,
                })}
              >
                <FeatureStep
                  step={step.step}
                  title={step.title}
                  description={step.description}
                />
              </motion.div>
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
            {previewCards.map((card, index) => (
              <motion.div
                key={card.title}
                {...getRevealInViewProps({
                  delay: index * 0.08,
                  reducedMotion,
                })}
              >
                <AppPreviewCard
                  title={card.title}
                  subtitle={card.subtitle}
                  completion={card.completion}
                  meals={card.meals}
                />
              </motion.div>
            ))}
          </div>
        </LandingSection>

        <InsightsPreviewSection language={language} />

        <LandingSection id="pricing" eyebrow={t.pricing} title={t.pricingTitle}>
          <div className="grid gap-4 sm:grid-cols-3">
            {pricingCards.map((card, index) => (
              <motion.div
                key={card.name}
                {...getRevealInViewProps({
                  delay: index * 0.08,
                  reducedMotion,
                })}
              >
                <PricingCard
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
              </motion.div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{t.pricingNote}</p>
        </LandingSection>
      </div>

      <section className="px-4 pb-14 pt-4 sm:px-6 sm:pb-20">
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 sm:p-10"
          {...getRevealInViewProps({ reducedMotion })}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl text-center leading-tight font-semibold sm:text-5xl">
              {t.finalTitleFirstLine}
            </h2>
            <h2 className="text-3xl text-center leading-tight font-semibold sm:text-5xl">
              {t.finalTitleSecondLine}
            </h2>
            <p className="text-sm text-center leading-6 text-muted-foreground sm:text-xl">
              {t.finalDesc}
            </p>
          </div>
          <div className="mt-6">
            <EarlyAccessDialog
              language={language}
              triggerLabel={t.cta}
              triggerSize={"xl"}
              initialPlan="growth"
            />
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-10 sm:px-6 sm:pb-12">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-center gap-4 text-xs text-muted-foreground/70 sm:justify-end">
          <Link
            href={`/${language}/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:opacity-100 hover:underline underline-offset-2"
          >
            {t.privacyPolicyLabel}
          </Link>
          <Link
            href={`/${language}/terms`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:opacity-100 hover:underline underline-offset-2"
          >
            {t.termsLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
