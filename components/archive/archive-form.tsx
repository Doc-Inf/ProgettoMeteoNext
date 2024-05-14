"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Sunrise } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { it } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@tanstack/react-query";
import HeroSkeleton from "../hero/hero-skeleton";
import { useState } from "react";
import ArchiveOverview from "./archive-overview";
import { WeatherHistory, WeatherOverviewData } from "@/constants/weather-types";
import { getMonthlyDelta, getMonthlyTabs } from "@/constants/functions";

/**
 * Handles the form submission based on the selected day and mode.
 * Generates form and result ui based on the selected mode and date.
 */
export function ArchiveForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"day" | "month" | null>("month");

  const mutation = useMutation({
    mutationFn: async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await (mode === "day"
        ? fetch("url1", options)
        : fetch("./php/datiStorico.php", options));

      // TBD: get data type
      const data: WeatherHistory = await res.json();

      if (mode === "day") {
        // format data proprerly
        // ..
      } else {
        const month = data.rilevazioniUltimi30Giorni;

        const obj: {
          data: WeatherOverviewData;
          lastUpdate: string;
          monthData?: {
            graphs: {
              temp: number[];
              humidity: number[];
              pressure: number[];
              rain: number[];
            };
            days: string[];
          };
        } = {
          data: {
            temp: getMonthlyTabs(month, "Temperatura"),
            humidity: getMonthlyTabs(month, "Umidita"),
            pressure: getMonthlyTabs(month, "Pressione"),
            rain: Number(
              month
                .map((x) => Number(x.pioggiaGiornaliera))
                .reduce((sum, curr) => sum + curr, 0)
                .toFixed(2)
            ),
            // TEMP SOLUTION, TODO: FIX
            // @ts-ignore
            delta: {
              temp: getMonthlyDelta(month, "Temperatura"),
              humidity: getMonthlyDelta(month, "Umidita"),
              pressure: getMonthlyDelta(month, "Pressione"),
              rain: getMonthlyDelta(month, "pioggiaGiornaliera"),
            },
          },
          lastUpdate:
            format(month[0].data, "dd/MM") +
            " - " +
            format(month.at(-1)!.data, "dd/MM"),
          monthData: {
            graphs: {
              temp: month.map((x) => Number(x.mediaTemperatura)),
              humidity: month.map((x) => Number(x.mediaUmidita)),
              pressure: month.map((x) => Number(x.mediaPressione)),
              rain: month.map((x) => Number(x.pioggiaGiornaliera)),
            },
            days: month.map((x) => format(x.data, "dd/MM")),
          },
        };

        return obj;
      }

      return data;
    },
  });

  return (
    <>
      <div className="mb-32 grid md:grid-cols-[2fr_1fr_0.2fr] gap-4 max-w-screen-md m-auto px-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] col-span-2  md:col-span-1 m-auto justify-start text-left font-normal rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50",
                !date && "text-muted-foreground "
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? (
                format(date, "PPP", {
                  locale: it,
                })
              ) : (
                <span>Scegli una data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => setDate(e as Date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select
          defaultValue="month"
          onValueChange={(value: "day" | "month") => setMode(value)}
        >
          <SelectTrigger className="w-[180px] rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50">
            <SelectValue
              placeholder="Modalità"
              className="text-white"
              aria-label="Seleziona una modalità"
            />
            <p className="sr-only">Modalità di ricerca </p>
          </SelectTrigger>
          <SelectContent className="w-[180px] rounded-xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900 dark:border-border/20 bg-white border border-zinc-200/50 pb-3">
            <SelectGroup className="px-2">
              <SelectLabel className="-px-1">Modalità</SelectLabel>
              <SelectItem className="text-md" value="month">
                <div className="flex items-center justify-between">
                  <CalendarIcon className="w-3 h-3 me-2" />
                  Mensile
                </div>
              </SelectItem>
              <SelectItem className="text-md" value="day">
                <div className="flex items-center justify-between">
                  <Sunrise className="w-3 h-3 me-2" />
                  Giornaliera
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          className="border shadow-md rounded-2xl shadow-input dark:shadow-none dark:border-border/20 border-zinc-200/50"
          onClick={() => mutation.mutate()}
        >
          <Search className="w-4 h-4" />
          <p className="sr-only">Cerca</p>
        </Button>
      </div>

      {mutation.isPending && <HeroSkeleton />}
      {mutation.isError && <div>{JSON.stringify(mutation.error)}</div>}
      {/* @ts-ignore  TEMP FIX, TODO: VALID TYPES*/}
      {mutation.isSuccess && <ArchiveOverview {...mutation.data} />}
    </>
  );
}
