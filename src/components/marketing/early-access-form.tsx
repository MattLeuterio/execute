"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Language } from "@/lib/i18n"
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
    message: z.string().trim().optional(),
  })
}

type EarlyAccessFormValues = z.infer<ReturnType<typeof createEarlyAccessSchema>>

type WaitlistApiResponse = {
  success?: boolean
  message?: string
}

type EarlyAccessFormProps = {
  className?: string
  language?: Language
}

export function EarlyAccessForm({ className, language = "en" }: EarlyAccessFormProps) {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const t = translations[language]
  const localizedFormContent = formContent[language]
  const earlyAccessSchema = useMemo(() => createEarlyAccessSchema(language), [language])

  const form = useForm<EarlyAccessFormValues>({
    resolver: zodResolver(earlyAccessSchema),
    defaultValues: {
      name: "",
      email: "",
      isNutritionProfessional: undefined,
      message: "",
    },
  })

  const selectedRole = useWatch({
    control: form.control,
    name: "isNutritionProfessional",
  })

  const nameValue = useWatch({
    control: form.control,
    name: "name",
  })

  const emailValue = useWatch({
    control: form.control,
    name: "email",
  })

  const isSubmitDisabled =
    form.formState.isSubmitting ||
    !nameValue?.trim() ||
    !emailValue?.trim() ||
    !selectedRole

  const onSubmit = async (values: EarlyAccessFormValues) => {
    setSubmitMessage(null)
    setIsSuccess(false)

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
          message: values.message || undefined,
        }),
      })

      let responseBody: WaitlistApiResponse | null = null

      try {
        responseBody = (await response.json()) as WaitlistApiResponse
      } catch {
        responseBody = null
      }

      if (!response.ok) {
        setIsSuccess(false)
        setSubmitMessage(responseBody?.message ?? t.error)
        return
      }

      setIsSuccess(true)
      setSubmitMessage(responseBody?.message ?? t.success)
      form.reset()
    } catch {
      setIsSuccess(false)
      setSubmitMessage(t.error)
    }
  }

  return (
    <Card
      appearance="glass-subtle"
      className={cn("w-full max-w-md border-border/70 bg-card/55", className)}
    >
      <CardHeader>
        <CardTitle className="text-xl">{t.submit}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <label htmlFor="waitlist-message" className="text-sm font-medium text-muted-foreground">
              {t.message}
            </label>
            <textarea
              id="waitlist-message"
              rows={3}
              placeholder={t.messagePlaceholder}
              className="flex w-full rounded-lg border border-border/60 bg-background/55 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:border-primary/45 focus-visible:ring-3 focus-visible:ring-primary/20"
              {...form.register("message")}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            {t.requestFieldsObligatory}
          </p>

          <Button
            type="submit"
            size="lg"
            className="mt-12 w-full border border-primary/35 bg-primary/85 text-primary-foreground hover:bg-primary"
            disabled={isSubmitDisabled}
          >
            {form.formState.isSubmitting
              ? localizedFormContent.submittingLabel
              : t.submit}
          </Button>

          {submitMessage ? (
            <div
              className={cn(
                "rounded-lg border px-3 py-2 text-sm",
                isSuccess
                  ? "border-primary/35 bg-primary/10 text-foreground"
                  : "border-border/70 bg-muted/45 text-muted-foreground"
              )}
            >
              {submitMessage}
            </div>
          ) : null}
        </form>
      </CardContent>
    </Card>
  )
}
