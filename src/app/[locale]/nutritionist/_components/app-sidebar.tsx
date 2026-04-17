"use client";

import { NAVIGATION_ITEMS } from "@/lib/navigation";
import type { NutritionistTranslations } from "@/lib/i18n";
import { NavLink } from "./nav-link";
import Image from "next/image";
import logoLockupHorizontal from "@/components/ui/image/logo-lockup-horizontal.svg";

interface AppSidebarProps {
  locale: string;
  t: NutritionistTranslations;
}

export function AppSidebar({ locale, t }: AppSidebarProps) {
  const getNavLabel = (href: string): string => {
    const labelMap: Record<string, string> = {
      dashboard: t.nav.dashboard,
      clients: t.nav.clients,
      checkins: t.nav.checkins,
      settings: t.nav.settings,
    };
    return labelMap[href] || href;
  };  

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-border/50 bg-background md:flex">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 border-b border-border/50 px-4 py-8">
        <Image
          src={logoLockupHorizontal}
          alt={t.brand}
          className="h-auto w-24 sm:w-32"
          priority
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            href={item.href}
            label={getNavLabel(item.href)}
            icon={item.icon}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Dr. Rossi
            </p>
            <p className="truncate text-xs text-foreground/50">Professional</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
