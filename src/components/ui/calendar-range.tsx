"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { enUS, it as itLocale } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { capitalizeFirstLetter } from "@/lib/date-utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface CalendarRangeProps {
  value?: DateRange
  onChange?: (value: DateRange | undefined) => void
  minDate?: Date
  maxDate?: Date
  locale?: string
  placeholder?: string
}

export function CalendarRange({
  value,
  onChange,
  minDate,
  maxDate,
  locale,
  placeholder,
}: CalendarRangeProps) {
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -6),
    to: new Date(),
  })

  const selected = value ?? internalValue

  const handleSelect = React.useCallback(
    (nextRange: DateRange | undefined) => {
      if (!onChange) {
        setInternalValue(nextRange)
      } else {
        onChange(nextRange)
      }
    },
    [onChange]
  )

  const fromDate = minDate ?? new Date("1900-01-01")
  const toDate = maxDate ?? addDays(new Date(), 365)
  const dateLocale = locale === "it" ? itLocale : enUS

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "justify-start px-2.5 font-normal"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selected?.from ? (
          selected.to ? (
            <>
              {capitalizeFirstLetter(
                format(selected.from, "LLL dd, y", { locale: dateLocale })
              )} -{" "}
              {capitalizeFirstLetter(
                format(selected.to, "LLL dd, y", { locale: dateLocale })
              )}
            </>
          ) : (
            capitalizeFirstLetter(
              format(selected.from, "LLL dd, y", { locale: dateLocale })
            )
          )
        ) : (
          <span>{placeholder ?? "Pick a date range"}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={selected?.from}
          selected={selected}
          onSelect={handleSelect}
          locale={dateLocale}
          disabled={(date) => date < fromDate || date > toDate}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  )
}