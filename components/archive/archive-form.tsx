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
import { useEffect, useState } from "react";
import ArchiveOverview from "./archive-overview";
import { WeatherHistory, WeatherOverviewData } from "@/constants/weather-types";
import {
  getArchiveDaily,
  getDailyGraphs,
  getMonthlyDelta,
  getMonthlyTabs,
} from "@/constants/functions";

/**
 * Handles the form submission based on the selected day and mode.
 * Generates form and result ui based on the selected mode and date.
 */
export function ArchiveForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"day" | "month" | null>("month");

  const mutation = useMutation({
    mutationFn: async () => {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(
        `api/storico?giorno=${format(date, "yyyy-MM-dd")}`,
        options
      );

      if (!res.ok) throw new Error("Nessuna rilevazione trovata");

      const data: WeatherHistory = await res.json();

      if (mode === "day") {
        const day = data.rilevazioniGiornaliere;

        if (!day || day.length === 0)
          throw new Error(
            `Nessuna rilevazione giornaliera trovata per il giorno ${format(
              date,
              "dd/MM/yyyy"
            )}`
          );

        const obj = {
          lastUpdate: day.at(-1)!.data,
          data: getArchiveDaily(day, getDailyGraphs(day)),
        };
        return obj;
      } else {
        const month = data.rilevazioniUltimi30Giorni;

        if (!month || month.length === 0)
          throw new Error(
            `Nessuna rilevazione mensile trovata per il mese ${format(
              date,
              "dd/MM/yyyy"
            )}`
          );

        const obj = {
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
            // update later when the obj.data is defined
            delta: {
              temp: "-1",
              humidity: "-1",
              pressure: "-1",
              rain: "-1",
            },
          },
          // separator that won't be used in data formats in db
          lastUpdate: month[0].data + "«" + month.at(-1)!.data,
          monthData: {
            graphs: {
              temp: [
                {
                  name: "max",
                  color: "#f87171",
                  data: month.map((x) => Number(x.maxTemperatura)),
                },
                {
                  name: "med",
                  color: "#17A34A",
                  data: month.map((x) => Number(x.temperaturaMedia)),
                },
                {
                  name: "min",
                  color: "#22d3ee",
                  data: month.map((x) => Number(x.minTemperatura)),
                },
              ],
              humidity: [
                {
                  name: "max",
                  color: "#f87171",
                  data: month.map((x) => Number(x.maxUmidita)),
                },
                {
                  name: "med",
                  color: "#17A34A",
                  data: month.map((x) => Number(x.umiditaMedia)),
                },
                {
                  name: "min",
                  color: "#22d3ee",
                  data: month.map((x) => Number(x.minUmidita)),
                },
              ],
              pressure: [
                {
                  name: "max",
                  color: "#f87171",
                  data: month.map((x) => Number(x.maxPressione)),
                },
                {
                  name: "med",
                  color: "#17A34A",
                  data: month.map((x) => Number(x.pressioneMedia)),
                },
                {
                  name: "min",
                  color: "#22d3ee",
                  data: month.map((x) => Number(x.minPressione)),
                },
              ],
              rain: month.map((x) => Number(x.pioggiaGiornaliera)),
            },
            days: month.map((x) => format(x.data, "dd/MM")),
          },
        };

        // getMonthlyDelta can throw
        try {
          obj.data.delta = getMonthlyDelta(obj.data);
        } catch (e) {
          console.log(e);
        }

        return obj;
      }
    },
  });

  useEffect(() => {
    if (!mutation.data) mutation.mutate();
  }, []);

  console.log(mutation);
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
      {mutation.isError && (
        <p className="mt-8 text-lg text-center md:text-xl text-destructive">
          {mutation.error.message}
        </p>
      )}
      {/* @ts-ignore */}
      {mutation.isSuccess && <ArchiveOverview {...mutation.data} />}
    </>
  );
}
