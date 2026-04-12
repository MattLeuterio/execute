"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useMemo } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { InterestedPlan, Language } from "@/lib/i18n"
import { formContent, translations } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function createEarlyAccessSchema(language: Language) {
  const localizedFormContent = formContent[language]

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, localizedFormContent.minNameMessage),
    email: z
      .string()
      .trim()
      .email(localizedFormContent.invalidEmailMessage),
    isNutritionProfessional: z.enum(["yes", "no"], {
      error: localizedFormContent.requiredOptionMessage,
    }),
    interestedPlan: z.enum(["starter", "growth", "studio"]),
    message: z.string().trim().optional(),
    consentAccepted: z.boolean().refine((value) => value, {
      message: localizedFormContent.consentRequiredMessage,
    }),
  })
}

type EarlyAccessFormValues = z.infer<ReturnType<typeof createEarlyAccessSchema>>

type EarlyAccessFormServerSubmitStatus = "success" | "error"

type EarlyAccessFormProps = {
  className?: string
  language?: Language
  initialPlan?: InterestedPlan
  onServerSubmitResult?: (status: EarlyAccessFormServerSubmitStatus) => void
}

export function EarlyAccessForm({
  className,
  language = "en",
  initialPlan = "growth",
  onServerSubmitResult,
}: EarlyAccessFormProps) {
  const t = translations[language]
  const localizedFormContent = formContent[language]
  const legalBasePath = `/${language}`
  const interestedPlanLabels: Record<InterestedPlan, string> = {
    starter: t.interestedPlanStarterOption,
    growth: t.interestedPlanGrowthOption,
    studio: t.interestedPlanStudioOption,
  }
  const earlyAccessSchema = useMemo(() => createEarlyAccessSchema(language), [language])

  const form = useForm<EarlyAccessFormValues>({
    resolver: zodResolver(earlyAccessSchema),
    defaultValues: {
      name: "",
      email: "",
      isNutritionProfessional: undefined,
      interestedPlan: initialPlan,
      message: "",
      consentAccepted: false,
    },
  })

  useEffect(() => {
    form.setValue("interestedPlan", initialPlan, {
      shouldDirty: false,
      shouldValidate: true,
    })
  }, [form, initialPlan])

  const selectedRole = useWatch({
    control: form.control,
    name: "isNutritionProfessional",
  })

  const selectedPlan = useWatch({
    control: form.control,
    name: "interestedPlan",
  })

  const nameValue = useWatch({
    control: form.control,
    name: "name",
  })

  const emailValue = useWatch({
    control: form.control,
    name: "email",
  })

  const isNutritionProfessional = selectedRole === "yes"

  const isSubmitDisabled =
    form.formState.isSubmitting ||
    !nameValue?.trim() ||
    !emailValue?.trim() ||
    !selectedRole ||
    !selectedPlan

  const onSubmit = async (values: EarlyAccessFormValues) => {
    if (!values.consentAccepted) {
      form.setError("consentAccepted", {
        type: "manual",
        message: localizedFormContent.consentRequiredMessage,
      })
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          isNutritionProfessional: values.isNutritionProfessional === "yes",
          interestedPlan:
            values.isNutritionProfessional === "yes" ? values.interestedPlan : null,
          message: values.message || undefined,
        }),
      })

      if (!response.ok) {
        onServerSubmitResult?.("error")
        return
      }

      onServerSubmitResult?.("success")
      form.reset({
        name: "",
        email: "",
        isNutritionProfessional: undefined,
        interestedPlan: initialPlan,
        message: "",
        consentAccepted: false,
      })
    } catch {
      onServerSubmitResult?.("error")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex h-full min-h-0 flex-col", className)}>
      <Card
        appearance="glass-subtle"
        className="my-4 flex min-h-0 flex-1 flex-col w-full border-border/70 bg-card/55"
      >
        <CardContent className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="waitlist-name" className="text-sm font-medium text-foreground/90">
              {t.name} *
            </label>
            <Input
              id="waitlist-name"
              type="text"
              placeholder={localizedFormContent.namePlaceholder}
              autoComplete="name"
              className="border-border/70 bg-background/70 placeholder:text-muted-foreground/80 focus-visible:border-primary/60 focus-visible:ring-primary/25"
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="waitlist-email" className="text-sm font-medium text-foreground/90">
              {t.email} *
            </label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="name@clinic.com"
              autoComplete="email"
              className="border-border/70 bg-background/70 placeholder:text-muted-foreground/80 focus-visible:border-primary/60 focus-visible:ring-primary/25"
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-foreground/90">
              {t.areYouPro} *
            </p>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-border/70 bg-muted/35 p-1">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "h-9 rounded-lg border border-transparent text-sm",
                  selectedRole === "yes"
                    ? "bg-primary/20 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-muted-foreground hover:bg-card/70 hover:text-foreground"
                )}
                onClick={() =>
                  form.setValue("isNutritionProfessional", "yes", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                {t.yes}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  "h-9 rounded-lg border border-transparent text-sm",
                  selectedRole === "no"
                    ? "bg-primary/20 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-muted-foreground hover:bg-card/70 hover:text-foreground"
                )}
                onClick={() =>
                  form.setValue("isNutritionProfessional", "no", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              >
                {t.no}
              </Button>
            </div>
            {form.formState.errors.isNutritionProfessional ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.isNutritionProfessional.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="waitlist-plan" className="text-sm font-medium text-foreground/90">
              {t.interestedPlanLabel}
            </label>
            <Controller
              control={form.control}
              name="interestedPlan"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value as InterestedPlan)}
                  disabled={!isNutritionProfessional}
                >
                  <SelectTrigger id="waitlist-plan" className="border-border/70 bg-background/70 focus-visible:border-primary/60 focus-visible:ring-primary/25 disabled:opacity-65">
                    <SelectValue>
                      {(value) => {
                        if (!value) {
                          return ""
                        }

                        return interestedPlanLabels[value as InterestedPlan]
                      }}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">{t.interestedPlanStarterOption}</SelectItem>
                    <SelectItem value="growth">{t.interestedPlanGrowthOption}</SelectItem>
                    <SelectItem value="studio">{t.interestedPlanStudioOption}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {!isNutritionProfessional ? (
              <p className="text-xs text-muted-foreground">{t.interestedPlanDisabledHelper}</p>
            ) : null}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="waitlist-message" className="text-sm font-medium text-muted-foreground">
              {t.message}
            </label>
            <Textarea
              id="waitlist-message"
              rows={3}
              placeholder={t.messagePlaceholder}
              className="border-border/60 bg-background/55 placeholder:text-muted-foreground/80 focus-visible:border-primary/45 focus-visible:ring-primary/20"
              {...form.register("message")}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="waitlist-consent" className="flex items-center gap-2 text-xs text-muted-foreground">
              <Controller
                control={form.control}
                name="consentAccepted"
                render={({ field }) => (
                  <Checkbox
                    id="waitlist-consent"
                    className="mt-0.5 border-border/70 bg-background/70"
                    checked={Boolean(field.value)}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                  />
                )}
              />
              {language === "it" ? (
                <span>
                  Accetto la{" "}
                  <Link
                    href={`${legalBasePath}/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    Privacy Policy
                  </Link>{" "}
                  e i{" "}
                  <Link
                    href={`${legalBasePath}/terms`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    Termini
                  </Link>
                </span>
              ) : (
                <span>
                  I agree to the{" "}
                  <Link
                    href={`${legalBasePath}/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={`${legalBasePath}/terms`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/90 underline underline-offset-2 transition-opacity hover:opacity-70"
                  >
                    Terms
                  </Link>
                </span>
              )}
            </label>
            {form.formState.errors.consentAccepted ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.consentAccepted.message}
              </p>
            ) : null}
          </div>

          <p className="text-xs text-muted-foreground">
            {t.requestFieldsObligatory}
          </p>
          </div>
        </CardContent>
      </Card>

      <div className="shrink-0">
        <Button
          type="submit"
          size="lg"
          className="w-full border border-primary/35 bg-primary/85 text-primary-foreground hover:bg-primary"
          disabled={isSubmitDisabled}
        >
          {form.formState.isSubmitting
            ? localizedFormContent.submittingLabel
            : t.submit}
        </Button>
      </div>
    </form>
  )
}
