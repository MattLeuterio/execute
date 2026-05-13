/**
 * Mock plan data
 * Reusable plan templates, tags, and assignments.
 */

import {
  Plan,
  PlanAssignment,
  PlanDocument,
  PlanTag,
  WeeklySchedule,
  PlanItemType,
} from '../types';
import {
  getActiveAssignedPlans,
  getAssignedPlanByClientId,
  getPlansByTagSlug as filterPlansByTagSlug,
  getPublishedPlans as filterPublishedPlans,
} from '@/lib/plan-utils';

const DEFAULT_NUTRITIONIST_ID = 'nutritionist-demo';

type RichDocumentOptions = {
  title: string;
  intro: string;
  sections: Array<{ title: string; bullets: string[] }>;
  callout?: { title: string; body: string; tone?: 'info' | 'warning' | 'success' };
  orderedSteps?: { title: string; steps: string[] };
  quote?: string;
  footerLink?: { label: string; href: string };
};

function createPlanDocument(
  options: RichDocumentOptions
): PlanDocument {
  const {
    title,
    intro,
    sections,
    callout,
    orderedSteps,
    quote,
    footerLink,
  } = options;

  return {
    type: 'doc',
    version: 1,
    content: [
      { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: title }] },
      { type: 'paragraph', content: [{ type: 'text', text: intro }] },
      ...(callout
        ? [
            {
              type: 'callout',
              attrs: { tone: callout.tone ?? 'info' },
              content: [
                {
                  type: 'heading',
                  attrs: { level: 3 },
                  content: [{ type: 'text', text: callout.title }],
                },
                { type: 'paragraph', content: [{ type: 'text', text: callout.body }] },
              ],
            },
            { type: 'horizontalRule' },
          ]
        : []),
      ...sections.flatMap((section) => [
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: section.title }] },
        {
          type: 'bulletList',
          content: section.bullets.map((bullet) => ({
            type: 'listItem',
            content: [{ type: 'paragraph', content: [{ type: 'text', text: bullet }] }],
          })),
        },
      ]),
      ...(orderedSteps
        ? [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: orderedSteps.title }],
            },
            {
              type: 'orderedList',
              content: orderedSteps.steps.map((step) => ({
                type: 'listItem',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: step }] }],
              })),
            },
          ]
        : []),
      ...(quote
        ? [
            {
              type: 'blockquote',
              content: [{ type: 'paragraph', content: [{ type: 'text', text: quote }] }],
            },
          ]
        : []),
      ...(footerLink
        ? [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'Approfondimento: ' },
                {
                  type: 'text',
                  text: footerLink.label,
                  marks: [{ type: 'link', attrs: { href: footerLink.href } }],
                },
              ],
            },
          ]
        : []),
    ],
  };
}

// ============================================================================
// PLAN TEMPLATES
// ============================================================================

const WEEKLY_SCHEDULE_BALANCED: WeeklySchedule = {
  days: [
    {
      dayOfWeek: 'monday',
      items: [
        { id: 'i1', type: PlanItemType.Meal, name: 'Colazione', description: 'Omelette (3 uova) con verdure, pane integrale', order: 1 },
        { id: 'i2', type: PlanItemType.Meal, name: 'Pranzo', description: 'Pollo grigliato 150g, riso integrale, broccoli', order: 2 },
        { id: 'i3', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce al forno (salmone) 150g, patata dolce, spinaci', order: 3 },
      ],
      notes: 'Giorno tipico proteico',
    },
    {
      dayOfWeek: 'tuesday',
      items: [
        { id: 'i4', type: PlanItemType.Meal, name: 'Colazione', description: 'Yogurt greco 150g, mirtilli, granola', order: 1 },
        { id: 'i5', type: PlanItemType.Meal, name: 'Pranzo', description: 'Insalata di quinoa con pollo 120g', order: 2 },
        { id: 'i6', type: PlanItemType.Meal, name: 'Cena', description: 'Manzo magro 150g, verdure grigliate, riso', order: 3 },
      ],
    },
    {
      dayOfWeek: 'wednesday',
      items: [
        { id: 'i7', type: PlanItemType.Meal, name: 'Colazione', description: 'Pancake proteici (albumi), miele', order: 1 },
        { id: 'i8', type: PlanItemType.Meal, name: 'Pranzo', description: 'Tonno 150g, pasta integrale, pomodori', order: 2 },
        { id: 'i9', type: PlanItemType.Meal, name: 'Cena', description: 'Pollo al forno 180g, contorno di verdure', order: 3 },
      ],
    },
    {
      dayOfWeek: 'thursday',
      items: [
        { id: 'i10', type: PlanItemType.Meal, name: 'Colazione', description: 'Pane integrale con burro di arachidi, banana', order: 1 },
        { id: 'i11', type: PlanItemType.Meal, name: 'Pranzo', description: 'Zuppa di legumi, pane', order: 2 },
        { id: 'i12', type: PlanItemType.Meal, name: 'Cena', description: 'Salmone grigliato 150g, asparagi, riso basmati', order: 3 },
      ],
    },
    {
      dayOfWeek: 'friday',
      items: [
        { id: 'i13', type: PlanItemType.Meal, name: 'Colazione', description: 'Uova strapazzate 3, toast integrale', order: 1 },
        { id: 'i14', type: PlanItemType.Meal, name: 'Pranzo', description: 'Riso con verdure miste e carne macinata magra', order: 2 },
        { id: 'i15', type: PlanItemType.Meal, name: 'Cena', description: 'Tacchino al forno 180g, patata, salad', order: 3 },
      ],
    },
    {
      dayOfWeek: 'saturday',
      items: [
        { id: 'i16', type: PlanItemType.Meal, name: 'Colazione', description: 'Cereali integrali con latte, frutta', order: 1 },
        { id: 'i17', type: PlanItemType.Meal, name: 'Pranzo', description: 'Pizza integrale 2 fette + salad (meal concesso)', order: 2 },
        { id: 'i18', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce bianco 170g, verdure, riso integrale', order: 3 },
      ],
    },
    {
      dayOfWeek: 'sunday',
      items: [
        { id: 'i19', type: PlanItemType.Meal, name: 'Colazione', description: 'Frittata di verdure, pane tostato', order: 1 },
        { id: 'i20', type: PlanItemType.Meal, name: 'Pranzo', description: 'Minestra d\'orzo con verdure', order: 2 },
        { id: 'i21', type: PlanItemType.Meal, name: 'Cena', description: 'Pollo al limone 160g, contorno misto', order: 3 },
      ],
    },
  ],
};

const WEEKLY_SCHEDULE_LIGHT: WeeklySchedule = {
  days: [
    {
      dayOfWeek: 'monday',
      items: [
        { id: 'l1', type: PlanItemType.Meal, name: 'Colazione', description: 'Caffè, toast leggero, mela', order: 1 },
        { id: 'l2', type: PlanItemType.Meal, name: 'Pranzo', description: 'Petto di pollo 120g, lattuga, limone', order: 2 },
        { id: 'l3', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce magro 150g, zucchini, acqua', order: 3 },
      ],
    },
    {
      dayOfWeek: 'tuesday',
      items: [
        { id: 'l4', type: PlanItemType.Meal, name: 'Colazione', description: 'Tè, yogurt scremato', order: 1 },
        { id: 'l5', type: PlanItemType.Meal, name: 'Pranzo', description: 'Insalata con tonno in acqua 100g', order: 2 },
        { id: 'l6', type: PlanItemType.Meal, name: 'Cena', description: 'Minestrone di verdure, brodo', order: 3 },
      ],
    },
    {
      dayOfWeek: 'wednesday',
      items: [
        { id: 'l7', type: PlanItemType.Meal, name: 'Colazione', description: 'Uovo sodo, fetta di pane', order: 1 },
        { id: 'l8', type: PlanItemType.Meal, name: 'Pranzo', description: 'Riso al tonno leggero', order: 2 },
        { id: 'l9', type: PlanItemType.Meal, name: 'Cena', description: 'Petto tacchino 120g, verdure grigliate', order: 3 },
      ],
    },
    {
      dayOfWeek: 'thursday',
      items: [
        { id: 'l10', type: PlanItemType.Meal, name: 'Colazione', description: 'Caffellatte scremato', order: 1 },
        { id: 'l11', type: PlanItemType.Meal, name: 'Pranzo', description: 'Chicken salad leggero', order: 2 },
        { id: 'l12', type: PlanItemType.Meal, name: 'Cena', description: 'Brodo con verdure, pane tostato', order: 3 },
      ],
    },
    {
      dayOfWeek: 'friday',
      items: [
        { id: 'l13', type: PlanItemType.Meal, name: 'Colazione', description: 'Tè, biscotto integrale', order: 1 },
        { id: 'l14', type: PlanItemType.Meal, name: 'Pranzo', description: 'Gazpacho di verdure', order: 2 },
        { id: 'l15', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce bianco 140g, limone, insalata', order: 3 },
      ],
    },
    {
      dayOfWeek: 'saturday',
      items: [
        { id: 'l16', type: PlanItemType.Meal, name: 'Colazione', description: 'Yogurt con mele', order: 1 },
        { id: 'l17', type: PlanItemType.Meal, name: 'Pranzo', description: 'Verdure grigliate con petto di pollo', order: 2 },
        { id: 'l18', type: PlanItemType.Meal, name: 'Cena', description: 'Vellutata di verdure (leggera)', order: 3 },
      ],
    },
    {
      dayOfWeek: 'sunday',
      items: [
        { id: 'l19', type: PlanItemType.Meal, name: 'Colazione', description: 'Caffè con latte scremato', order: 1 },
        { id: 'l20', type: PlanItemType.Meal, name: 'Pranzo', description: 'Brodino con pasta d\'orzo', order: 2 },
        { id: 'l21', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce 130g, verdure al vapore', order: 3 },
      ],
    },
  ],
};

const WEEKLY_SCHEDULE_MAINTENANCE: WeeklySchedule = {
  days: [
    {
      dayOfWeek: 'monday',
      items: [
        { id: 'm1', type: PlanItemType.Meal, name: 'Colazione', description: 'Porridge con frutta fresca', order: 1 },
        { id: 'm2', type: PlanItemType.Meal, name: 'Pranzo', description: 'Insalata di riso con verdure e pollo 130g', order: 2 },
        { id: 'm3', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce 160g, patata dolce, spinaci', order: 3 },
      ],
    },
    {
      dayOfWeek: 'tuesday',
      items: [
        { id: 'm4', type: PlanItemType.Meal, name: 'Colazione', description: 'Smoothie proteine, banana', order: 1 },
        { id: 'm5', type: PlanItemType.Meal, name: 'Pranzo', description: 'Poke bowl con salmone e riso', order: 2 },
        { id: 'm6', type: PlanItemType.Meal, name: 'Cena', description: 'Pollo 160g, riso integrale, verdure', order: 3 },
      ],
    },
    {
      dayOfWeek: 'wednesday',
      items: [
        { id: 'm7', type: PlanItemType.Meal, name: 'Colazione', description: 'Avena con proteine in polvere', order: 1 },
        { id: 'm8', type: PlanItemType.Meal, name: 'Pranzo', description: 'Tonno 140g, quinoa, cavolo riccio', order: 2 },
        { id: 'm9', type: PlanItemType.Meal, name: 'Cena', description: 'Manzo magro 160g, patata, verdure', order: 3 },
      ],
    },
    {
      dayOfWeek: 'thursday',
      items: [
        { id: 'm10', type: PlanItemType.Meal, name: 'Colazione', description: 'Uova strapazzate, pane integrale', order: 1 },
        { id: 'm11', type: PlanItemType.Meal, name: 'Pranzo', description: 'Bowl con verdure grigliate e pollo affumicato', order: 2 },
        { id: 'm12', type: PlanItemType.Meal, name: 'Cena', description: 'Salmone 160g, asparagi, riso basmati', order: 3 },
      ],
    },
    {
      dayOfWeek: 'friday',
      items: [
        { id: 'm13', type: PlanItemType.Meal, name: 'Colazione', description: 'Pancakes proteici con burro di mandorle', order: 1 },
        { id: 'm14', type: PlanItemType.Meal, name: 'Pranzo', description: 'Pasta integrale al ragù di verdure', order: 2 },
        { id: 'm15', type: PlanItemType.Meal, name: 'Cena', description: 'Pesce bianco 170g, patata, insalata', order: 3 },
      ],
    },
    {
      dayOfWeek: 'saturday',
      items: [
        { id: 'm16', type: PlanItemType.Meal, name: 'Colazione', description: 'Haka bowl con frutta e granola', order: 1 },
        { id: 'm17', type: PlanItemType.Meal, name: 'Pranzo', description: 'Paella ai frutti di mare', order: 2 },
        { id: 'm18', type: PlanItemType.Meal, name: 'Cena', description: 'Tacchino 160g, riso, verdure', order: 3 },
      ],
    },
    {
      dayOfWeek: 'sunday',
      items: [
        { id: 'm19', type: PlanItemType.Meal, name: 'Colazione', description: 'Frittata di verdure con formaggio', order: 1 },
        { id: 'm20', type: PlanItemType.Meal, name: 'Pranzo', description: 'Brodetto di pesce (specialità della casa)', order: 2 },
        { id: 'm21', type: PlanItemType.Meal, name: 'Cena', description: 'Petto di pollo 170g, riso selvaggio, verdure', order: 3 },
      ],
    },
  ],
};

// ============================================================================
// PLANS
// ============================================================================

export const MOCK_PLAN_TAGS: PlanTag[] = [
  {
    id: 'tag-proteico',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Proteico',
    slug: 'proteico',
    color: 'emerald',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'tag-celiachia',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Celiachia',
    slug: 'celiachia',
    color: 'amber',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'tag-reset',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Reset abitudini',
    slug: 'reset-abitudini',
    color: 'slate',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'tag-mantenimento',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Mantenimento',
    slug: 'mantenimento',
    color: 'blue',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'tag-low-carb',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Low carb',
    slug: 'low-carb',
    color: 'violet',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 'plan-marco-classic',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Piano Proteico Classico',
    description: 'Piano bilanciato ad alto contenuto proteico per perdita di peso sostenibile',
    summary: 'Template base ad alto contenuto proteico con struttura semplice e ripetibile.',
    status: 'published',
    contentJson: createPlanDocument({
      title: 'Piano Proteico Classico',
      intro: 'Schema flessibile con focus su sazieta, proteine distribuite e pasti semplici da replicare.',
      callout: {
        title: 'Callout professionale',
        body: 'Nei giorni con allenamento, aggiungere una quota proteica post workout e anticipare l idratazione.',
        tone: 'success',
      },
      sections: [
        {
          title: 'Linee guida principali',
          bullets: [
            'Ogni pasto principale deve includere una fonte proteica chiara.',
            'Verdure libere in almeno due pasti al giorno.',
            'Snack opzionale solo se compare fame reale, non abitudine.',
          ],
        },
        {
          title: 'Categorie di pasti',
          bullets: [
            'Colazione proteica con uova, yogurt greco o skyr.',
            'Pranzo con proteina magra, cereale semplice e verdure.',
            'Cena leggera ad alta sazieta con proteina e contorno.',
          ],
        },
      ],
      orderedSteps: {
        title: 'Protocollo settimanale rapido',
        steps: [
          'Preparazione spesa e meal prep in un unico blocco.',
          'Controllo aderenza a meta settimana con mini check.',
          'Revisione porzioni solo se peso e feedback non sono coerenti.',
        ],
      },
      quote:
        'Obiettivo reale: costanza alta per 4 settimane consecutive, non perfezione quotidiana.',
      footerLink: { label: 'Guida prodotti senza glutine', href: 'https://example.com/guida-senza-glutine' },
    }),
    contentText:
      'Schema flessibile con focus su sazieta, proteine distribuite e pasti semplici da replicare.',
    tags: MOCK_PLAN_TAGS.filter((tag) => ['proteico', 'celiachia'].includes(tag.slug)),
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-03-08'),
    publishedAt: new Date('2026-02-01'),
    lastEditedBy: DEFAULT_NUTRITIONIST_ID,
    version: 3,
    professionalNotes: 'ClientMarco - consistenza alta, perdita di peso 0.5-0.7kg/week target',
  },
  {
    id: 'plan-giulia-light',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Piano Leggero Ipocalorico',
    description: 'Piano ipocalorico per perdita di peso moderata',
    summary: 'Template leggero per clienti che hanno bisogno di più struttura e meno variabilità.',
    status: 'published',
    contentJson: createPlanDocument({
      title: 'Piano Leggero Ipocalorico',
      intro: 'Impostazione essenziale con porzioni semplici e messaggi chiari per ridurre il carico decisionale.',
      callout: {
        title: 'Nota strategica',
        body: 'Nei weekend non ridurre i pasti: tenere struttura costante e modulare solo i condimenti.',
        tone: 'warning',
      },
      sections: [
        {
          title: 'Priorita del piano',
          bullets: [
            'Ripetere pasti facili invece di cercare varietà continua.',
            'Tenere i condimenti sotto controllo ma senza rigidità assoluta.',
            'Puntare sulla consistenza settimanale, non sulla perfezione del singolo giorno.',
          ],
        },
      ],
      orderedSteps: {
        title: 'Check operativo',
        steps: [
          'Stabilire 3 colazioni standard e ruotarle.',
          'Bloccare 2 pranzi automatici da preparare in batch.',
          'Usare un solo pasto libero gestito a settimana.',
        ],
      },
    }),
    contentText:
      'Impostazione essenziale con porzioni semplici e messaggi chiari per ridurre il carico decisionale.',
    tags: MOCK_PLAN_TAGS.filter((tag) => ['low-carb'].includes(tag.slug)),
    weeklySchedule: WEEKLY_SCHEDULE_LIGHT,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-12'),
    publishedAt: new Date('2026-01-15'),
    lastEditedBy: DEFAULT_NUTRITIONIST_ID,
    version: 2,
    professionalNotes: 'Intended for moderate caloric deficit, but Giulia has struggled with adherence',
  },
  {
    id: 'plan-alessandro-reset',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Piano di Ripartenza',
    description: 'Piano semplice per ricostruire abitudini di base',
    summary: 'Documento guidato per ripartire da routine, orari e scelte molto prevedibili.',
    status: 'published',
    contentJson: createPlanDocument({
      title: 'Piano di Ripartenza',
      intro: 'Percorso minimo per riprendere regolarita prima di aumentare complessità o vincoli.',
      callout: {
        title: 'Fase 1: reset',
        body: 'Per le prime due settimane evitare regole avanzate: conta solo tornare a eseguire.',
        tone: 'info',
      },
      sections: [
        {
          title: 'Abitudini da consolidare',
          bullets: [
            'Tre pasti principali con orari abbastanza costanti.',
            'Lista spesa corta e ripetibile ogni settimana.',
            'Nessun obiettivo avanzato finché la routine non regge per almeno 14 giorni.',
          ],
        },
      ],
      quote:
        'Prima regola: ripetizione. Seconda regola: semplicità. Il resto arriva dopo.',
    }),
    contentText:
      'Percorso minimo per riprendere regolarita prima di aumentare complessità o vincoli.',
    tags: MOCK_PLAN_TAGS.filter((tag) => ['reset-abitudini'].includes(tag.slug)),
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-24'),
    publishedAt: new Date('2026-03-10'),
    lastEditedBy: DEFAULT_NUTRITIONIST_ID,
    version: 1,
    professionalNotes: 'Alessandro needs to build consistency first. No complex restrictions.',
  },
  {
    id: 'plan-francesca-maintenance',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Piano Mantenimento Premium',
    description: 'Piano per mantenimento del peso con varietà e piacere',
    summary: 'Assetto flessibile per mantenimento, socialita e qualità alimentare.',
    status: 'published',
    contentJson: createPlanDocument({
      title: 'Piano Mantenimento Premium',
      intro: 'Piano flessibile per mantenere i risultati senza perdere struttura e controllo.',
      callout: {
        title: 'Gestione socialità',
        body: 'Nelle cene fuori casa: priorita a proteine e vegetali, poi porzioni moderate sui carboidrati.',
        tone: 'success',
      },
      sections: [
        {
          title: 'Focus del mantenimento',
          bullets: [
            'Mantenere il ritmo più che inseguire restrizione.',
            'Inserire pasti sociali senza uscire dalla struttura della settimana.',
            'Monitorare peso e sensazioni senza micro-correzioni quotidiane.',
          ],
        },
      ],
      orderedSteps: {
        title: 'Routine mensile',
        steps: [
          'Settimana 1-2: mantenere schema base senza modifiche.',
          'Settimana 3: inserire variazione controllata su 2 pasti.',
          'Settimana 4: review con nutrizionista e micro aggiustamenti.',
        ],
      },
    }),
    contentText: 'Piano flessibile per mantenere i risultati senza perdere struttura e controllo.',
    tags: MOCK_PLAN_TAGS.filter((tag) => ['mantenimento'].includes(tag.slug)),
    weeklySchedule: WEEKLY_SCHEDULE_MAINTENANCE,
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-04-01'),
    publishedAt: new Date('2026-03-15'),
    lastEditedBy: DEFAULT_NUTRITIONIST_ID,
    version: 2,
    professionalNotes: 'Francesca è pronta per fase di mantenimento e può aggiungere movimento',
  },
  {
    id: 'plan-elena-starter',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    name: 'Piano Base - Abitudini',
    description: 'Piano semplice e sostenibile per nuovi clienti - focus su abitudini',
    summary: 'Template base per onboarding nutrizionale e semplificazione massima.',
    status: 'published',
    contentJson: createPlanDocument({
      title: 'Piano Base - Abitudini',
      intro: 'Percorso onboarding con indicazioni pratiche e alta ripetibilità per ridurre attrito iniziale.',
      callout: {
        title: 'Regola delle 2 settimane',
        body: 'Niente modifiche al piano prima di 14 giorni continui di tracking.',
        tone: 'info',
      },
      sections: [
        {
          title: 'Messaggi chiave',
          bullets: [
            'Pochi pasti di riferimento da conoscere bene.',
            'Acqua, regolarità e preparazione spesa come base del lavoro.',
            'Obiettivo primario: aderenza, non ottimizzazione.',
          ],
        },
      ],
      orderedSteps: {
        title: 'Percorso di avvio',
        steps: [
          'Settimana 1: apprendere struttura e orari.',
          'Settimana 2: consolidare routine e lista spesa.',
          'Settimana 3: prima revisione con eventuali micro modifiche.',
        ],
      },
    }),
    contentText: 'Percorso onboarding con indicazioni pratiche e alta ripetibilità per ridurre attrito iniziale.',
    tags: MOCK_PLAN_TAGS.filter((tag) => ['reset-abitudini'].includes(tag.slug)),
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-04-09'),
    publishedAt: new Date('2026-04-09'),
    lastEditedBy: DEFAULT_NUTRITIONIST_ID,
    version: 2,
    professionalNotes: 'Elena è nuova, focus su habit building. Expect 4-week ramp-up period.',
  },
];

export const MOCK_PLAN_ASSIGNMENTS: PlanAssignment[] = [
  {
    id: 'assignment-marco-classic',
    planId: 'plan-marco-classic',
    clientId: 'client-marco',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-02-01'),
    startedAt: new Date('2026-02-01'),
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
  },
  {
    id: 'assignment-davide-classic',
    planId: 'plan-marco-classic',
    clientId: 'client-davide',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-02-22'),
    startedAt: new Date('2026-02-22'),
    createdAt: new Date('2026-02-22'),
    updatedAt: new Date('2026-02-22'),
  },
  {
    id: 'assignment-giulia-light',
    planId: 'plan-giulia-light',
    clientId: 'client-giulia',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-01-15'),
    startedAt: new Date('2026-01-15'),
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'assignment-alessandro-reset',
    planId: 'plan-alessandro-reset',
    clientId: 'client-alessandro',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-03-10'),
    startedAt: new Date('2026-03-10'),
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-10'),
  },
  {
    id: 'assignment-francesca-maintenance',
    planId: 'plan-francesca-maintenance',
    clientId: 'client-francesca',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-03-15'),
    startedAt: new Date('2026-03-15'),
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-03-15'),
  },
  {
    id: 'assignment-elena-starter',
    planId: 'plan-elena-starter',
    clientId: 'client-elena',
    nutritionistId: DEFAULT_NUTRITIONIST_ID,
    status: 'active',
    assignedAt: new Date('2026-04-09'),
    startedAt: new Date('2026-04-09'),
    createdAt: new Date('2026-04-09'),
    updatedAt: new Date('2026-04-09'),
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getPlanById(id: string): Plan | undefined {
  return MOCK_PLANS.find((plan) => plan.id === id);
}

export function getPlanByClientId(clientId: string) {
  return getAssignedPlanByClientId(MOCK_PLANS, MOCK_PLAN_ASSIGNMENTS, clientId);
}

export function getAllPlans(): Plan[] {
  return MOCK_PLANS;
}

export function getPublishedPlans(): Plan[] {
  return filterPublishedPlans(MOCK_PLANS);
}

export function getActivePlans() {
  return getActiveAssignedPlans(MOCK_PLANS, MOCK_PLAN_ASSIGNMENTS);
}

export function getPlanAssignmentsByClientId(clientId: string): PlanAssignment[] {
  return MOCK_PLAN_ASSIGNMENTS.filter((assignment) => assignment.clientId === clientId);
}

export function getPlanAssignmentsByPlanId(planId: string): PlanAssignment[] {
  return MOCK_PLAN_ASSIGNMENTS.filter((assignment) => assignment.planId === planId)
}

export function getPlansByTagSlug(tagSlug: string): Plan[] {
  return filterPlansByTagSlug(MOCK_PLANS, tagSlug);
}

export function getAllPlanTags(): PlanTag[] {
  return MOCK_PLAN_TAGS;
}
