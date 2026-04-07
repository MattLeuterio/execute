"use client"

import { useEffect, useState } from "react"

import type { Language } from "@/lib/i18n"

const STORAGE_KEY = "execute-language"

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") {
    return "en"
  }

  return window.navigator.language.toLowerCase().startsWith("it") ? "it" : "en"
}

function isLanguage(value: string | null): value is Language {
  return value === "it" || value === "en"
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en"
    }

    const saved = window.localStorage.getItem(STORAGE_KEY)

    if (isLanguage(saved)) {
      return saved
    }

    return detectBrowserLanguage()
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(STORAGE_KEY, nextLanguage)
  }

  return {
    language,
    setLanguage,
  }
}
