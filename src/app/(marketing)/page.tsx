import { ArrowRight } from "lucide-react";

import { AppPreviewCard } from "@/components/marketing/app-preview-card";
import { FeatureStep } from "@/components/marketing/feature-step";
import { LandingSection } from "@/components/marketing/landing-section";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "Step 01",
    title: "Create a simple plan",
    description:
      "Nutritionists assign clear daily meals without complex data entry or distracting setup.",
  },
  {
    step: "Step 02",
    title: "Follow it every day",
    description:
      "Clients open Today, check what is done, and complete what is missing in a few taps.",
  },
  {
    step: "Step 03",
    title: "Track real adherence",
    description:
      "Progress is measured by execution consistency so professionals can intervene early.",
  },
];

export default function MarketingHomePage() {
  return (
    <main className="flex flex-1 gap-34 mb-48 flex-col bg-background text-foreground">
      <div className="pt-56 sm:pt-80 space-y-12 max-w-5xl mx-auto">
        <p className="text-2xl text-center font-semibold tracking-tighter text-primary/85">
          Execute
        </p>
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="max-w-2xl text-4xl text-center leading-tight font-semibold tracking-tighter sm:text-7xl ">
            Follow your plan <br /> Step by step
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground tracking-tighter text-center sm:text-lg sm:leading-8">
            Stop guessing if your clients are following the plan. See real
            adherence, every day.
          </p>
        </div>
      </div>

      <LandingSection
        id="problem"
        eyebrow="Problem"
        title="People don’t fail because the plan is wrong. They fail because they stop following it."
        flexAlignment="center"
        className={cn("text-center align-middle max-w-2xl mx-auto")}
      />
      <div>
        <LandingSection
          id="how-it-works"
          eyebrow="How It Works"
          title="A simple loop for consistency"
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
          eyebrow="Product Preview"
          title="Built for daily completion"
          description="Today, plan and progress are designed to answer what to do now and how close the day is to completion."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AppPreviewCard
              title="Today"
              subtitle="Client"
              completion="75% done"
              meals={[
                { label: "Breakfast · completed", done: true },
                { label: "Lunch · completed", done: true },
                { label: "Dinner · pending" },
              ]}
            />
            <AppPreviewCard
              title="Plan"
              subtitle="Weekly view"
              completion="7 days"
              meals={[
                { label: "Monday", done: true },
                { label: "Tuesday", done: true },
                { label: "Wednesday" },
              ]}
            />
            <AppPreviewCard
              title="Progress"
              subtitle="Adherence"
              completion="12-day streak"
              meals={[
                { label: "This week · 83%" },
                { label: "Last week · 79%" },
                { label: "Consistency trend · stable" },
              ]}
            />
          </div>
        </LandingSection>
        <LandingSection
          id="pricing"
          eyebrow="Pricing"
          title="Simple plans for nutrition professionals"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <PricingCard
              name="Starter"
              price="€9"
              description="For professionals validating a focused adherence workflow."
              highlights={[
                "Up to 10 clients",
                "Client app core screens",
                "Weekly adherence summary",
              ]}
            />
            <PricingCard
              name="Growth"
              price="€19"
              description="For daily operations with more active clients and workflows."
              highlights={[
                "Up to 40 clients",
                "Client + nutritionist workspaces",
                "Priority product updates",
              ]}
              featured
            />
            <PricingCard
              name="Studio"
              price="€39"
              description="For teams managing a larger portfolio of plans."
              highlights={[
                "Up to 120 clients",
                "Multi-practitioner access",
                "Dedicated onboarding support",
              ]}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Early pricing preview. Final plans may evolve.
          </p>
        </LandingSection>
      </div>

      <section className="px-4 pb-14 pt-4 sm:px-6 sm:pb-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 p-6 sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className=" text-2xl leading-tight font-semibold sm:text-3xl">
              Start building adherence, one day at a time.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Execute helps your clients do what matters most: follow the plan
              they already have.
            </p>
          </div>
          <div>
            <Button size="lg">Request early access</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
