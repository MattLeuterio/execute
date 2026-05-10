import {
  type AdherenceCalendarDay,
  ClientAdherenceDayCard,
} from "./client-adherence-day-card";

interface ClientAdherenceCalendarProps {
  days: AdherenceCalendarDay[];
  dayLabelFormatter: Intl.DateTimeFormat;
  notAvailableLabel: string;
  onOpenDay: (date: Date) => void;
  formatOverflowIcons: (count: number) => string;
}

export function ClientAdherenceCalendar({
  days,
  dayLabelFormatter,
  notAvailableLabel,
  onOpenDay,
  formatOverflowIcons,
}: ClientAdherenceCalendarProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
      {days.map((day) => (
        <ClientAdherenceDayCard
          key={day.date.toISOString()}
          day={day}
          dayLabel={dayLabelFormatter.format(day.date)}
          notAvailableLabel={notAvailableLabel}
          onOpenDay={onOpenDay}
          formatOverflowIcons={formatOverflowIcons}
        />
      ))}
    </div>
  );
}