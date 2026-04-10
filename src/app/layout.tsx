import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://executebase.com"),
  title: {
    default: "Execute",
    template: "%s · Execute",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers()
  const headerLocale = requestHeaders.get("x-execute-locale")
  const htmlLang = headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale

  return (
    <html lang={htmlLang} className={`${inter.variable} h-full antialiased dark`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
