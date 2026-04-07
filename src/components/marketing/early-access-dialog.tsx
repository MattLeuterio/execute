"use client"

import type { VariantProps } from "class-variance-authority"

import { EarlyAccessForm } from "@/components/marketing/early-access-form"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

type EarlyAccessDialogProps = {
  triggerLabel?: string
  triggerVariant?: VariantProps<typeof buttonVariants>["variant"]
  triggerSize?: VariantProps<typeof buttonVariants>["size"]
  triggerClassName?: string
  language?: Language
}

export function EarlyAccessDialog({
  triggerLabel,
  triggerVariant = "default",
  triggerSize = "lg",
  triggerClassName = "w-full sm:w-auto",
  language = "en",
}: EarlyAccessDialogProps) {
  const t = translations[language]

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size={triggerSize} variant={triggerVariant} className={`cursor-pointer ${triggerClassName}`}>
            {triggerLabel ?? t.cta}
          </Button>
        }
      />

      <DialogContent className="max-w-[calc(100%-2rem)] border border-border/70 bg-card/95 p-0 sm:max-w-xl">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl">{t.modalTitle}</DialogTitle>
          <DialogDescription>
            {t.modalDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6">
          <EarlyAccessForm language={language} className="max-w-none border-border/60 bg-card/60" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
