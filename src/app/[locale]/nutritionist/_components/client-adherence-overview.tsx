"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, MessageSquare, Ruler, Scale } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarRange } from "@/components/ui/calendar-range";
import { AdherenceBadge } from "@/components/common/adherence-badge";
import {
  getChartGridColor,
  getChartTooltipContentStyle,
} from "@/lib/chart-utils";
import { getMockAdherenceOverviewByClientId } from "@/lib/data/mock-adherence-overview";
import { getTranslations, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type OverviewView = "calendar" | "chart";

interface ClientAdherenceOverviewProps {
  clientId: string;
  locale: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (nextRange: DateRange | undefined) => void;
  minDate: Date;
  maxDate: Date;
}

interface AdherenceBarPoint {
  key: string;
  label: string;
  tooltipDateLabel: string;
  adherenceValue: number;
  missingValue: number;
  adherenceLabel: string;
  isTracked: boolean;
  isPerfectDay: boolean;
  isInPerfectStreak: boolean;
  hasComment: boolean;
  commentCount: number;
  hasWeightCheck: boolean;
  weightValue?: number;
  weightUnit?: "kg" | "lbs";
  hasMeasurementCheck: boolean;
  measurementTypes: string[];
  streakLengthAtDay: number;
  rawDate: Date;
}

function getDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function ChartFrame({ children }: { children: React.ReactNode }) {
  return <div className="relative h-72 w-full">{children}</div>;
}

export function ClientAdherenceOverview({
  clientId,
  locale,
  dateRange,
  onDateRangeChange,
  minDate,
  maxDate,
}: ClientAdherenceOverviewProps) {
  const router = useRouter();
  const [viewType, setViewType] = useState<OverviewView>("calendar");
  const t = getTranslations("nutritionist", locale as Locale);
  const detailCopy = t.clients.detail;
  const overviewCopy = detailCopy.adherenceOverview;

  const resolvedDateRange = useMemo(
    () => ({
      from: dateRange?.from ?? dateRange?.to ?? minDate,
      to: dateRange?.to ?? dateRange?.from ?? maxDate,
    }),
    [dateRange?.from, dateRange?.to, minDate, maxDate],
  );

  const overview = useMemo(
    () =>
      getMockAdherenceOverviewByClientId(clientId, {
        periodType: "month",
        viewType,
        monthWindowStrategy: "calendar",
        dateRange: resolvedDateRange,
      }),
    [clientId, viewType, resolvedDateRange],
  );

  const dayLabelFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
    [locale],
  );

  const tooltipDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const barChartData = useMemo<AdherenceBarPoint[]>(
    () =>
      overview.days.map((day) => ({
        key: getDateKey(day.date),
        label: dayLabelFormatter.format(day.date),
        tooltipDateLabel: tooltipDateFormatter
          .format(day.date)
          .split(" ")
          .map((token) =>
            token.length
              ? token.charAt(0).toUpperCase() + token.slice(1)
              : token,
          )
          .join(" "),
        adherenceValue: day.adherencePercentage ?? 0,
        missingValue: day.isTracked ? 0 : 100,
        adherenceLabel:
          day.adherencePercentage === null
            ? overviewCopy.notAvailable
            : `${day.adherencePercentage}%`,
        isTracked: day.isTracked,
        isPerfectDay: day.isPerfectDay,
        isInPerfectStreak: day.isInPerfectStreak,
        hasComment: day.hasComment,
        commentCount: day.commentCount,
        hasWeightCheck: day.hasWeightCheck,
        weightValue: day.weightValue,
        weightUnit: day.weightUnit,
        hasMeasurementCheck: day.hasMeasurementCheck,
        measurementTypes: day.measurementTypes,
        streakLengthAtDay: day.streakLengthAtDay,
        rawDate: day.date,
      })),
    [
      overview.days,
      dayLabelFormatter,
      tooltipDateFormatter,
      overviewCopy.notAvailable,
    ],
  );

  const goToDayDetail = (date: Date) => {
    const dateKey = getDateKey(date);
    router.push(`/${locale}/nutritionist/clients/${clientId}/days/${dateKey}`);
  };

  const formatOverflowIcons = (count: number) =>
    overviewCopy.overflowIcons.replace("{count}", String(count));

  const getBarColor = (isTracked: boolean, adherenceValue: number): string => {
    if (!isTracked) return "var(--muted-foreground)";
    if (adherenceValue >= 75) return "#10b981";
    if (adherenceValue >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getMeasurementLabel = (measurementType: string): string => {
    const chartsCopy = detailCopy.charts as Record<string, string> | undefined;
    return chartsCopy?.[measurementType] ?? measurementType;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <CalendarRange
            value={dateRange}
            onChange={onDateRangeChange}
            minDate={minDate}
            maxDate={maxDate}
            locale={locale}
            placeholder={t.common.calendarRange.placeholder}
          />
        </div>
        <div className="flex items-center self-end md:self-auto gap-1">
          <Button
            size="sm"
            variant={viewType === "calendar" ? "default" : "outline"}
            onClick={() => setViewType("calendar")}
            type="button"
          >
            {overviewCopy.viewCalendar}
          </Button>
          <Button
            size="sm"
            variant={viewType === "chart" ? "default" : "outline"}
            onClick={() => setViewType("chart")}
            type="button"
          >
            {overviewCopy.viewChart}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          {overviewCopy.periodAdherence}:{" "}
          {overview.summary.periodAdherence === null
            ? overviewCopy.notAvailable
            : `${overview.summary.periodAdherence}%`}
        </Badge>
        <Badge variant="outline">
          {overviewCopy.coverage}: {overview.summary.trackingCoverage}%
        </Badge>
        <Badge variant="outline">
          {overviewCopy.currentStreak}: {overview.summary.currentStreak}
        </Badge>
        <Badge variant="outline">
          {overviewCopy.bestStreak}: {overview.summary.bestStreak}
        </Badge>
      </div>

      {viewType === "calendar" ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
          {overview.days.map((day) =>
            (() => {
              const icons = [
                day.isInPerfectStreak && day.isPerfectDay ? (
                  <Flame key="flame" className="size-3.5 text-orange-500" />
                ) : null,
                day.hasComment ? (
                  <MessageSquare key="comment" className="size-3.5" />
                ) : null,
                day.hasWeightCheck ? (
                  <Scale key="weight" className="size-3.5" />
                ) : null,
                day.hasMeasurementCheck ? (
                  <Ruler key="measurement" className="size-3.5" />
                ) : null,
              ].filter(Boolean);

              const maxVisibleIcons = 3;
              const visibleIcons = icons.slice(0, maxVisibleIcons);
              const overflowIcons = icons.length - visibleIcons.length;

              return (
                <Button
                  key={day.date.toISOString()}
                  variant="outline"
                  type="button"
                  className={cn(
                    "h-auto flex-col items-start justify-start gap-2 p-3 text-left",
                    day.dayState === "completed" &&
                      "border-emerald-500/40 bg-emerald-500/5",
                    day.dayState === "not_tracked" && "border-dashed",
                  )}
                  onClick={() => goToDayDetail(day.date)}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {dayLabelFormatter.format(day.date)}
                    </p>
                    <AdherenceBadge
                      value={day.adherencePercentage}
                      notAvailableLabel={overviewCopy.notAvailable}
                    />
                  </div>

                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
                      {visibleIcons}
                      {overflowIcons > 0 ? (
                        <Badge
                          variant="outline"
                          className="h-5 px-1.5 text-[10px]"
                        >
                          {formatOverflowIcons(overflowIcons)}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </Button>
              );
            })(),
          )}
        </div>
      ) : (
        <ChartFrame>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 28, right: 12, left: 6, bottom: 8 }}
            >
              <defs>
                <pattern
                  id={`missing-day-pattern-${clientId}`}
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(35)"
                >
                  <rect
                    width="6"
                    height="6"
                    fill="var(--muted)"
                    fillOpacity="0.22"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="6"
                    stroke="var(--muted-foreground)"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <CartesianGrid {...getChartGridColor(0.35)} vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={20}
              />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickMargin={8}
                width={40}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", fillOpacity: 0.22 }}
                contentStyle={getChartTooltipContentStyle()}
                content={({ active, label, payload }) => {
                  if (!active || !payload?.length) return null;

                  const day = payload[0].payload as AdherenceBarPoint;
                  const measurementLabels =
                    day.measurementTypes.map(getMeasurementLabel);
                  const visibleMeasurementLabels = measurementLabels.slice(
                    0,
                    4,
                  );
                  const hiddenMeasurements =
                    measurementLabels.length - visibleMeasurementLabels.length;
                  const measurements =
                    hiddenMeasurements > 0
                      ? `${visibleMeasurementLabels.join(", ")} +${hiddenMeasurements}`
                      : visibleMeasurementLabels.join(", ");
                  const weightText =
                    day.weightValue !== undefined
                      ? `${day.weightValue}${day.weightUnit ? ` ${day.weightUnit}` : ""}`
                      : overviewCopy.notAvailable;

                  return (
                    <div className="max-w-[320px] space-y-2 rounded-md border border-border/50 bg-background/95 p-3 shadow-md">
                      <p className="text-sm font-semibold text-foreground">
                        {day.tooltipDateLabel || String(label)}
                      </p>
                      <p className="text-sm text-foreground">
                        {detailCopy.dayDetail.eventTypes.adherence}:{" "}
                        <span className="font-semibold">
                          {day.adherenceLabel}
                        </span>
                      </p>

                      {day.isInPerfectStreak && day.streakLengthAtDay > 0 ? (
                        <p className="flex items-center gap-1 text-sm text-foreground">
                          <Flame className="size-3.5 text-orange-500" />
                          {overviewCopy.streak}:{" "}
                          <span className="font-semibold">
                            {day.streakLengthAtDay}
                          </span>
                        </p>
                      ) : null}

                      {day.commentCount > 0 ? (
                        <p className="flex items-center gap-1 text-sm text-foreground">
                          <MessageSquare className="size-3.5 text-muted-foreground" />
                          {detailCopy.dayDetail.comments}:{" "}
                          <span className="font-semibold">
                            {day.commentCount}
                          </span>
                        </p>
                      ) : null}

                      {day.measurementTypes.length > 0 ? (
                        <p className="flex items-start gap-1 text-sm text-foreground">
                          <Ruler className="size-3.5 text-muted-foreground" />
                          <span className="min-w-0 wrap-break-word">
                            {detailCopy.dayDetail.measurements}:{" "}
                            <span className="font-semibold">
                              {measurements}
                            </span>
                          </span>
                        </p>
                      ) : null}

                      {day.hasWeightCheck ? (
                        <p className="flex items-center gap-1 text-sm text-foreground">
                          <Scale className="size-3.5 text-muted-foreground" />
                          {detailCopy.dayDetail.weight}:{" "}
                          <span className="font-semibold">{weightText}</span>
                        </p>
                      ) : null}
                    </div>
                  );
                }}
              />

              <Bar
                dataKey="missingValue"
                stackId="day"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
                isAnimationActive={false}
                fill={`url(#missing-day-pattern-${clientId})`}
                onClick={(point) => {
                  const row = point?.payload as AdherenceBarPoint | undefined;
                  if (row?.rawDate) {
                    goToDayDetail(row.rawDate);
                  }
                }}
              />

              <Bar
                dataKey="adherenceValue"
                stackId="day"
                radius={[6, 6, 0, 0]}
                maxBarSize={22}
                isAnimationActive={false}
                onClick={(point) => {
                  const row = point?.payload as AdherenceBarPoint | undefined;
                  if (row?.rawDate) {
                    goToDayDetail(row.rawDate);
                  }
                }}
              >
                {barChartData.map((entry) => (
                  <Cell
                    key={entry.key}
                    fill={getBarColor(entry.isTracked, entry.adherenceValue)}
                    fillOpacity={entry.isTracked ? 0.85 : 0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            className="pointer-events-none absolute top-1 left-11.5 right-3 grid"
            style={{
              gridTemplateColumns: `repeat(${Math.max(barChartData.length, 1)}, minmax(0, 1fr))`,
            }}
          >
            {barChartData.map((day) => {
              const icons = [
                day.isInPerfectStreak && day.isPerfectDay ? (
                  <Flame key="flame" className="size-3 text-orange-500" />
                ) : null,
                day.hasComment ? (
                  <MessageSquare
                    key="comment"
                    className="size-3 text-muted-foreground"
                  />
                ) : null,
                day.hasWeightCheck ? (
                  <Scale
                    key="weight"
                    className="size-3 text-muted-foreground"
                  />
                ) : null,
                day.hasMeasurementCheck ? (
                  <Ruler
                    key="measure"
                    className="size-3 text-muted-foreground"
                  />
                ) : null,
              ].filter(Boolean);

              const maxVisibleIcons = 2;
              const visibleIcons = icons.slice(0, maxVisibleIcons);
              const overflowIcons = icons.length - visibleIcons.length;

              if (!icons.length) {
                return <div key={day.key} className="h-4" />;
              }

              return (
                <div
                  key={day.key}
                  className="flex h-4 items-center justify-center"
                >
                  <div className="flex items-center justify-center gap-0.5">
                    {visibleIcons}
                    {overflowIcons > 0 ? (
                      <span className="text-[9px] text-muted-foreground">
                        +{overflowIcons}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </ChartFrame>
      )}
    </div>
  );
}
