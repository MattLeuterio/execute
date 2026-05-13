import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { type MouseEventHandler } from "react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"
import { defaultLocale, getTranslations, isLocale, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type BackButtonBaseProps = VariantProps<typeof buttonVariants> & {
  locale: Locale | string
  suffix: string
  prefix?: string
  className?: string
  iconClassName?: string
}

type BackButtonLinkProps = BackButtonBaseProps & {
  href: string
  onClick?: never
}

type BackButtonActionProps = BackButtonBaseProps & {
  onClick: MouseEventHandler<HTMLButtonElement>
  href?: never
  type?: "button" | "submit" | "reset"
}

type BackButtonProps = BackButtonLinkProps | BackButtonActionProps

function BackButton({
  locale,
  suffix,
  prefix,
  variant = "ghost",
  size = "sm",
  className,
  iconClassName,
  ...props
}: BackButtonProps) {
  const translationLocale = isLocale(locale) ? locale : defaultLocale
  const defaultPrefix = getTranslations("nutritionist", translationLocale).common.actions.backTo
  const label = `${prefix ?? defaultPrefix} ${suffix}`.trim()
  const sharedClassName = cn("w-fit px-2 text-foreground/70 hover:text-foreground", className)

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={cn(buttonVariants({ variant, size }), sharedClassName)}
      >
        <ArrowLeft className={cn("size-4", iconClassName)} />
        {label}
      </Link>
    )
  }

  return (
    <Button
      type={props.type ?? "button"}
      variant={variant}
      size={size}
      onClick={props.onClick}
      className={sharedClassName}
    >
      <ArrowLeft className={cn("size-4", iconClassName)} />
      {label}
    </Button>
  )
}

export { BackButton }