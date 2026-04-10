"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        className: "border border-border/70 bg-card text-foreground",
      }}
      {...props}
    />
  )
}

export { Toaster }
