"use client";

import * as React from "react";
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
import {
  ArchiveResDaily,
  ArchiveResMonthly,
  WeatherData,
  WeatherDataMonthly,
} from "./archive-res";
import { WeatherRes } from "@/lib/db";

export function formatDBWeather(
  data: WeatherRes[],
  mode = "overview" as "overview" | "graph"
) {
  const getAvg = (key: string, arr = data as WeatherRes[]) => {
    return Number(
      // @ts-ignore
      (arr.reduce((a, b) => a + Number(b[key]), 0) / arr.length).toFixed(1)
    );
  };
  const getDayMap = () => {
    const res: Record<string, WeatherRes[]> = {};

    for (const d of data) {
      const day = format(new Date(d.data), "yyyy-MM-dd");
      if (!res[day]) res[day] = [];
      res[day].push(d);
    }
    return res;
  };

  if (mode === "overview") {
    const res: WeatherData[] = [
      {
        title: "Temperatura",
        tabs: [
          {
            key: "Minima",
            value: getAvg("lowTemp"),
          },
          {
            key: "Media",
            value: getAvg("tempOut"),
          },
          {
            key: "Massima",
            value: getAvg("hiTemp"),
          },
        ],
        unit: "°C",
      },
      {
        title: "Umidita'",
        tabs: [
          {
            key: "Media",
            value: getAvg("outHum"),
          },
        ],
        unit: "%",
      },
      {
        title: "Precipitazioni",
        tabs: [
          {
            key: "Media",
            value: getAvg("rain"),
          },
        ],
        unit: "mm",
      },
      {
        title: "Pressione",
        tabs: [
          {
            key: "Media",
            value: getAvg("bar"),
          },
        ],
        unit: "hPa",
      },
    ];
    return res;
  }
  if (mode === "graph") {
    const days = getDayMap();
    const keys = Object.keys(days);
    const res: WeatherDataMonthly["graphs"] = [
      {
        name: "Temperatura",
        data: keys.map((k) => getAvg("tempOut", days[k])),
        unit: "°C",
      },
      {
        name: "Umidità",
        data: keys.map((k) => getAvg("outHum", days[k])),
        unit: "%",
      },
      {
        name: "Pressione",
        data: keys.map((k) => getAvg("bar", days[k])),
        unit: "hPa",
      },
      {
        name: "Precipitazioni",
        data: keys.map((k) => getAvg("rain", days[k])),
        unit: "mm",
      },
    ];
    return { graphs: res, days: keys };
  }
}

export function ArchiveForm() {
  const [date, setDate] = React.useState<Date>();
  const [mode, setMode] = React.useState<"day" | "month" | null>(null);
  const [monthData, setMonthData] = React.useState<WeatherDataMonthly | null>(
    null
  );
  const [dayData, setDayData] = React.useState<WeatherData[] | null>(null);

  async function onSubmit(
    day = date as Date | undefined,
    currMode = mode as "day" | "month"
  ) {
    setMode(currMode);
    setDate(day);
    if (!day || !currMode) return;
    if (currMode === "day") {
      await fetch(`/api/day`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: format(day, "yyyy-MM-dd"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setDayData(formatDBWeather(data) as WeatherData[]);
          setMonthData(null);
        });
    }
    if (currMode === "month") {
      await fetch(`/api/month`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: format(day, "yyyy-MM-dd"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const resOverview = formatDBWeather(data) as WeatherData[];
          const resGraphs = formatDBWeather(data, "graph") as {
            graphs: WeatherDataMonthly["graphs"];
            days: string[];
          };
          setMonthData({
            overview: resOverview,
            graphs: resGraphs.graphs,
            days: resGraphs.days,
          });
          setDayData(null);
        });
    }
  }
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50",
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
              onSelect={(day) => onSubmit(day)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select
          onValueChange={(value: "day" | "month") => onSubmit(date, value)}
        >
          <SelectTrigger className="w-[180px] rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50">
            <SelectValue placeholder="Modalità" className="text-white" />
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
          onClick={() => onSubmit()}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {date && monthData && mode === "month" && (
        <ArchiveResMonthly data={monthData} />
      )}
      {date && dayData && mode === "day" && (
        <ArchiveResDaily data={dayData} day={date} />
      )}
    </>
  );
}
