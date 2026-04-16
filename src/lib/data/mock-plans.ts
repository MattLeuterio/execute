/**
 * Mock plan data
 * Realistic nutrition plans assigned to clients
 * 
 * Plans are 7-day templates that repeat weekly.
 * Each day has 3 items: breakfast, lunch, dinner.
 * For MVP, items are just names + descriptions (no macros, no complexity).
 */

import { Plan, WeeklySchedule, DailyPlan, PlanItemType } from '../types';

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

export const MOCK_PLANS: Plan[] = [
  {
    id: 'plan-marco-classic',
    clientId: 'client-marco',
    name: 'Piano Proteico Classico',
    description: 'Piano bilanciato ad alto contenuto proteico per perdita di peso sostenibile',
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    startDate: new Date('2026-02-01'),
    isActive: true,
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
    professionalNotes: 'ClientMarco - consistenza alta, perdita di peso 0.5-0.7kg/week target',
  },
  {
    id: 'plan-giulia-light',
    clientId: 'client-giulia',
    name: 'Piano Leggero Ipocalorico',
    description: 'Piano ipocalorico per perdita di peso moderata',
    weeklySchedule: WEEKLY_SCHEDULE_LIGHT,
    startDate: new Date('2026-01-15'),
    isActive: true,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    professionalNotes: 'Intended for moderate caloric deficit, but Giulia has struggled with adherence',
  },
  {
    id: 'plan-alessandro-reset',
    clientId: 'client-alessandro',
    name: 'Piano di Ripartenza',
    description: 'Piano semplice per ricostruire abitudini di base',
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    startDate: new Date('2026-03-10'),
    isActive: true,
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-10'),
    professionalNotes: 'Alessandro needs to build consistency first. No complex restrictions.',
  },
  {
    id: 'plan-francesca-maintenance',
    clientId: 'client-francesca',
    name: 'Piano Mantenimento Premium',
    description: 'Piano per mantenimento del peso con varietà e piacere',
    weeklySchedule: WEEKLY_SCHEDULE_MAINTENANCE,
    startDate: new Date('2026-03-15'),
    isActive: true,
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-03-15'),
    professionalNotes: 'Francesca è pronta per fase di mantenimento e può aggiungere movimento',
  },
  {
    id: 'plan-davide-standard',
    clientId: 'client-davide',
    name: 'Piano Standard Protein+',
    description: 'Piano ad alto contenuto proteico con deficit moderato',
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    startDate: new Date('2026-02-22'),
    isActive: true,
    createdAt: new Date('2026-02-22'),
    updatedAt: new Date('2026-02-22'),
    professionalNotes: 'Davide è migliorato significativamente negli ultimi 3 settimane. Continue con supporto settimanale.',
  },
  {
    id: 'plan-elena-starter',
    clientId: 'client-elena',
    name: 'Piano Base - Abitudini',
    description: 'Piano semplice e sostenibile per nuovi clienti - focus su abitudini',
    weeklySchedule: WEEKLY_SCHEDULE_BALANCED,
    startDate: new Date('2026-03-28'),
    isActive: true,
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-03-28'),
    professionalNotes: 'Elena è nuova, focus su habit building. Expect 4-week ramp-up period.',
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getPlanById(id: string): Plan | undefined {
  return MOCK_PLANS.find((plan) => plan.id === id);
}

export function getPlanByClientId(clientId: string): Plan | undefined {
  return MOCK_PLANS.find((plan) => plan.clientId === clientId);
}

export function getAllPlans(): Plan[] {
  return MOCK_PLANS;
}

export function getActivePlans(): Plan[] {
  return MOCK_PLANS.filter((plan) => plan.isActive);
}
