"use client"

import type { Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type LanguageSwitchProps = {
  language: Language
  setLanguage: (language: Language) => void
}

export function LanguageSwitch({ language, setLanguage }: LanguageSwitchProps) {
  return (
    <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
      <div className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs tracking-wide text-muted-foreground">
        <button
          type="button"
          onClick={() => setLanguage("it")}
          className={cn(
            "transition-colors",
            language === "it" ? "text-foreground" : "hover:text-foreground"
          )}
          aria-label="Switch language to Italian"
        >
          IT
        </button>
        <span className="mx-2 text-border">/</span>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={cn(
            "transition-colors",
            language === "en" ? "text-foreground" : "hover:text-foreground"
          )}
          aria-label="Switch language to English"
        >
          EN
        </button>
      </div>
    </div>
  )
}
