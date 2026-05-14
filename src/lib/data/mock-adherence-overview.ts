/**
 * Mock adherence overview adapter
 * Aggregates daily adherence, plan schedule, check-ins, measurements, and notes
 * into a UI-ready contract for client detail overview and day drill-down.
 */

import {
  type AdherenceDayDetail,
  type AdherenceDayState,
  type AdherenceMonthWindowStrategy,
  type AdherenceOverview,
  type AdherenceOverviewPeriod,
  type AdherenceOverviewView,
  type DayDetailEvent,
  type DayOverviewItem,
  type MeasurementType,
} from '../types';
import { MOCK_ADHERENCE_ENTRIES } from './mock-adherence';
import {
  MOCK_COMPLETED_CHECKINS,
  MOCK_MEASUREMENT_ENTRIES,
  MOCK_WEIGHT_ENTRIES,
} from './mock-checkins';
import { MOCK_PROFESSIONAL_NOTES } from './mock-notes';
import { getPlanByClientId } from './mock-plans';

interface GetAdherenceOverviewOptions {
  periodType?: AdherenceOverviewPeriod;
  viewType?: AdherenceOverviewView;
  monthWindowStrategy?: AdherenceMonthWindowStrategy;
  anchorDate?: Date;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

interface DateWindow {
  startDate: Date;
  endDate: Date;
}

interface DailyAdherenceAggregate {
  completedItems: number;
  totalItems: number;
  planId?: string;
}

interface DayWeightValue {
  value: number;
  unit: 'kg' | 'lbs';
  recordedAt: Date;
}

const DAY_OF_WEEK: Array<
  'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
> = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// A streak starts from at least 2 consecutive perfect tracked days.
const MIN_PERFECT_STREAK_LENGTH = 2;

function roundPercent(value: number): number {
  return Math.round(value);
}

function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number): Date {
  const copy = startOfDay(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function listDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const cursor = startOfDay(startDate);
  const last = startOfDay(endDate);

  while (cursor.getTime() <= last.getTime()) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
}

function getPlannedItemsForDate(clientId: string, date: Date): { plannedItems: number; planId?: string } {
  const plan = getPlanByClientId(clientId);
  if (!plan || !plan.isActive) {
    return { plannedItems: 0 };
  }

  if (date.getTime() < startOfDay(plan.startDate).getTime()) {
    return { plannedItems: 0, planId: plan.id };
  }

  if (plan.endDate && date.getTime() > startOfDay(plan.endDate).getTime()) {
    return { plannedItems: 0, planId: plan.id };
  }

  if (!plan.weeklySchedule) {
    return { plannedItems: 0, planId: plan.id };
  }

  const dayName = DAY_OF_WEEK[date.getDay()];
  const dayPlan = plan.weeklySchedule.days.find((day) => day.dayOfWeek === dayName);

  return {
    plannedItems: dayPlan?.items.length ?? 0,
    planId: plan.id,
  };
}

function buildDailyAdherenceMap(clientId: string): Map<string, DailyAdherenceAggregate> {
  const map = new Map<string, DailyAdherenceAggregate>();

  for (const entry of MOCK_ADHERENCE_ENTRIES) {
    if (entry.clientId !== clientId) continue;

    const key = getDateKey(entry.date);
    const existing = map.get(key);

    if (!existing) {
      map.set(key, {
        completedItems: entry.completedItems,
        totalItems: entry.totalItems,
        planId: entry.planId,
      });
      continue;
    }

    existing.completedItems += entry.completedItems;
    existing.totalItems += entry.totalItems;
    if (!existing.planId && entry.planId) {
      existing.planId = entry.planId;
    }
  }

  return map;
}

function buildWeightDateSet(clientId: string): Set<string> {
  const set = new Set<string>();

  for (const entry of MOCK_WEIGHT_ENTRIES) {
    if (entry.clientId === clientId) {
      set.add(getDateKey(entry.recordedAt));
    }
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId === clientId && checkIn.data.weight) {
      set.add(getDateKey(checkIn.data.weight.recordedAt));
    }
  }

  return set;
}

function buildMeasurementDateSet(clientId: string): Set<string> {
  const set = new Set<string>();

  for (const entry of MOCK_MEASUREMENT_ENTRIES) {
    if (entry.clientId === clientId) {
      set.add(getDateKey(entry.recordedAt));
    }
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId !== clientId) continue;
    if (!checkIn.data.measurements?.length) continue;
    set.add(getDateKey(checkIn.completedAt));
  }

  return set;
}

function buildCommentDateSet(clientId: string): Set<string> {
  const set = new Set<string>();

  for (const note of MOCK_PROFESSIONAL_NOTES) {
    if (note.clientId === clientId) {
      set.add(getDateKey(note.createdAt));
    }
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId === clientId && checkIn.data.notes) {
      set.add(getDateKey(checkIn.completedAt));
    }
  }

  return set;
}

function buildCommentCountMap(clientId: string): Map<string, number> {
  const map = new Map<string, number>();

  for (const note of MOCK_PROFESSIONAL_NOTES) {
    if (note.clientId !== clientId) continue;
    const key = getDateKey(note.createdAt);
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId !== clientId || !checkIn.data.notes) continue;
    const key = getDateKey(checkIn.completedAt);
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  return map;
}

function buildMeasurementTypesMap(clientId: string): Map<string, MeasurementType[]> {
  const map = new Map<string, Set<MeasurementType>>();

  for (const entry of MOCK_MEASUREMENT_ENTRIES) {
    if (entry.clientId !== clientId) continue;
    const key = getDateKey(entry.recordedAt);
    const set = map.get(key) ?? new Set<MeasurementType>();
    set.add(entry.type);
    map.set(key, set);
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId !== clientId) continue;
    if (!checkIn.data.measurements?.length) continue;

    const key = getDateKey(checkIn.completedAt);
    const set = map.get(key) ?? new Set<MeasurementType>();

    for (const measurement of checkIn.data.measurements) {
      set.add(measurement.type);
    }

    map.set(key, set);
  }

  return new Map(
    Array.from(map.entries()).map(([key, set]) => [key, Array.from(set.values())])
  );
}

function buildLatestWeightByDateMap(clientId: string): Map<string, DayWeightValue> {
  const map = new Map<string, DayWeightValue>();

  for (const entry of MOCK_WEIGHT_ENTRIES) {
    if (entry.clientId !== clientId) continue;
    const key = getDateKey(entry.recordedAt);
    const existing = map.get(key);

    if (!existing || entry.recordedAt.getTime() > existing.recordedAt.getTime()) {
      map.set(key, {
        value: entry.value,
        unit: entry.unit,
        recordedAt: entry.recordedAt,
      });
    }
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId !== clientId || !checkIn.data.weight) continue;

    const weight = checkIn.data.weight;
    const key = getDateKey(weight.recordedAt);
    const existing = map.get(key);

    if (!existing || weight.recordedAt.getTime() > existing.recordedAt.getTime()) {
      map.set(key, {
        value: weight.value,
        unit: weight.unit,
        recordedAt: weight.recordedAt,
      });
    }
  }

  return map;
}

function getLatestActivityDate(clientId: string): Date {
  const candidates: Date[] = [];

  for (const entry of MOCK_ADHERENCE_ENTRIES) {
    if (entry.clientId === clientId) candidates.push(entry.date);
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId === clientId) candidates.push(checkIn.completedAt);
  }

  for (const note of MOCK_PROFESSIONAL_NOTES) {
    if (note.clientId === clientId) candidates.push(note.createdAt);
  }

  for (const entry of MOCK_WEIGHT_ENTRIES) {
    if (entry.clientId === clientId) candidates.push(entry.recordedAt);
  }

  for (const entry of MOCK_MEASUREMENT_ENTRIES) {
    if (entry.clientId === clientId) candidates.push(entry.recordedAt);
  }

  if (!candidates.length) {
    return startOfDay(new Date());
  }

  return new Date(Math.max(...candidates.map((date) => date.getTime())));
}

function resolveDateWindow(
  periodType: AdherenceOverviewPeriod,
  anchorDate: Date,
  monthWindowStrategy: AdherenceMonthWindowStrategy
): DateWindow {
  const anchor = startOfDay(anchorDate);

  if (periodType === 'week') {
    return {
      startDate: addDays(anchor, -6),
      endDate: anchor,
    };
  }

  if (monthWindowStrategy === 'rolling30') {
    return {
      startDate: addDays(anchor, -29),
      endDate: anchor,
    };
  }

  return {
    startDate: new Date(anchor.getFullYear(), anchor.getMonth(), 1),
    endDate: new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0),
  };
}

function getDayState(isTracked: boolean, adherencePercentage: number | null, completedItems: number): AdherenceDayState {
  if (!isTracked) return 'not_tracked';
  if (completedItems === 0) return 'not_started';
  if (adherencePercentage === 100) return 'completed';
  return 'partial';
}

function getStreakMetrics(days: DayOverviewItem[]): {
  currentStreak: number;
  bestStreak: number;
  streakDayKeys: Set<string>;
  streakLengthByDayKey: Map<string, number>;
} {
  let currentStreak = 0;
  let bestStreak = 0;
  let running = 0;
  const streakLengthByDayKey = new Map<string, number>();
  let runningKeys: string[] = [];
  const streakDayKeys = new Set<string>();

  for (const day of days) {
    if (day.isPerfectDay) {
      running += 1;
      runningKeys.push(getDateKey(day.date));
      bestStreak = Math.max(bestStreak, running);
    } else {
      if (running >= MIN_PERFECT_STREAK_LENGTH) {
        runningKeys.forEach((key, index) => {
          streakDayKeys.add(key);
          streakLengthByDayKey.set(key, index + 1);
        });
      }
      running = 0;
      runningKeys = [];
    }
  }

  if (running >= MIN_PERFECT_STREAK_LENGTH) {
    runningKeys.forEach((key, index) => {
      streakDayKeys.add(key);
      streakLengthByDayKey.set(key, index + 1);
    });
  }

  let lastTrackedIndex = days.length - 1;
  while (lastTrackedIndex >= 0 && !days[lastTrackedIndex].isTracked) {
    lastTrackedIndex -= 1;
  }

  for (let i = lastTrackedIndex; i >= 0; i -= 1) {
    const day = days[i];
    if (!day.isPerfectDay) {
      break;
    }
    currentStreak += 1;
  }

  return {
    currentStreak,
    bestStreak,
    streakDayKeys,
    streakLengthByDayKey,
  };
}

export function getMockAdherenceOverviewByClientId(
  clientId: string,
  options: GetAdherenceOverviewOptions = {}
): AdherenceOverview {
  const periodType = options.periodType ?? 'week';
  const viewType = options.viewType ?? 'calendar';
  const monthWindowStrategy = options.monthWindowStrategy ?? 'calendar';
  const anchorDate = options.anchorDate ?? getLatestActivityDate(clientId);
  const hasCustomRange = Boolean(options.dateRange?.from && options.dateRange?.to);
  const dateWindow = hasCustomRange
    ? {
        startDate: startOfDay(options.dateRange!.from),
        endDate: startOfDay(options.dateRange!.to),
      }
    : resolveDateWindow(periodType, anchorDate, monthWindowStrategy);
  const dates = listDatesInRange(dateWindow.startDate, dateWindow.endDate);

  const adherenceByDay = buildDailyAdherenceMap(clientId);
  const commentDays = buildCommentDateSet(clientId);
  const commentCountByDay = buildCommentCountMap(clientId);
  const weightDays = buildWeightDateSet(clientId);
  const weightByDay = buildLatestWeightByDateMap(clientId);
  const measurementDays = buildMeasurementDateSet(clientId);
  const measurementTypesByDay = buildMeasurementTypesMap(clientId);

  const days: DayOverviewItem[] = dates.map((date) => {
    const key = getDateKey(date);
    const adherence = adherenceByDay.get(key);

    const trackedCompletedItems = adherence?.completedItems ?? 0;
    const planInfo = getPlannedItemsForDate(clientId, date);
    const plannedItems = planInfo.plannedItems > 0 ? planInfo.plannedItems : (adherence?.totalItems ?? 0);

    const isTracked = Boolean(adherence);
    const adherencePercentage =
      isTracked && plannedItems > 0
        ? roundPercent((trackedCompletedItems / plannedItems) * 100)
        : null;

    const hasWeightCheck = weightDays.has(key);
    const hasMeasurementCheck = measurementDays.has(key);
    const hasComment = commentDays.has(key);
    const commentCount = commentCountByDay.get(key) ?? 0;
    const measurementTypes = measurementTypesByDay.get(key) ?? [];
    const latestWeight = weightByDay.get(key);
    const hasAnyCheck = trackedCompletedItems > 0 || hasWeightCheck || hasMeasurementCheck;

    const dayState = getDayState(isTracked, adherencePercentage, trackedCompletedItems);

    return {
      date,
      plannedItems,
      completedItems: trackedCompletedItems,
      adherencePercentage,
      isTracked,
      dayState,
      isPerfectDay: dayState === 'completed',
      isInPerfectStreak: false,
      hasAnyCheck,
      hasComment,
      hasWeightCheck,
      hasMeasurementCheck,
      commentCount,
      measurementTypes,
      weightValue: latestWeight?.value,
      weightUnit: latestWeight?.unit,
      streakLengthAtDay: 0,
    };
  });

  const { currentStreak, bestStreak, streakDayKeys, streakLengthByDayKey } = getStreakMetrics(days);

  for (const day of days) {
    const key = getDateKey(day.date);
    day.isInPerfectStreak = streakDayKeys.has(key);
    day.streakLengthAtDay = streakLengthByDayKey.get(key) ?? 0;
  }

  const trackedDays = days.filter((day) => day.isTracked).length;
  const plannedDays = days.filter((day) => day.plannedItems > 0).length;

  const trackedData = days.filter((day) => day.isTracked && day.plannedItems > 0);
  const completedSum = trackedData.reduce((sum, day) => sum + day.completedItems, 0);
  const plannedSum = trackedData.reduce((sum, day) => sum + day.plannedItems, 0);

  const periodAdherence = plannedSum > 0 ? roundPercent((completedSum / plannedSum) * 100) : null;
  const trackingCoverage = plannedDays > 0 ? roundPercent((trackedDays / plannedDays) * 100) : 0;

  return {
    clientId,
    periodType,
    viewType,
    monthWindowStrategy,
    startDate: dateWindow.startDate,
    endDate: dateWindow.endDate,
    days,
    summary: {
      periodAdherence,
      trackingCoverage,
      currentStreak,
      bestStreak,
      trackedDays,
      plannedDays,
    },
  };
}

function getNotesForDay(clientId: string, key: string): string[] {
  const noteContents = MOCK_PROFESSIONAL_NOTES
    .filter((note) => note.clientId === clientId && getDateKey(note.createdAt) === key)
    .map((note) => note.content);

  const checkInNotes = MOCK_COMPLETED_CHECKINS
    .filter((checkIn) => checkIn.clientId === clientId && checkIn.data.notes && getDateKey(checkIn.completedAt) === key)
    .map((checkIn) => checkIn.data.notes as string);

  return [...noteContents, ...checkInNotes];
}

function getMeasurementTypesForDay(clientId: string, key: string): MeasurementType[] {
  const set = new Set<MeasurementType>();

  for (const entry of MOCK_MEASUREMENT_ENTRIES) {
    if (entry.clientId !== clientId) continue;
    if (getDateKey(entry.recordedAt) !== key) continue;
    set.add(entry.type);
  }

  for (const checkIn of MOCK_COMPLETED_CHECKINS) {
    if (checkIn.clientId !== clientId) continue;
    if (getDateKey(checkIn.completedAt) !== key) continue;

    for (const measurement of checkIn.data.measurements ?? []) {
      set.add(measurement.type);
    }
  }

  return Array.from(set.values());
}

function buildTimeline(clientId: string, dateKey: string, plannedItems: number, completedItems: number): DayDetailEvent[] {
  const events: DayDetailEvent[] = [];

  const adherenceEntries = MOCK_ADHERENCE_ENTRIES.filter(
    (entry) => entry.clientId === clientId && getDateKey(entry.date) === dateKey
  );

  adherenceEntries.forEach((entry, index) => {
    events.push({
      id: `event-adherence-${entry.id}-${index}`,
      type: 'adherence',
      at: entry.recordedAt,
      label: `Aderenza registrata: ${completedItems}/${plannedItems}`,
    });
  });

  const dayCheckins = MOCK_COMPLETED_CHECKINS.filter(
    (checkIn) => checkIn.clientId === clientId && getDateKey(checkIn.completedAt) === dateKey
  );

  dayCheckins.forEach((checkIn) => {
    if (checkIn.data.weight) {
      events.push({
        id: `event-weight-${checkIn.id}`,
        type: 'weight_check',
        at: checkIn.data.weight.recordedAt,
        label: `Check peso: ${checkIn.data.weight.value}${checkIn.data.weight.unit}`,
      });
    }

    if (checkIn.data.measurements?.length) {
      events.push({
        id: `event-measurement-${checkIn.id}`,
        type: 'measurement_check',
        at: checkIn.completedAt,
        label: `Check misure: ${checkIn.data.measurements.length} voci registrate`,
      });
    }

    if (checkIn.data.notes) {
      events.push({
        id: `event-comment-checkin-${checkIn.id}`,
        type: 'comment',
        at: checkIn.completedAt,
        label: `Commento check-in: ${checkIn.data.notes}`,
      });
    }
  });

  const notes = MOCK_PROFESSIONAL_NOTES.filter(
    (note) => note.clientId === clientId && getDateKey(note.createdAt) === dateKey
  );

  notes.forEach((note) => {
    events.push({
      id: `event-comment-note-${note.id}`,
      type: 'comment',
      at: note.createdAt,
      label: `Nota professionale: ${note.content}`,
    });
  });

  return events.sort((a, b) => a.at.getTime() - b.at.getTime());
}

export function getMockAdherenceDayDetailByClientId(
  clientId: string,
  date: Date
): AdherenceDayDetail {
  const key = getDateKey(date);
  const adherenceByDay = buildDailyAdherenceMap(clientId);
  const dayAdherence = adherenceByDay.get(key);

  const planInfo = getPlannedItemsForDate(clientId, date);
  const plannedItems = planInfo.plannedItems > 0 ? planInfo.plannedItems : (dayAdherence?.totalItems ?? 0);
  const completedItems = dayAdherence?.completedItems ?? 0;

  const isTracked = Boolean(dayAdherence);
  const adherencePercentage = isTracked && plannedItems > 0 ? roundPercent((completedItems / plannedItems) * 100) : null;
  const dayState = getDayState(isTracked, adherencePercentage, completedItems);

  const dayWeights = MOCK_WEIGHT_ENTRIES
    .filter((entry) => entry.clientId === clientId && getDateKey(entry.recordedAt) === key)
    .sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime());

  const checkinWeights = MOCK_COMPLETED_CHECKINS
    .filter((checkIn) => checkIn.clientId === clientId && checkIn.data.weight && getDateKey(checkIn.completedAt) === key)
    .map((checkIn) => checkIn.data.weight)
    .filter((weight): weight is NonNullable<typeof weight> => Boolean(weight));

  const mergedWeights = [...dayWeights, ...checkinWeights].sort(
    (a, b) => b.recordedAt.getTime() - a.recordedAt.getTime()
  );

  const notes = getNotesForDay(clientId, key);
  const measurementTypes = getMeasurementTypesForDay(clientId, key);
  const timeline = buildTimeline(clientId, key, plannedItems, completedItems);

  return {
    clientId,
    date: startOfDay(date),
    planId: dayAdherence?.planId ?? planInfo.planId,
    plannedItems,
    completedItems,
    adherencePercentage,
    dayState,
    hasComment: notes.length > 0,
    hasWeightCheck: mergedWeights.length > 0,
    hasMeasurementCheck: measurementTypes.length > 0,
    notes,
    weightValue: mergedWeights[0]?.value,
    measurementTypes,
    timeline,
  };
}
