import { readFile } from "node:fs/promises"
import path from "node:path"
import ReactMarkdown from "react-markdown"

import type { Language } from "@/lib/i18n"

type LegalMarkdownPageProps = {
  language: Language
  fileName: "privacy-policy.md" | "terms-and-conditions.md"
}

async function getMarkdownContent({ language, fileName }: LegalMarkdownPageProps) {
  const filePath = path.join(
    process.cwd(),
    "context/app-example-screenshots/documents",
    language,
    fileName
  )

  return readFile(filePath, "utf8")
}

export async function LegalMarkdownPage({ language, fileName }: LegalMarkdownPageProps) {
  const markdown = await getMarkdownContent({ language, fileName })

  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <article className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-foreground/90 sm:text-base">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="pt-4 text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="pt-3 text-lg leading-tight font-semibold text-foreground sm:text-xl">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="text-muted-foreground">{children}</p>,
            ul: ({ children }) => <ul className="list-disc space-y-1 pl-5 text-muted-foreground">{children}</ul>,
            hr: () => <hr className="my-5 border-border/70" />,
            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  )
}