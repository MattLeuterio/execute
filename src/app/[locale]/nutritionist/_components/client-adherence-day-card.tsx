import { Flame, MessageSquare, Ruler, Scale } from "lucide-react";

import { AdherenceBadge } from "@/components/common/adherence-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AdherenceCalendarDay {
  date: Date;
  dayState: string;
  adherencePercentage: number | null;
  isInPerfectStreak: boolean;
  isPerfectDay: boolean;
  hasComment: boolean;
  hasWeightCheck: boolean;
  hasMeasurementCheck: boolean;
}

interface ClientAdherenceDayCardProps {
  day: AdherenceCalendarDay;
  dayLabel: string;
  notAvailableLabel: string;
  onOpenDay: (date: Date) => void;
  formatOverflowIcons: (count: number) => string;
}

export function ClientAdherenceDayCard({
  day,
  dayLabel,
  notAvailableLabel,
  onOpenDay,
  formatOverflowIcons,
}: ClientAdherenceDayCardProps) {
  const icons = [
    day.isInPerfectStreak && day.isPerfectDay ? (
      <Flame key="flame" className="size-3.5 text-orange-500" />
    ) : null,
    day.hasComment ? <MessageSquare key="comment" className="size-3.5" /> : null,
    day.hasWeightCheck ? <Scale key="weight" className="size-3.5" /> : null,
    day.hasMeasurementCheck ? (
      <Ruler key="measurement" className="size-3.5" />
    ) : null,
  ].filter(Boolean);

  const maxVisibleIcons = 3;
  const visibleIcons = icons.slice(0, maxVisibleIcons);
  const overflowIcons = icons.length - visibleIcons.length;

  return (
    <Button
      variant="outline"
      type="button"
      className={cn(
        "h-auto flex-col items-start justify-start gap-2 p-3 text-left",
        day.dayState === "completed" && "border-emerald-500/40 bg-emerald-500/5",
        day.dayState === "not_tracked" && "border-dashed",
      )}
      onClick={() => onOpenDay(day.date)}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {dayLabel}
        </p>
        <AdherenceBadge
          value={day.adherencePercentage}
          notAvailableLabel={notAvailableLabel}
        />
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          {visibleIcons}
          {overflowIcons > 0 ? (
            <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
              {formatOverflowIcons(overflowIcons)}
            </Badge>
          ) : null}
        </div>
      </div>
    </Button>
  );
}