export const nutritionistTranslations = {
  it: {
    brand: "Execute",
    common: {
      time: {
        justNow: "poco fa",
        minutesAgo: " minuti fa",
        hoursAgo: " ore fa",
        daysAgo: " giorni fa",
        dayAgo: "giorno fa",
        weeksAgo: " settimane fa",
        monthsAgo: " mesi fa",
        today: "Oggi",
        yesterday: "Ieri",
      },
      labels: {
        adherence: "aderenza",
        weight: "peso",
        status: "stato",
        lastActivity: "ultima attività",
      },
    },
    nav: {
      dashboard: "Dashboard",
      clients: "Clienti",
      checkins: "Check-in",
      settings: "Impostazioni",
    },
    dashboard: {
      header: "Dashboard",
      subtitle: "Benvenuto! Ecco il tuo riepilogo rapido",
      kpi: {
        activeClients: "Clienti attivi",
        avgAdherence: "Aderenza media",
        clientsAtRisk: "Clienti a rischio",
      },
      sections: {
        atRisk: "Clienti a rischio",
        recentActivity: "Attività recenti",
        latestUpdates: "Ultimi aggiornamenti dai tuoi clienti",
      },
      emptyStates: {
        noClients: "Nessun cliente ancora",
        noActivity: "Nessuna attività recente",
        allOnTrack: "Tutti i clienti sono in pista! 🎉",
      },
      cta: {
        viewAll: "Visualizza tutto →",
      },
    },
    clients: {
      header: "Clienti",
      subtitle: "Gestisci i tuoi clienti e monitora il loro progresso",
      table: {
        name: "Nome",
        adherence: "Aderenza",
        status: "Stato",
        email: "Email",
        phone: "Telefono",
        lastActivity: "Ultima attività",
        trend: "Trend",
      },
      filters: {
        all: "Tutti",
        atRisk: "A rischio",
        highAdherence: "Alta aderenza",
        lowAdherence: "Bassa aderenza",
        inactive: "Inattivo",
      },
      search: {
        placeholder: "Ricerca per nome...",
        selected: "selezionati",
      },
      actions: {
        archive: "Archivia",
        confirmArchive: "Archiviare {count} cliente/i?",
        export: "Esporta",
      },
      emptyStates: {
        noClients: "Nessun cliente corrisponde ai filtri selezionati",
      },
    },
    activity: {
      types: {
        checkinCompleted: "ha completato il check-in",
        checkinMissed: "ha saltato il check-in",
        adherenceDrop: "l'aderenza è calata",
        clientAdded: "cliente aggiunto",
        planAssigned: "piano assegnato",
        planUpdated: "piano aggiornato",
        noteAdded: "nota aggiunta",
      },
    },
    status: {
      onTrack: "In corso",
      warning: "Avvertenza",
      atRisk: "A rischio",
      inactive: "Inattivo",
    },
  },
  en: {
    brand: "Execute",
    common: {
      time: {
        justNow: "just now",
        minutesAgo: " minutes ago",
        hoursAgo: " hours ago",
        daysAgo: " days ago",
        dayAgo: "day ago",
        weeksAgo: " weeks ago",
        monthsAgo: " months ago",
        today: "Today",
        yesterday: "Yesterday",
      },
      labels: {
        adherence: "adherence",
        weight: "weight",
        status: "status",
        lastActivity: "last activity",
      },
    },
    nav: {
      dashboard: "Dashboard",
      clients: "Clients",
      checkins: "Check-ins",
      settings: "Settings",
    },
    dashboard: {
      header: "Dashboard",
      subtitle: "Welcome back! Here's your quick overview.",
      kpi: {
        activeClients: "Active clients",
        avgAdherence: "Avg adherence",
        clientsAtRisk: "Clients at risk",
      },
      sections: {
        atRisk: "Clients at risk",
        recentActivity: "Recent activities",
        latestUpdates: "Latest updates from your clients",
      },
      emptyStates: {
        noClients: "No clients yet",
        noActivity: "No recent activity",
        allOnTrack: "All clients are on track! 🎉",
      },
      cta: {
        viewAll: "View all →",
      },
    },
    clients: {
      header: "Clients",
      subtitle: "Manage your clients and monitor their progress",
      table: {
        name: "Name",
        adherence: "Adherence",
        status: "Status",
        email: "Email",
        phone: "Phone",
        lastActivity: "Last Activity",
        trend: "Trend",
      },
      filters: {
        all: "All",
        atRisk: "At Risk",
        highAdherence: "High Adherence",
        lowAdherence: "Low Adherence",
        inactive: "Inactive",
      },
      search: {
        placeholder: "Search by name...",
        selected: "selected",
      },
      actions: {
        archive: "Archive",
        confirmArchive: "Archive {count} client(s)?",
        export: "Export",
      },
      emptyStates: {
        noClients: "No clients match the selected filters",
      },
    },
    activity: {
      types: {
        checkinCompleted: "completed check-in",
        checkinMissed: "missed check-in",
        adherenceDrop: "adherence dropped",
        clientAdded: "client added",
        planAssigned: "plan assigned",
        planUpdated: "plan updated",
        noteAdded: "note added",
      },
    },
    status: {
      onTrack: "On Track",
      warning: "Warning",
      atRisk: "At Risk",
      inactive: "Inactive",
    },
  },
} as const

export type Locale = keyof typeof nutritionistTranslations
export type NutritionistTranslations = (typeof nutritionistTranslations)[Locale]
