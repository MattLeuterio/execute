"use client"

import { useState } from "react"
import type { VariantProps } from "class-variance-authority"
import { toast } from "sonner"

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
import type { InterestedPlan, Language } from "@/lib/i18n"
import { translations } from "@/lib/i18n"

type EarlyAccessDialogProps = {
  triggerLabel?: string
  triggerVariant?: VariantProps<typeof buttonVariants>["variant"]
  triggerSize?: VariantProps<typeof buttonVariants>["size"]
  triggerClassName?: string
  language?: Language
  initialPlan?: InterestedPlan
}

export function EarlyAccessDialog({
  triggerLabel,
  triggerVariant = "default",
  triggerSize = "lg",
  triggerClassName = "w-full sm:w-auto",
  language = "en",
  initialPlan = "growth",
}: EarlyAccessDialogProps) {
  const t = translations[language]
  const [open, setOpen] = useState(false)
  const [openCount, setOpenCount] = useState(0)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (nextOpen) {
      setOpenCount((value) => value + 1)
    }
  }

  const handleServerSubmitResult = (status: "success" | "error") => {
    setOpen(false)

    if (status === "success") {
      toast.success(t.toastSuccessTitle, {
        description: t.toastSuccessDescription,
      })
      return
    }

    toast.error(t.toastErrorTitle, {
      description: t.toastErrorDescription,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <EarlyAccessForm
            key={`${language}-${initialPlan}-${openCount}`}
            language={language}
            initialPlan={initialPlan}
            onServerSubmitResult={handleServerSubmitResult}
            className="max-w-none border-border/60 bg-card/60"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
