"use client"

import type { Language } from "@/lib/i18n"
import { isLocale, languageUi, supportedLocales } from "@/lib/i18n"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

type LanguageSwitchProps = {
  language: Language
}

export function LanguageSwitch({ language }: LanguageSwitchProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const switchLanguage = (nextLanguage: Language) => {
    if (nextLanguage === language) {
      return
    }

    const currentPath = pathname ?? "/"
    const segments = currentPath.split("/").filter(Boolean)

    if (segments[0] && isLocale(segments[0])) {
      segments[0] = nextLanguage
    } else {
      segments.unshift(nextLanguage)
    }

    const nextPath = `/${segments.join("/")}`
    const queryString = searchParams.toString()

    router.push(queryString ? `${nextPath}?${queryString}` : nextPath)
  }

  return (
    <div className="fixed right-4 top-4 z-40 sm:right-6 sm:top-6">
      <div className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs tracking-wide text-muted-foreground">
        {supportedLocales.map((locale, index) => (
          <span key={locale}>
            <button
              type="button"
              onClick={() => switchLanguage(locale)}
              className={cn(
                "transition-colors",
                language === locale ? "text-foreground" : "hover:text-foreground"
              )}
              aria-label={languageUi[locale].switchAriaLabel}
            >
              {locale.toUpperCase()}
            </button>
            {index < supportedLocales.length - 1 ? <span className="mx-2 text-border">/</span> : null}
          </span>
        ))}
      </div>
    </div>
  )
}
