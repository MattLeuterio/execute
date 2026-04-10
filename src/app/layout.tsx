import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  description:
    "Execute aiuta i team a trasformare i piani strategici in risultati misurabili, con chiarezza operativa e avanzamento continuo.",
  openGraph: {
    title: "Execute",
    description:
      "Execute aiuta i team a trasformare i piani strategici in risultati misurabili, con chiarezza operativa e avanzamento continuo.",
    url: "https://executebase.com",
    siteName: "Execute",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Execute",
    description:
      "Execute aiuta i team a trasformare i piani strategici in risultati misurabili, con chiarezza operativa e avanzamento continuo.",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
