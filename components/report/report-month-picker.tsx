import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  isFuture,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { it } from "date-fns/locale";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday());
}

interface MonthPickerProps {
  currentMonth: Date;
  currentYear: string;
  onMonthChange: (newMonth: Date) => void;
  onYearChange: (newYear: string) => void;
}

export default function MonthPicker({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
}: MonthPickerProps) {
  const firstDayCurrentYear = parse(currentYear, "yyyy", new Date());

  const months = eachMonthOfInterval({
    start: firstDayCurrentYear,
    end: endOfYear(firstDayCurrentYear),
  });

  function previousYear() {
    let firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
    onYearChange(format(firstDayNextYear, "yyyy"));
  }

  function nextYear() {
    let firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
    onYearChange(format(firstDayNextYear, "yyyy"));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] rounded-xl shadow-md shadow-input border-primary/20 dark:shadow-none"
        >
          Seleziona il mese
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 bg-accent rounded-xl shadow-lg my-2">
        <div className="p-3">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="space-y-4">
              <div className="relative flex items-center justify-center pt-1">
                <div
                  className="text-sm font-medium"
                  aria-live="polite"
                  role="presentation"
                  id="month-picker"
                >
                  {format(firstDayCurrentYear, "yyyy")}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    name="previous-year"
                    aria-label="Go to previous year"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      "absolute left-1"
                    )}
                    type="button"
                    onClick={previousYear}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    name="next-year"
                    aria-label="Go to next year"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      "absolute right-1 disabled:bg-muted"
                    )}
                    type="button"
                    disabled={isFuture(add(firstDayCurrentYear, { years: 1 }))}
                    onClick={nextYear}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                className="grid w-full grid-cols-3 gap-2"
                role="grid"
                aria-labelledby="month-picker"
              >
                {months.map((month) => (
                  <div
                    key={month.toString()}
                    className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800
"
                    role="presentation"
                  >
                    <PopoverClose
                      name="day"
                      className={cn(
                        "inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-primary/20 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800",
                        isEqual(month, currentMonth) &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 hover:!text-primary-foreground/80",
                        !isEqual(month, currentMonth) &&
                          isEqual(month, getStartOfCurrentMonth()) &&
                          "font-bold"
                      )}
                      disabled={isFuture(month)}
                      role="gridcell"
                      tabIndex={-1}
                      type="button"
                      onClick={() => onMonthChange(month)}
                    >
                      <time dateTime={format(month, "yyyy-MM-dd")}>
                        {format(month, "MMM", { locale: it })}
                      </time>
                    </PopoverClose>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
